import * as Rx from 'rxjs';
import { filter } from 'rxjs/operators';
import { Filter } from './Filter';
import { tag } from '../../../service/tag';

export namespace EventViewThrough {
  export const setEventLoad = (videoTag: HTMLVideoElement, limitTime: number = 10000) => {
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
  };

  /**
   * PCブラウザ用のイベントリスナー
   */
  export const setEventViewThroughPC = (videoElement: HTMLVideoElement) => {
    const video$: Rx.Observable<any> = Rx.fromEvent(videoElement, 'mouseover');
    video$.subscribe(ev => {
      const $videoElement: HTMLVideoElement = ev.target;
      const $divElementFilter: HTMLDivElement = document.createElement('div');
      let playMode: string = $videoElement.getAttribute('playxxx');

      Filter.execfil($videoElement, playMode, $divElementFilter);

      const divFilter$: Rx.Observable<any> = Rx.fromEvent($divElementFilter, 'click');
      divFilter$.subscribe(ev => {
        Filter.deleteMethod($videoElement, playMode, ev.target);
      });

      const divFilterOut$: Rx.Observable<any> = Rx.fromEvent($divElementFilter, 'mouseout');
      divFilterOut$.subscribe(ev => {
        Filter.cleanUp($videoElement, ev.target);
      });
    });
  };

  /**
   * スマホブラウザ用
   */
  export const setEventViewThroughSmartPhone = (videoElement: HTMLVideoElement) => {
    const video$: Rx.Observable<any> = Rx.fromEvent(videoElement, 'touchstart');
    video$.subscribe(ev => {
      const $videoElement: HTMLVideoElement = ev.target;
      const $divElementFilter: HTMLDivElement = document.createElement('div');
      let playMode: string = ev.target.getAttribute('playxxx');

      Filter.execfil($videoElement, playMode, $divElementFilter);

      const divFilterOut$: Rx.Observable<any> = Rx.fromEvent($divElementFilter, 'touchend');
      divFilterOut$.subscribe(ev => {
        ev.stopPropagation();
        Filter.deleteMethod($videoElement, playMode, ev.target);
      });

      // スマホの傾き検知用
      const window$: Rx.Observable<any> = Rx.fromEvent(window, 'orientationchange');
      window$.subscribe(ev => {
        if ($divElementFilter) {
          Filter.deleteFilter($videoElement, $divElementFilter);
        }

        if (playMode === 'pause') {
          Filter.videoPlay($videoElement);
        }
      });
    });

    video$
      .pipe(filter(ev => ev.target.getAttribute('___filter') === 'off'))
      .subscribe(ev => {
        // document.getElementById('__idd').innerText += '___filterを___filter';
        ev.target.removeAttribute('___filter');
      });
  };
}
