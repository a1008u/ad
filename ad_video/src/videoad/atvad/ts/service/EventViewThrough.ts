import * as Rx from 'rxjs';
import { Filter } from './Filter';
import { tag } from '../../../service/tag';
import { Jsontype } from '../../../service/jsontype';

export namespace EventViewThrough {

  /**
   * 
   * @param videoTag 
   * @param atvJson 
   */
  export const setEventLoad = (videoTag: HTMLElement, atvJson: Jsontype) => {
    let count = 0;
    let cntEvt;
    let limitTime: number = Number(atvJson.videoad_vt_second) * 1000;
    videoTag.addEventListener('play', () => {
      if (count < limitTime) {
        cntEvt = window.setInterval(() => {
          count += 250;
          if (count > limitTime) {
            window.clearInterval(cntEvt);
            // const url: string = `.${atvJson.HREF_URL}?rk=${videoTag.getAttribute('data-atv-video')}`;

            // クリックのやつ
            // const url: string = `../../../redirect/send_h_is/html/re_send_h_is.html?rk=${videoTag.getAttribute('data-atv-video')}`;
            const url: string = `${atvJson.entryframe_url}?url=${encodeURIComponent(atvJson.)}`;

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
  };

  async function showFilter($videoElement: HTMLVideoElement, playMode: string) {

    let mode = $videoElement.getAttribute('playxxx');
    if(mode === "pause") {
      $videoElement.play();
      $videoElement.setAttribute('playxxx', 'play');
    } else if(mode === "play")  {
      $videoElement.pause();
      $videoElement.setAttribute('playxxx', 'pause');
    } else {
      $videoElement.pause();
      $videoElement.setAttribute('playxxx', 'pause');
    }

    let $divElementFilter: HTMLDivElement = await Filter.execFil($videoElement, playMode);
    const mainDivElement: HTMLElement = $videoElement.parentElement;
    mainDivElement.appendChild($divElementFilter);

    const divFilter$: Rx.Observable<any> = Rx.fromEvent($divElementFilter, 'animationend');
    divFilter$.subscribe(ev => {
      Filter.deleteMethod($videoElement, playMode, ev.target);
    });
  }

  /**
   * 
   * @param ev 
   */
  const prepareFilter = (ev: any) => {
    const $videoElement: HTMLVideoElement = ev.target;
    let playMode: string = $videoElement.getAttribute('playxxx');
    showFilter($videoElement, playMode);
  };

  /**
   * PCブラウザ用 イベントリスナー
   */
  export const setClickEventPC = (videoElement: HTMLVideoElement) => {
    const video$: Rx.Observable<any> = Rx.fromEvent(videoElement, 'click');
    video$.subscribe(ev => {
      prepareFilter(ev);
    });
  };

  /**
   * スマホブラウザ用 イベントリスナー
   */
  export const setTouchEventSmartPhone = (videoElement: HTMLVideoElement) => {
    const video$: Rx.Observable<any> = Rx.fromEvent(videoElement, 'touchstart');
    video$.subscribe(ev => {
      prepareFilter(ev);
    });
  };
}
