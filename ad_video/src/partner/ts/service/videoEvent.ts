import { tag } from '../../../service/tag';
import { viewstatus } from './viewstatus';

export namespace videoEvent {
  const debounce = (window: Window, name: string, handler, delay: number) => {
    let exec;
    window.addEventListener(
      name,
      ev => {
        if (exec) {
          clearTimeout(exec);
        }
        exec = setTimeout(() => {
          handler(ev);
        }, delay);
      },
      false
    );
  };

  // 表示確認
  const whenVisible = (videoTag: HTMLVideoElement, videoPlay, videoPause) => {
    const listener = (): void => {
      if (viewstatus.ckViewStatus(videoTag)) {
        videoPlay();
      } else {
        videoPause();
      }
    };

    if (!videoTag) {
      return;
    }
    debounce(window, 'scroll', listener, 250);
  };

  /**
   * イベント処理
   * @param {HTMLVideoElement} videoTag
   * @param {HTMLAnchorElement} aTag
   */
  export const setEvent = (
    videoTag: HTMLVideoElement,
    aTag: HTMLAnchorElement
  ) => {
    let count = 0;
    let cntEvt;

    // viewthrough
    videoTag.addEventListener('play', () => {
      if (count < 10000) {
        cntEvt = window.setInterval(() => {
          count += 250;
          if (count > 10000) {
            window.clearInterval(cntEvt);
            let iframeTag: HTMLIFrameElement = tag.mkTrackingTag(videoTag);
            videoTag.parentNode.insertBefore(iframeTag, videoTag);
          }
        }, 250);
      }
    });

    // viewthrough(pauseの場合は、カウントをclear)
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

    whenVisible(
      videoTag,
      () => {
        if (videoTag.paused) {
          videoTag.play();
        }
      },
      () => {
        if (!videoTag.paused) {
          videoTag.pause();
        }
      }
    );
  };
}
