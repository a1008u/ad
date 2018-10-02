import * as Rx from 'rxjs';
import { filter } from 'rxjs/operators';
import { Filter } from './Filter';
import { tag } from '../../../../service/tag';

export namespace EventViewThrough {
  export const setEventLoad = (videoTag: HTMLElement, limitTime: number = 10000, $scriptElement) => {
    if (!$scriptElement.getAttribute('atv-mode')) {
      let count = 0;
      let cntEvt;
      // viewthrough
      videoTag.addEventListener('play', () => {
        if (count < limitTime) {
          cntEvt = window.setInterval(() => {
            count += 250;
            if (count > limitTime) {
              window.clearInterval(cntEvt);
              const url: string = `../../redirect/html/fm.html?rk=${videoTag.getAttribute('data-atv-video')}`;
              let iframeTag: HTMLIFrameElement = tag.mkIframeElementForTracking(url, '0', '0', 'none');
              videoTag.parentNode.insertBefore(iframeTag, videoTag);

              // 使用決定用に一旦表示（実際は削除します） -----------------------------------------
              const divElement: HTMLDivElement = document.createElement('div');
              divElement.textContent = 'viewthroughをしました';
              videoTag.parentNode.parentNode.insertBefore(divElement, videoTag.parentElement);
              // ----------------------------------------------------------------------------
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
    }
  };

  async function exc2($videoElement: HTMLVideoElement, playMode: string, videoElement: HTMLVideoElement) {

    let mode = $videoElement.getAttribute('playxxx');
    if(mode === "pause") {
      $videoElement.play();
      videoElement.setAttribute('playxxx', 'play');
    } else if(mode === "play")  {
      videoElement.pause();
      videoElement.setAttribute('playxxx', 'pause');
    } else {
      videoElement.pause();
      videoElement.setAttribute('playxxx', 'pause');
    }

    let $divElementFilter: HTMLDivElement = await Filter.execfil($videoElement, playMode);
    const mainDivElement: HTMLElement = $videoElement.parentElement;
    mainDivElement.appendChild($divElementFilter);

    const divFilter$: Rx.Observable<any> = Rx.fromEvent($divElementFilter, 'animationend');
    divFilter$.subscribe(ev => {
      Filter.deleteMethod($videoElement, playMode, ev.target);
    });
  }

  /**
   * PCブラウザ用のイベントリスナー
   */
  export const setEventViewThroughPC = (videoElement: HTMLVideoElement) => {
    const video$: Rx.Observable<any> = Rx.fromEvent(videoElement, 'click');
    video$.subscribe(ev => {
      const $videoElement: HTMLVideoElement = ev.target;
      let playMode: string = $videoElement.getAttribute('playxxx');
      exc2($videoElement, playMode, $videoElement);
    });
  };

  /**
   * スマホブラウザ用
   */
  export const setEventViewThroughSmartPhone = (videoElement: HTMLVideoElement) => {
    const video$: Rx.Observable<any> = Rx.fromEvent(videoElement, 'touchstart');
    video$.subscribe(ev => {
      const $videoElement: HTMLVideoElement = ev.target;
      let playMode: string = $videoElement.getAttribute('playxxx');
      exc2($videoElement, playMode, $videoElement);
    });
  };
}
