import { tag } from '../../../service/tag';

export namespace videoEvent {
  /**
   * イベント処理
   * @param {HTMLVideoElement} videoTag
   * @param {HTMLAnchorElement} aTag
   * @param {number} limitTime
   */
  export const setEvent = (
    videoTag: HTMLVideoElement,
    aTag: HTMLAnchorElement,
    limitTime: number = 10000
  ) => {
    let count = 0;
    let cntEvt;

    // viewthrough
    videoTag.addEventListener('play', () => {
      if (count < limitTime) {
        cntEvt = window.setInterval(() => {
          count += 250;
          if (count > limitTime) {
            window.clearInterval(cntEvt);
            let iframeTag: HTMLIFrameElement = tag.mkTrackingTag(videoTag);
            videoTag.parentNode.insertBefore(iframeTag, videoTag);
          }
        }, 250);
      }
    });

    // viewthrough(pauseの場合は、繰り返し動作を止める)
    videoTag.addEventListener('pause', () => {
      if (cntEvt) {
        window.clearInterval(cntEvt);
      }
    });

    // videoタグ（aタグ）をクリックされた場合
    videoTag.parentNode.addEventListener('click', () => {
      videoTag.pause();
      aTag.href += '&p=' + videoTag.currentTime;
    });
  };
}
