import { jsontype, Jsontype } from "./jsontype";

export namespace tag {
  /**
   * aTagの生成
   * @param {string} rk
   * @returns {HTMLAnchorElement}
   */
  export const mkAtag = (rk: string): HTMLAnchorElement => {
    const aTag: HTMLAnchorElement = document.createElement('a');
    aTag.href = `click?rk=${rk}`;
    aTag.target = '_blank';
    return aTag;
  };

  /**
   * videoタグの生成
   * @param {HTMLScriptElement} script
   * @param {string} rk
   * @returns {HTMLVideoElement}
   */
  export const mkVideoTag = (
    atvJson: Jsontype,
    rk: string,
    loop: boolean = true
  ): HTMLVideoElement => {
    const videoTag: HTMLVideoElement = document.createElement('video');
    videoTag.src = atvJson.IMAGE_URL;
    videoTag.width = Number(atvJson.WIDTH);
    videoTag.muted = true;
    videoTag.loop = loop;
    videoTag.setAttribute('playsinline', 'playsinline');
    videoTag.setAttribute('data-atv-video', rk);
    videoTag.setAttribute("data-emergence", "hidden");
    videoTag.setAttribute('style', `cursor:pointer;`);

    return videoTag;
  };

  export const mkVideoElement = (atvJson: Jsontype, loop: string) => {
    const $videoElement: HTMLVideoElement = document.getElementById('atvVideo') as HTMLVideoElement;
    $videoElement.setAttribute('src', atvJson.IMAGE_URL);
    $videoElement.setAttribute('width', atvJson.WIDTH);
    $videoElement.setAttribute('loop', loop);
    $videoElement.setAttribute('data-atv-video', atvJson.ATV_RK);
    return $videoElement;
  };

  /**
   * iframe用のタグ
   * @param {HTMLVideoElement} videoTag
   * @returns {HTMLIFrameElement}
   */
  export const mkIframeElement = (
    src: string
    , width: string
    , height: string
  ): HTMLIFrameElement => {
    let ifr: HTMLIFrameElement = document.createElement('iframe');
    ifr.src = src;
    ifr.width = width;
    ifr.height = height;
    ifr.name='iframe';
    ifr.setAttribute("data-emergence", "hidden");
    ifr.setAttribute('class', '__mainDivShadow ');
    return ifr;
  };

  export const mkIframeElementForTracking = (
    src: string
    , width: string
    , height: string
    , display: string
  ): HTMLIFrameElement => {
    const ifr: HTMLIFrameElement = mkIframeElement(src, width, height);
    ifr.style.display = display;
    return ifr;
  };

  export const mkImageTag = (src: string): HTMLImageElement => {
    let imgTag: HTMLImageElement = document.createElement('img');
    imgTag.src = src;
    imgTag.alt = 'test';
    imgTag.width = 0;
    imgTag.height = 0;
    return imgTag;
  };
}
