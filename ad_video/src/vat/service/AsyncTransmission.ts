import { Jsontype } from './class/jsontype';
import axios from 'axios';
import 'ts-polyfill/lib/es2015-promise';

export class AsyncTransmission {
  /**
   * 1回目のxhr送信（動画広告表示用のJSON取得）
   * @param domain
   * @param rkValue
   */
  async getJson(domain: string, rkValue: string): Promise<Jsontype> {
    console.log(`${domain}/sp/vad.json?rk=${rkValue}`)
    return axios
      .get(`${domain}/sp/vad.json?rk=${rkValue}`)
      .then(resdata => resdata.data)
      .catch(err => console.log(err));
  }

  /**
   * 2回目以降のxhr送信(v3なし)
   */
  async getJsonViaQuerry(): Promise<any> {
    const urlQuerry: string = location.search;
    const decodeUrlQuerry: string = decodeURIComponent(urlQuerry);
    const [_, urlValue] = decodeUrlQuerry.split('?url=');
    return axios
      .get(urlValue)
      .then(resdata => resdata.data)
      .catch(err => console.log(err));
  }

  /**
   * 2回目以降のxhr送信(v3有)
   */
  async getJsonViaQuerryPlusV3(v3Value: string): Promise<any> {
    console.log('v3はすでにあるよ')
    const urlQuerry: string = location.search;
    const decodeUrlQuerry: string = decodeURIComponent(urlQuerry);
    const [_, urlValue] = decodeUrlQuerry.split('?url=');
    return axios
      .get(`${urlValue}&v3=${v3Value}`)
      .then(resdata => resdata.data)
      .catch(err => console.log(err));
  }


  /**
   * rkが内容のpreview
   *
   * Jsontypeについて
   *  image_url: string;
   *  banner_text: string;
   *  href_url: string;
   *  height: string;
   *  width: string;
   *  videoad_vt_second: string;
   *  video_btn_text: string;
   *  rk: string;
   *  videoframe_url: string;
   *  entryframe_url: string;
   *  impression_url: string;
   *  ATV_MODE: string;
   *  ADAREA_HEIGHT: string;
   *
   * @param moveURL
   */
  async getPreviewJson(
    movieURL: string,
    height: string,
    width: string,
    bannerText: string,
    btnText: string,
    videoIFrameUrl: string,
    entryIFrameUrl: string,
    impressionUrl: string
  ): Promise<Jsontype> {
    let json = new Jsontype(
      movieURL,
      bannerText,
      '',
      height,
      width,
      '0',
      btnText,
      '',
      videoIFrameUrl,
      entryIFrameUrl,
      impressionUrl
    );

    return new Promise<Jsontype>((resolove, _) => {
      resolove(json);
    });
  }
}
