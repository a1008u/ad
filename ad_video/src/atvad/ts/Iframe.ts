import { emergenceInit } from './EmergenceFactory';

import axios from 'axios';
import { Jsontype } from '../../videoad/service/jsontype';
import { tag } from '../../videoad/service/tag';


export class Iframe {

  localhost: string = 'https://10.10.15.65:3000';

  constructor() {
    console.log('creat');
  }

  /**
   * 
   * @param scriptElement 
   * @param rkValue 
   * @param window 
   */
  async mainExec(scriptElement: any, rkValue: string, window: Window, atvMock: string) {

    const domain = (atvMock) ? this.localhost : 'https://h.accesstrade.net';
    await this.mkIframe(domain, scriptElement, rkValue, this.mkIframeViaServer);

    // 動画自動実行用library
    emergenceInit(window);
  }

  /**
   * 
   * @param scriptElement 
   * @param rkValue 
   * @param window 
   */
  async mainExecPreview(scriptElement: any, rkValue: string, window: Window, atvMock: string) {

    if (!rkValue) {
      // nodeの属性を利用するため、mock用の記載は不要
      const domain = (atvMock) ? this.localhost : '';
      await this.mkIframe(domain, scriptElement, rkValue, this.mkIframePreViaNode);
    } else {
      const domain = (atvMock) ? this.localhost : 'https://h.accesstrade.net';
      await this.mkIframe(domain, scriptElement, rkValue, this.mkIframePreViaServer);
    }

    // 動画自動実行用library
    emergenceInit(window);
  }

  /**
   * 
   * @param scriptElement 
   * @param rkValue 
   * @param mk 
   */
  async mkIframe(domain: string, scriptElement: HTMLScriptElement, rkValue: string, mk: (domain: string, scriptElement: HTMLScriptElement, rkValue: string) => Promise<Jsontype>) {

    const infoJson: Jsontype = await mk(domain, scriptElement, rkValue);
    infoJson.videoframe_url = (domain === 'https://10.10.15.65:3000')
      ? `${this.localhost}/videoad/atvad/html/iframe_atvad.html`
      : 'https://a.image.accesstrade.net/hai/videoad/atvad/html/iframe_atvad.html';

    // iframe生成
    let iframeHight: number = Number(infoJson.height) + Number(infoJson.ADAREA_HEIGHT);
    const url: string = `${infoJson.videoframe_url}?atvJson=${encodeURIComponent(JSON.stringify(infoJson))}`;
    let iframeElement: HTMLIFrameElement = tag.mkIframeElement(url, infoJson.width, String(iframeHight));
    scriptElement.parentNode.insertBefore(iframeElement, scriptElement);
  }

  /**
   * サーバからJson取得
   * @param domain 
   * @param scriptElement 
   * @param rkValue 
   */
  async mkIframeViaServer(domain: string, scriptElement: HTMLScriptElement, rkValue: string) {
    const infoJson: Jsontype = await getJson(domain, rkValue);

    // 追加要素
    // infoJson.ATV_RK = rkValue;
    infoJson.ATV_MODE = '';
    infoJson.ADAREA_HEIGHT = infoJson.videoad_vt_second !== '0'
        ? '0'
        : infoJson.height === '360'
          ? '100'
          : '50';

    return new Promise<Jsontype>((resolove, _) => {
      resolove(infoJson);
    });
  }

  /**
   * サーバから生成のpreview用
   * @param scriptElement 
   * @param rkValue 
   */
  async mkIframePreViaServer(domain: string, scriptElement: HTMLScriptElement, rkValue: string) {
    let infoJson: Jsontype = await getJson(domain, rkValue);
    infoJson.impression_url = '';

    if (infoJson.videoad_vt_second !== '0') {
      // viewthrought
      infoJson.ATV_MODE = infoJson.height === '360' ? 'previewPc' : 'previewSp';
      infoJson.ADAREA_HEIGHT = '0';
    } else {
      // not viewthrought
      infoJson.ATV_MODE = infoJson.height === '360' ? 'previewPcAdarea' : 'previewSpAdarea';
      infoJson.ADAREA_HEIGHT = infoJson.height === '360' ? '100' : '50';
    }

    // rkの削除
    // infoJson.ATV_RK = '';
    return new Promise<Jsontype>((resolove, _) => {
      resolove(infoJson);
    });
  }

  /**
   * domから生成のpreview用
   * @param scriptElement
   * @param rkValue
   * @param atvMode
   */
  async mkIframePreViaNode(domain: string, scriptElement: HTMLScriptElement, rkValue: string) {

    let moveURL: string = scriptElement.getAttribute('data-atv-url');
    const bannerText: string = scriptElement.getAttribute('data-atv-banner-text');
    const btnText: string = scriptElement.getAttribute('data-atv-btn-text');
    const height: string = scriptElement.getAttribute('data-atv-height');
    const width: string = scriptElement.getAttribute('data-atv-width');
    let infoJson: Jsontype = await getPreviewJson(moveURL, height, width, bannerText, btnText, '', '' ,'');
    scriptElement.removeAttribute('data-atv-url');
    scriptElement.removeAttribute('data-atv-banner-text');
    scriptElement.removeAttribute('data-atv-btn-text');
    scriptElement.removeAttribute('data-atv-height');
    scriptElement.removeAttribute('data-atv-width');

    if(infoJson.banner_text === '' && infoJson.video_btn_text === ''){
      // viewthrough有
      infoJson.ATV_MODE = infoJson.height === '360' ? 'previewPc' : 'previewSp';
      infoJson.ADAREA_HEIGHT = '0';
      infoJson.videoad_vt_second = '1';
    } else {
      // viewthrough無
      infoJson.ATV_MODE = infoJson.height === '360' ? 'previewPcAdarea' : 'previewSpAdarea';
      infoJson.ADAREA_HEIGHT = infoJson.height === '360' ? '100' : '50';
    }

    // rkの削除
    // infoJson.ATV_RK = '';
    return new Promise<Jsontype>((resolove, _) => {
      resolove(infoJson);
    });
  }
}

/**
 * 1回目のxhr送信（動画広告表示用のJSON取得）
 * @param domain 
 * @param rkValue 
 */
export async function getJson(domain: string, rkValue: string): Promise<Jsontype> {
  return axios
    .get(`${domain}/sp/vad.json?rk=${rkValue}`)
    .then(resdata => {
      console.log(resdata);
      return resdata.data
    })
    .catch(err => console.log(err));
}

/**
 * rkが内容のpreview
 * @param moveURL 
 */
export async function getPreviewJson(moveURL: string, height: string, width: string, bannerText: string, btnText: string, videoFrameUrl:string , entryFrameUrl:string, impression_url:string): Promise<Jsontype> {
  let json = new Jsontype(moveURL, bannerText, '', width, height, '0', btnText, videoFrameUrl, videoFrameUrl, impression_url);

  return new Promise<Jsontype>((resolove, _) => {
    resolove(json);
  });
}
