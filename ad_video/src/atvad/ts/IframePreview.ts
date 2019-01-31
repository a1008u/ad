import { Jsontype } from '../../vat/service/class/jsontype';
import { tag } from '../../vat/service/tag';
import { AsyncTransmission } from '../../vat/service/AsyncTransmission';
import { oschecker } from '../../vat/service/oschecker';
import { browser } from '../../vat/service/browser';

export class IframePreview {
  /**
   * previewモード(api連携と非api連携)
   * @param scriptElement
   * @param rkValue
   * @param window
   */
  async mainExecPreview(
    scriptElement: any,
    rkValue: string,
    apiDomain: string,
    htmlDomain: string,
  ) {
    if (!rkValue) {
      // nodeの属性を利用するため、mock用の記載は不要
      await this.mkIframe(
        apiDomain,
        htmlDomain,
        scriptElement,
        rkValue,
        this.mkIframePreViaNode,
      );
    } else {
      await this.mkIframe(
        apiDomain,
        htmlDomain,
        scriptElement,
        rkValue,
        this.mkIframePreViaServer,
      );
    }

    // 動画自動実行用libraryの起動はしない
  }

  /**
   *
   * @param scriptElement
   * @param rkValue
   * @param mk
   */
  async mkIframe(
    apiDomain: string,
    htmlDomain: string,
    scriptElement: HTMLScriptElement,
    rkValue: string,
    mk: (
      apiDomain: string,
      scriptElement: HTMLScriptElement,
      rkValue: string,
    ) => Promise<Jsontype>,
  ) {
    const infoJson: Jsontype = await mk(apiDomain, scriptElement, rkValue);
    // androidかつFirefoxは動画を表示させない
    if (
      oschecker.isolate() === 'android' &&
      browser.ck().includes('firefox') &&
      infoJson.videoad_vt_second !== '0'
    ) {
      const divTag: HTMLDivElement = document.createElement('div');
      divTag.textContent =
        'お使いの端末のブラウザでは表示することができません。';
      scriptElement.parentNode.insertBefore(divTag, scriptElement);
    } else {
      // iframe生成
      infoJson.videoframe_url = `${htmlDomain}/vat/atvad/html/iframe_atvad.html`;
      const iframeHight: number =
        Number(infoJson.height) + Number(infoJson.ADAREA_HEIGHT);
      const url: string = `${
        infoJson.videoframe_url
      }?atvJson=${encodeURIComponent(JSON.stringify(infoJson))}`;
      const iframeElement: HTMLIFrameElement = tag.mkIframeElement(
        url,
        infoJson.width,
        String(iframeHight),
      );
      scriptElement.parentNode.insertBefore(iframeElement, scriptElement);
    }
  }

  /**
   * サーバから生成のpreview用
   * @param scriptElement
   * @param rkValue
   */
  async mkIframePreViaServer(
    apiDomain: string,
    scriptElement: HTMLScriptElement,
    rkValue: string,
  ) {
    const asyncTransmission: AsyncTransmission = new AsyncTransmission();
    let infoJson: Jsontype = await asyncTransmission.getJson(
      apiDomain,
      rkValue,
    );
    infoJson.impression_url = '';

    const btnUrl: string = scriptElement.getAttribute('data-atv-button-url');
    scriptElement.removeAttribute('data-atv-button-url');

    if (infoJson.videoad_vt_second !== '0') {
      // viewthrought
      infoJson.ATV_MODE = infoJson.height === '360' ? 'previewPc' : 'previewSp';
      infoJson.ADAREA_HEIGHT = '0';
    } else {
      // not viewthrought
      infoJson.ATV_MODE =
        infoJson.height === '360' ? 'previewPcAdarea' : 'previewSpAdarea';
      infoJson.ADAREA_HEIGHT = infoJson.height === '360' ? '80' : '50';
      infoJson.href_url = btnUrl ? btnUrl : 'javascript:void(0)';
      infoJson.target = btnUrl ? `target="_blank"` : '';
    }

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
    apiDomain: string,
    scriptElement: HTMLScriptElement,
    rkValue: string,
  ) {
    const moveURL: string = scriptElement.getAttribute('data-atv-url');
    const bannerText: string = scriptElement.getAttribute(
      'data-atv-banner-text',
    );
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
      '',
    );
    scriptElement.removeAttribute('data-atv-url');
    scriptElement.removeAttribute('data-atv-banner-text');
    scriptElement.removeAttribute('data-atv-btn-text');
    scriptElement.removeAttribute('data-atv-height');
    scriptElement.removeAttribute('data-atv-width');

    const btnUrl: string = scriptElement.getAttribute('data-atv-button-url');
    scriptElement.removeAttribute('data-atv-button-url');

    if (infoJson.banner_text === '' && infoJson.video_btn_text === '') {
      // viewthrough有
      infoJson.ATV_MODE = infoJson.height === '360' ? 'previewPc' : 'previewSp';
      infoJson.ADAREA_HEIGHT = '0';
      infoJson.videoad_vt_second = '1';
    } else {
      // viewthrough無
      infoJson.ATV_MODE =
        infoJson.height === '360' ? 'previewPcAdarea' : 'previewSpAdarea';
      infoJson.ADAREA_HEIGHT = infoJson.height === '360' ? '80' : '50';
      infoJson.href_url = btnUrl ? btnUrl : 'javascript:void(0)';
      infoJson.target = btnUrl ? `target="_blank"` : '';
    }

    return new Promise<Jsontype>((resolove, _) => {
      resolove(infoJson);
    });
  }
}
