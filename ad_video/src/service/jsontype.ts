export interface jsontype {
  IMAGE_URL: string;
  BANNER_TEXT: string;
  HREF_URL: string;
  HEIGHT: string;
  WIDTH: string;
  VIDEOAD_VT_SECOND: string;
  VIDEOAD_BTN_TEXT: string;
}

export class Jsontype {
  IMAGE_URL: string;
  BANNER_TEXT: string;
  HREF_URL: string;
  HEIGHT: string;
  WIDTH: string;
  VIDEOAD_VT_SECOND: string;
  VIDEOAD_BTN_TEXT: string;
  ATV_RK: string;
  ATV_MODE: string;

  constructor(IMAGE_URL,BANNER_TEXT,HREF_URL,HEIGHT,WIDTH,VIDEOAD_VT_SECOND,VIDEOAD_BTN_TEXT) {
    this.BANNER_TEXT = BANNER_TEXT;
    this.IMAGE_URL = IMAGE_URL;
    this.HREF_URL = HREF_URL;
    this.VIDEOAD_BTN_TEXT = VIDEOAD_BTN_TEXT;
    this.VIDEOAD_VT_SECOND = VIDEOAD_VT_SECOND;
    this.WIDTH = WIDTH;
    this.HEIGHT = HEIGHT;
    this.ATV_RK = '';
    this.ATV_MODE = '';
  }
}
