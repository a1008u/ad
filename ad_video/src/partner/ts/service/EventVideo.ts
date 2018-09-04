import { tag } from '../../../service/tag';
import { AnyRecordWithTtl } from 'dns';

export namespace EventVideo {
  /**
   * イベント処理(viewthroughかつaTagで囲む版)
   * @param {HTMLVideoElement} videoTag
   * @param {HTMLAnchorElement} aTag
   * @param {number} limitTime
   */
  export const setEventForViewthroghAboutA = (
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

    videoTag.addEventListener('ended', () => {
      console.log('play ---------------------');
      videoTag.play();
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

  /**
   * viewthrowの動き(viewthroughかつaTag無しで囲む版)
   * @param videoTag
   * @param limitTime
   */
  export const setEventForViewthrogh = (
    videoTag: HTMLVideoElement,
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

            // 使用決定用に一旦表示（実際は削除します）
            const divElement: HTMLDivElement = document.createElement('div');
            divElement.textContent = 'viewthroughをしました';
            videoTag.parentNode.parentNode.insertBefore(divElement, videoTag.parentElement);
          }
        }, 250);
      }
    });

    // 要検討：viewthrough(pauseの場合は、繰り返し動作を止める)
    videoTag.addEventListener('pause', () => {
      if (cntEvt) {
        window.clearInterval(cntEvt);
      }
    });
  };
}
