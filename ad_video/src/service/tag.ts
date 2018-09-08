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
    script: HTMLScriptElement,
    rk: string,
    loop: boolean = true
  ): HTMLVideoElement => {
    const videoTag: HTMLVideoElement = document.createElement('video');
    // videoTag.height = parseInt(script.getAttribute('data-atv-height'));
    // videoTag.width = parseInt(script.getAttribute('data-atv-width'));
    videoTag.src = script.getAttribute('data-atv-src');
    videoTag.muted = true;
    videoTag.loop = loop;
    videoTag.setAttribute('playsinline', 'playsinline');
    videoTag.setAttribute('data-atv-video', rk);
    videoTag.setAttribute("data-emergence", "hidden");
    videoTag.setAttribute('style','cursor:pointer;');

    let cssType: string = script.getAttribute('test-s');
    if (cssType) {
      videoTag.setAttribute('test-css-type', cssType);
    }

    return videoTag;
  };

  /**
   * iframe用のタグ
   * @param {HTMLVideoElement} videoTag
   * @returns {HTMLIFrameElement}
   */
  export const mkTrackingTag = (
    videoTag: HTMLVideoElement
  ): HTMLIFrameElement => {
    let ifr: HTMLIFrameElement = document.createElement('iframe');
    ifr.src =
      '../../redirect/html/fm.html?rk=' +
      videoTag.getAttribute('data-atv-video');
    ifr.style.display = 'none';
    ifr.width = '0';
    ifr.height = '0';
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
