import { emergenceInit } from './EmergenceFactory';

import { Jsontype } from '../../videoad/service/jsontype';
import { tag } from '../../videoad/service/tag';
import { AsyncTransmission } from './AsyncTransmission';

export class Iframe {
  localhost: string = 'https://10.10.15.85:3000';

  constructor() {
    console.log('Iframe');
  }

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
    domain: string
  ) {
    await this.mkIframe(domain, scriptElement, rkValue, this.mkIframeViaServer);

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
    const iframeHight: number = Number(infoJson.height) + Number(infoJson.ADAREA_HEIGHT);
    const url: string = `${infoJson.videoframe_url}?atvJson=${encodeURIComponent(JSON.stringify(infoJson))}`;
    let iframeElement: HTMLIFrameElement = tag.mkIframeElement(
      url,
      infoJson.width,
      String(iframeHight)
    );
    scriptElement.parentNode.insertBefore(iframeElement, scriptElement);
  }

  /**
   * サーバからJson取得
   * @param domain
   * @param scriptElement
   * @param rkValue
   */
  private async mkIframeViaServer(
    domain: string,
    scriptElement: HTMLScriptElement,
    rkValue: string
  ): Promise<Jsontype> {
    const asyncTransmission: AsyncTransmission = new AsyncTransmission();
    const infoJson: Jsontype = await asyncTransmission.getJson(domain, rkValue);

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
