export interface jsontype {
  IMAGE_URL: string;
  BANNER_TEXT: string;
  HREF_URL: string;
  HEIGHT: string;
  WIDTH: string;
  VIDEOAD_VT_SECOND: string;
  VIDEOAD_BTN_TEXT: string;
  RK: string;
}

export class Jsontype {
  readonly image_url: string;
  readonly banner_text: string;
  href_url: string;
  readonly height: string;
  readonly width: string;
  videoad_vt_second: string;
  readonly video_btn_text: string;
  readonly rk: string;
  videoframe_url: string;
  entryframe_url: string;
  impression_url: string;
  ATV_MODE: string;
  ADAREA_HEIGHT: string;
  target: string;
  onClick: string;

  constructor(image_url, banner_text, href_url,
    height, width, videoad_vt_second, video_btn_text,rk,
    videoframe_url, entryframe_url, impression_url) {
    this.banner_text = banner_text;
    this.image_url = image_url;
    this.href_url = href_url;
    this.video_btn_text = video_btn_text;
    this.videoad_vt_second = videoad_vt_second;
    this.width = width;
    this.height = height;
    this.rk = rk;
    this.videoframe_url = videoframe_url;
    this.entryframe_url = entryframe_url;
    this.impression_url = impression_url;
    this.ATV_MODE = '';
    this.ADAREA_HEIGHT = '';
    this.target = '';
    this.onClick = '';
  }
}
