import { emergenceInit } from './EmergenceFactory';

import { Jsontype } from '../../videoad/service/class/jsontype';
import { tag } from '../../videoad/service/tag';
import { AsyncTransmission } from '../../videoad/service/AsyncTransmission';

export class IframePreview {
  localhost: string = 'http://localhost:3000';

  constructor() {
    console.log('IframePreview');
  }

  /**
   * previewモード(api連携と非api連携)
   * @param scriptElement
   * @param rkValue
   * @param window
   */
  async mainExecPreview(
    scriptElement: any,
    rkValue: string,
    window: Window,
    domain: string
  ) {
    if (!rkValue) {
      // nodeの属性を利用するため、mock用の記載は不要
      await this.mkIframe(
        domain,
        scriptElement,
        rkValue,
        this.mkIframePreViaNode
      );
    } else {
      await this.mkIframe(
        domain,
        scriptElement,
        rkValue,
        this.mkIframePreViaServer
      );
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
  async mkIframe(
    domain: string,
    scriptElement: HTMLScriptElement,
    rkValue: string,
    mk: (
      domain: string,
      scriptElement: HTMLScriptElement,
      rkValue: string
    ) => Promise<Jsontype>
  ) {
    const infoJson: Jsontype = await mk(domain, scriptElement, rkValue);
    infoJson.videoframe_url =
      domain === this.localhost
        ? `${this.localhost}/videoad/atvad/html/iframe_atvad.html`
        : 'https://a.image.accesstrade.net/hai/videoad/atvad/html/iframe_atvad.html';

    // iframe生成
    let iframeHight: number = Number(infoJson.height) + Number(infoJson.ADAREA_HEIGHT);
    const url: string = `${
      infoJson.videoframe_url
    }?atvJson=${encodeURIComponent(JSON.stringify(infoJson))}`;
    let iframeElement: HTMLIFrameElement = tag.mkIframeElement(
      url,
      infoJson.width,
      String(iframeHight)
    );
    scriptElement.parentNode.insertBefore(iframeElement, scriptElement);
  }

  /**
   * サーバから生成のpreview用
   * @param scriptElement
   * @param rkValue
   */
  async mkIframePreViaServer(
    domain: string,
    scriptElement: HTMLScriptElement,
    rkValue: string
  ) {
    const asyncTransmission: AsyncTransmission = new AsyncTransmission();
    let infoJson: Jsontype = await asyncTransmission.getJson(domain, rkValue);
    infoJson.impression_url = '';

    if (infoJson.videoad_vt_second !== '0') {
      // viewthrought
      infoJson.ATV_MODE = infoJson.height === '360' ? 'previewPc' : 'previewSp';
      infoJson.ADAREA_HEIGHT = '0';
    } else {
      // not viewthrought
      infoJson.ATV_MODE =
        infoJson.height === '360' ? 'previewPcAdarea' : 'previewSpAdarea';
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
  async mkIframePreViaNode(
    domain: string,
    scriptElement: HTMLScriptElement,
    rkValue: string
  ) {
    const moveURL: string = scriptElement.getAttribute('data-atv-url');
    const bannerText: string = scriptElement.getAttribute('data-atv-banner-text');
    const btnText: string = scriptElement.getAttribute('data-atv-btn-text');
    const height: string = scriptElement.getAttribute('data-atv-height');
    const width: string = scriptElement.getAttribute('data-atv-width');
    const asyncTransmission: AsyncTransmission = new AsyncTransmission();
    const infoJson: Jsontype = await asyncTransmission.getPreviewJson(
      moveURL,
      height,
      width,
      bannerText,
      btnText,
      '',
      '',
      ''
    );
    scriptElement.removeAttribute('data-atv-url');
    scriptElement.removeAttribute('data-atv-banner-text');
    scriptElement.removeAttribute('data-atv-btn-text');
    scriptElement.removeAttribute('data-atv-height');
    scriptElement.removeAttribute('data-atv-width');

    if (infoJson.banner_text === '' && infoJson.video_btn_text === '') {
      // viewthrough有
      infoJson.ATV_MODE = infoJson.height === '360' ? 'previewPc' : 'previewSp';
      infoJson.ADAREA_HEIGHT = '0';
      infoJson.videoad_vt_second = '1';
    } else {
      // viewthrough無
      infoJson.ATV_MODE =
        infoJson.height === '360' ? 'previewPcAdarea' : 'previewSpAdarea';
      infoJson.ADAREA_HEIGHT = infoJson.height === '360' ? '100' : '50';
    }

    // rkの削除
    // infoJson.ATV_RK = '';
    return new Promise<Jsontype>((resolove, _) => {
      resolove(infoJson);
    });
  }
}
