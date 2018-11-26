import { Jsoncookie } from "../../service/class/jsoncookie";
import { cookies } from "./cookies";
import { AsyncTransmission } from "../../../atvad/ts/AsyncTransmission";
import { Browser } from "./Browser";
import { tag } from "../../service/tag";
import { browser } from "../../service/browser";
import axios from 'axios';

export class IframeCookie {

  constructor(){
    console.log('iframeCookie');
  }

  async exec() {

    /**
     * ブラウザ別に処理を分ける
     */
    const browsers: Browser = {
      ie: (jsoncookie: Jsoncookie) => this.execImgElement(jsoncookie),
      edge: (jsoncookie: Jsoncookie) => this.execImgElement(jsoncookie),
      chrome: (jsoncookie: Jsoncookie) => this.execCookie(jsoncookie),
      firefox: (jsoncookie: Jsoncookie) => this.execCookie(jsoncookie),
      opera: (jsoncookie: Jsoncookie) => this.execCookie(jsoncookie),
      safari: (jsoncookie: Jsoncookie) => this.execCookie(jsoncookie),
      itp_safari: (jsoncookie: Jsoncookie) => this.execCookie(jsoncookie),
      android_browser: (jsoncookie: Jsoncookie) => this.execCookie(jsoncookie),
      chrome_mobile: (jsoncookie: Jsoncookie) => this.execCookie(jsoncookie),
      // tslint:disable-next-line:no-empty
      unknown: (jsoncookie: Jsoncookie) => {},
    };

    // json取得
    // let jsoncookie: Jsoncookie = await this.getJson();
    const asyncTransmission: AsyncTransmission = new AsyncTransmission();
    const jsoncookie: Jsoncookie = await asyncTransmission.getJsonViaQuerry();

    // 端末とOS別の対応
    browsers[browser.ck()](jsoncookie);
  }

  /**
   * 2回目のxhr送信（アクセスログ設定 + isへ飛ばす際のJSON取得）
   * @param urlValue
   */
  // async getJson(): Promise<any> {
  //   const urlQuerry: string = location.search;
  //   const decodeUrlQuerry: string = decodeURIComponent(urlQuerry);
  //   const [_, urlValue] = decodeUrlQuerry.split('?url=');
  //   console.log('?url = ' + urlValue);
  //   return axios
  //     .get(urlValue)
  //     .then(resdata => resdata.data)
  //     .catch(err => console.log(err));
  // }

  private async getJson(): Promise<any> {
    const urlQuerry: string = location.search.substring(1);
    const decodeUrlQuerry: string = decodeURIComponent(urlQuerry);
    const [, urlValue] = decodeUrlQuerry.split('url=');
    return axios
      .get(urlValue)
      .then(resdata => resdata.data)
      .catch(err => console.log(err));
  }

  /**
   * IEとEdge用のImgタグ
   * @param jsoncookie
   */
  private execImgElement(jsoncookie: Jsoncookie) {

    // imgを作成 + 設定
    const imgTag: HTMLImageElement = tag.mkImageTag(`${jsoncookie.imgurl}`);
    const scripts = document.getElementsByTagName('script');
    scripts[0].parentNode.insertBefore(imgTag, scripts[0]);
  };

  /**
   * Cookie用 chrome V3 + SDK用
   * @param jsoncookie
   */
  private execCookie(jsoncookie: Jsoncookie){

    // V3をcookieに保存する
    if (jsoncookie.v3) {
      cookies.setItem('v3',jsoncookie.v3, 0, jsoncookie.path,'', false);
    }

    const iframeElement: HTMLIFrameElement = tag.mkIframeElementForTracking(jsoncookie.rurl,'0','0','none');
    const divElement: HTMLElement = document.getElementById('atv');
    divElement.parentNode.insertBefore(iframeElement, divElement);
  }
}
