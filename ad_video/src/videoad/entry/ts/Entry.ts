import { Jsonentry } from '../../service/class/jsonentry';
import { tag } from '../../service/tag';
import axios from 'axios';
import { AsyncTransmission } from '../../../atvad/ts/AsyncTransmission';

export class Entry {

  constructor() {
    console.log(' Entry ---------- ')
  }

  /**
   * メイン処理
   */
  async exec() {
    const asyncTransmission: AsyncTransmission = new AsyncTransmission();
    const jsonentry: Jsonentry = await asyncTransmission.getJsonViaQuerry();
    await this.mkCookieIframe(jsonentry);
  }

  /**
   * 2回目のxhr送信（アクセスログ設定 + isへ飛ばす際のJSON取得）
   */
  // private async getJson(): Promise<any> {
  //   const urlQuerry: string = location.search.substring(1);
  //   const decodeUrlQuerry: string = decodeURIComponent(urlQuerry);
  //   const [_, urlValue] = decodeUrlQuerry.split('url=');
  //   return axios
  //     .get(urlValue)
  //     .then(resdata => resdata.data)
  //     .catch(err => console.log(err));
  // }

  /**
   * iframe作成
   * @param jsonentry
   */
  private async mkCookieIframe(jsonentry: Jsonentry) {
    const url: string = `${jsonentry.vh_frame_url}?url=${encodeURIComponent(jsonentry.rurl)}`;
    const iframeElement: HTMLIFrameElement = tag.mkIframeElementForTracking(url, '0', '0', 'none');
    const divElement: HTMLElement = document.getElementById('atv_cookie_space');
    divElement.parentNode.insertBefore(iframeElement, divElement);
  }
}
