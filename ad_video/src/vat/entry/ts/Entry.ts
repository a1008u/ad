import { Jsonentry } from '../../service/class/jsonentry';
import { tag } from '../../service/tag';
import { AsyncTransmission } from '../../service/AsyncTransmission';

export class Entry {
  /**
   * メイン処理
   */
  async exec() {
    const asyncTransmission: AsyncTransmission = new AsyncTransmission();
    const jsonentry: Jsonentry = await asyncTransmission.getJsonViaQuerry();
    await this.mkCookieIframe(jsonentry);
  }

  /**
   * iframe作成
   * @param jsonentry
   */
  private async mkCookieIframe(jsonentry: Jsonentry) {
    const url: string = `${jsonentry.vh_frame_url}?url=${encodeURIComponent(
      jsonentry.rurl,
    )}`;
    const iframeElement: HTMLIFrameElement = tag.mkIframeElementForTracking(
      url,
      '0',
      '0',
      'none',
    );
    const divElement: HTMLElement = document.getElementById('atv_cookie_space');
    divElement.parentNode.insertBefore(iframeElement, divElement);
  }
}
