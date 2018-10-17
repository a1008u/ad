export interface jsontype {
  IMAGE_URL: string;
  BANNER_TEXT: string;
  HREF_URL: string;
  HEIGHT: string;
  WIDTH: string;
  videoad_vt_second: string;
  VIDEOAD_BTN_TEXT: string;
}

export class Jsontype {
  image_url: string;
  banner_text: string;
  href_url: string;
  height: string;
  width: string;
  videoad_vt_second: string;
  video_btn_text: string;
  rk: string;
  ATV_RK: string;
  ATV_MODE: string;
  ADAREA_HEIGHT: string;
  ATV_VIDEO_DOMAIN: string;
  ATV_IMP_DOMAIN: string;

  constructor(image_url, banner_text, href_url, height, width, video_btn_text, videoad_vt_second) {
    this.banner_text = banner_text;
    this.image_url = image_url;
    this.href_url = href_url;
    this.video_btn_text = video_btn_text;
    this.videoad_vt_second = videoad_vt_second;
    this.width = width;
    this.height = height;
    this.rk = '';
    this.ATV_RK = '';
    this.ATV_MODE = '';
    this.ADAREA_HEIGHT = '';
    this.ATV_VIDEO_DOMAIN = '';
    this.ATV_IMP_DOMAIN = '';
  }
}
