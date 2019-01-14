import { emergenceInit } from './EmergenceFactory';

import { Jsontype } from '../../vat/service/class/jsontype';
import { tag } from '../../vat/service/tag';
import { AsyncTransmission } from '../../vat/service/AsyncTransmission';
import { oschecker } from '../../vat/service/oschecker';
import { browser } from '../../vat/service/browser';

export class Iframe {
  /**
   *
   * @param scriptElement
   * @param rkValue
   * @param window
   */
  async mainExec(
    scriptElement: any,
    rkValue: string,
    window: Window,
    apiDomain: string,
    htmlDomain: string,
  ) {
    await this.mkIframe(
      apiDomain,
      htmlDomain,
      scriptElement,
      rkValue,
      this.mkIframeViaServer,
    );

    // 動画自動実行用library
    emergenceInit(window);
  }

  /**
   * サーバと通信するiframe作成
   * @param scriptElement
   * @param rkValue
   * @param mk
   */
  private async mkIframe(
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

    infoJson.videoframe_url = `${htmlDomain}/vat/atvad/html/iframe_atvad.html`;

    // iframe生成
    const iframeHight: number =
      Number(infoJson.height) + Number(infoJson.ADAREA_HEIGHT);
    const url: string = `${
      infoJson.videoframe_url
    }?atvJson=${encodeURIComponent(JSON.stringify(infoJson))}`;
    let iframeElement: HTMLIFrameElement = tag.mkIframeElement(
      url,
      infoJson.width,
      String(iframeHight),
    );

    // androidかつFirefoxは動画を表示させない
    if( !(oschecker.isolate() === 'android' && browser.ck().includes('firefox') && infoJson.videoad_vt_second !== '0')) {
      scriptElement.parentNode.insertBefore(iframeElement, scriptElement);
    }
  }

  /**
   * サーバからJson取得
   * @param domain
   * @param scriptElement
   * @param rkValue
   */
  private async mkIframeViaServer(
    apiDomain: string,
    scriptElement: HTMLScriptElement,
    rkValue: string,
  ): Promise<Jsontype> {
    const asyncTransmission: AsyncTransmission = new AsyncTransmission();
    const infoJson: Jsontype = await asyncTransmission.getJson(
      apiDomain,
      rkValue,
    );

    // 追加要素
    // infoJson.ATV_RK = rkValue;
    infoJson.ATV_MODE = '';
    infoJson.ADAREA_HEIGHT =
      infoJson.videoad_vt_second !== '0'
        ? '0'
        : infoJson.height === '360'
          ? '100'
          : '50';

    return new Promise<Jsontype>((resolove, _) => {
      resolove(infoJson);
    });
  }
}
