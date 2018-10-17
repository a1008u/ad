import { emergenceInit } from './EmergenceFactory';
import { Jsontype } from '../../service/jsontype';
import { tag } from '../../service/tag';
import axios from 'axios';

export class Iframe {

  constructor() {
    console.log('creat');
  }

  /**
   * 
   * @param scriptElement 
   * @param rkValue 
   * @param window 
   */
  async mainExec(scriptElement: any, rkValue: string, window: Window, atvExec: string) {

    if (atvExec === 'mock') {
      // モックサーバ
      // const domain = 'http://10.10.15.30:3000';
      const domain = 'https://localhost:3000';
      await this.mkIframe(domain, scriptElement, rkValue, this.mkIframeViaMockServer);
    } else if (atvExec === 'intra') {
      // intra(テスト環境)
      const domain = 'https://h.intra.accesstrade.net';
      await this.mkIframe(domain, scriptElement, rkValue, this.mkIframeViaServer);
    } else {
      // 本番環境（現状は仮）
      const domain = 'https://h.intra.accesstrade.net';
      await this.mkIframe(domain, scriptElement, rkValue, this.mkIframeViaMockServer);
    }

    // 動画自動実行用library
    emergenceInit(window);
  }

  /**
   * 
   * @param scriptElement 
   * @param rkValue 
   * @param window 
   */
  async mainExecPreview(scriptElement: any, rkValue: string, window: Window, atvExec: string) {

    if (!rkValue) {
      // nodeの属性を利用するため、mock用の記載は不要
      const domain = '';
      await this.mkIframe(domain, scriptElement, rkValue, this.mkIframePreViaNode);
    } else {
      if (atvExec === 'intra') {
        const domain = 'https://h.intra.accesstrade.net';
        await this.mkIframe(domain, scriptElement, rkValue, this.mkIframePreViaServer);
      } else if (atvExec === 'mock') {
        const domain = 'https://localhost:3000';
        // const domain = 'http://10.10.15.30:3000';
        await this.mkIframe(domain, scriptElement, rkValue, this.mkIframePreViaMockServer);
      } else {
        const domain = 'https://h.intra.accesstrade.net';
        await this.mkIframe(domain, scriptElement, rkValue, this.mkIframePreViaNode);
      }
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
    infoJson.ATV_IMP_DOMAIN = domain;
    infoJson.ATV_VIDEO_DOMAIN = domain;
    const domainT = 'https://localhost:3000';

    // iframe生成
    let iframeHight: number = Number(infoJson.height) + Number(infoJson.ADAREA_HEIGHT);
    const url: string = `${domainT}/partner/html/iframe/ad.html?atvJson=${encodeURIComponent(JSON.stringify(infoJson))}`;
    let iframeElement: HTMLIFrameElement = tag.mkIframeElement(url, infoJson.width, String(iframeHight));
    scriptElement.parentNode.insertBefore(iframeElement, scriptElement);
    //window.location.replace(url);
    // iframeElement.contentDocument.location.replace(`${domainT}/partner/html/iframe/ad.html`);
    iframeElement.contentDocument.location.replace(url);
  }

  /**
   * 
   * @param domain 
   * @param scriptElement 
   * @param rkValue 
   */
  async mkIframeViaServer(domain: string, scriptElement: HTMLScriptElement, rkValue: string) {
    const infoJson: Jsontype = await getJson2(domain, rkValue);

    // 追加要素
    infoJson.ATV_RK = rkValue;
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
   * 
   * @param domain 
   * @param scriptElement 
   * @param rkValue 
   */
  async mkIframeViaMockServer(domain: string, scriptElement: HTMLScriptElement, rkValue: string) {
    const infoJson: Jsontype = await getJson(domain, rkValue);

    // 追加要素
    infoJson.ATV_RK = rkValue;
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
   * 
   * @param scriptElement 
   * @param rkValue 
   */
  async mkIframePreViaServer(domain: string, scriptElement: HTMLScriptElement, rkValue: string) {
    let infoJson: Jsontype = await getJson2(domain, rkValue);
    console.log(infoJson);

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
    infoJson.ATV_RK = '';
    return new Promise<Jsontype>((resolove, _) => {
      resolove(infoJson);
    });
  }
  
  /**
   * 
   * @param scriptElement 
   * @param rkValue 
   */
  async mkIframePreViaMockServer(domain: string, scriptElement: HTMLScriptElement, rkValue: string) {
    let infoJson: Jsontype = await getJson2(domain, rkValue);
    console.log(infoJson);

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
    infoJson.ATV_RK = '';
    return new Promise<Jsontype>((resolove, _) => {
      resolove(infoJson);
    });
  }

  /**
   * preview用
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
    let infoJson: Jsontype = await getPreviewJson(moveURL, height, width, bannerText, btnText);
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
    infoJson.ATV_RK = '';
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
    .get(`${domain}/atvjson?atvrk=${rkValue}`)
    .then(resdata => resdata.data)
    .catch(err => console.log(err));
}

export async function getJson2(domain: string, rkValue: string): Promise<Jsontype> {
  return axios
    .get(`${domain}/sp/vad.json?rk=${rkValue}`)
    .then(resdata => resdata.data)
    .catch(err => console.log(err));
}

/**
 * rkが内容のpreview
 * @param moveURL 
 */
export async function getPreviewJson(moveURL: string, height: string, width: string, bannerText: string, btnText: string): Promise<Jsontype> {
  let json = new Jsontype(moveURL, bannerText, '', width, height, '0', btnText);

  return new Promise<Jsontype>((resolove, _) => {
    resolove(json);
  });
}
