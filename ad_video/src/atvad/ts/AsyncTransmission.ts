import { Jsontype } from '../../videoad/service/jsontype';
import axios from 'axios';

export class AsyncTransmission {

  constructor() {
    console.log('AsyncTransmission');
  }

  /**
   * 1回目のxhr送信（動画広告表示用のJSON取得）
   * @param domain
   * @param rkValue
   */
  async getJson(domain: string, rkValue: string): Promise<Jsontype> {
    return axios
      .get(`${domain}/sp/vad.json?rk=${rkValue}`)
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
    videoFrameUrl: string,
    entryFrameUrl: string,
    impressionUrl: string
  ): Promise<Jsontype> {
    let json = new Jsontype(
      movieURL,
      bannerText,
      '',
      width,
      height,
      '0',
      btnText,
      '',
      videoFrameUrl,
      entryFrameUrl,
      impressionUrl
    );

    return new Promise<Jsontype>((resolove, _) => {
      resolove(json);
    });
  }
}
