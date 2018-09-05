import { tag } from '../../../service/tag';
import { AnyRecordWithTtl } from 'dns';
import * as Rx from 'rxjs';
import {filter} from 'rxjs/operators'
import * as axios from 'axios';
import { resolve } from 'url';
import { rejects } from 'assert';
import { Z_FILTERED } from 'zlib';

export namespace EventViewThrough {

  let fadeOut = (node, duration) => {
    node.style.opacity = 1;
    let start = performance.now();
    requestAnimationFrame(function tick(timestamp) {
      // イージング計算式（linear）
      let easing = (timestamp - start) / duration;
      // opacityが0より小さくならないように
      node.style.opacity = Math.max(1 - easing, 0);
      // イージング計算式の値が1より小さいとき
      if (easing < 1) {
        requestAnimationFrame(tick);
      } else {
        node.style.opacity = '';
        node.style.display = 'none';
      }
    });
  };

  let cleanUp = (videoElement: HTMLVideoElement, divElementFilter: HTMLDivElement) => {
    console.log('del_EventViewThrough');
    // videoElement.removeAttribute('___videostop');
    videoElement.parentElement.removeAttribute('__aparent');
    videoElement.parentElement.removeChild(divElementFilter);
  };

  const deleteFilter = (videoElement: HTMLVideoElement, divElementFilter: HTMLDivElement) => {
    cleanUp(videoElement, divElementFilter);
    videoElement.setAttribute('___filter', 'off');
  };

  const videoPlay = (videoElement) => {
    videoElement.play();
    videoElement.setAttribute('playxxx', 'play');
  };

  const videoPause = (videoElement)  => {
    videoElement.pause();
    videoElement.setAttribute('playxxx', 'pause');
  };

  let deleteMethod = (videoElement, playMode, divElementFilter) => {
    console.log('クリックを検知');
    if (playMode === 'pause') {
      videoPlay(videoElement);
    } else {
      videoPause(videoElement);
    }

    deleteFilter(videoElement, divElementFilter);
  };

  let execfil = (videoTag: HTMLVideoElement, playMode: string, divElementFilter: HTMLDivElement) =>  {
    // videoTag.classList.add('___videostop');
    videoTag.parentElement.classList.add('__aparent');

    // filterの設定
    divElementFilter.classList.add('__filter');
    divElementFilter.setAttribute("style", `width:${String(videoTag.clientWidth)}px; height:${String(videoTag.clientHeight)}px; padding: 12%; cursor:pointer; z-index:30;`);

    const objectElement: HTMLObjectElement = document.createElement('object');
    objectElement.setAttribute('id', '___obj');

      const svgFilePath: string = playMode === 'pause' ? '../svg/play-circle-solid.svg': '../svg/pause-circle-solid.svg';
      const __text: string = playMode === 'pause' ? 'play': 'pause';
      const filterId: string = playMode === 'pause' ? '___play': '___pause';

      axios.default
          .get(svgFilePath)
          .then(resdata => {
              let svg: string = resdata.data;
              objectElement.innerHTML = svg;
              objectElement.setAttribute("style", `width:${String(videoTag.clientWidth / 2)}px; height:${String(videoTag.clientHeight / 2)}px; pointer-events: none;`);
              objectElement.setAttribute('___text', __text);

              divElementFilter.appendChild(objectElement);

              let svgTag = document.getElementById(filterId);
              svgTag.setAttribute("style", `width:${String(videoTag.clientWidth / 2)}px; height:${String(videoTag.clientHeight / 2)}px; pointer-events: none;`);
          })
          .catch(err => console.log(err));

      videoTag.parentElement.appendChild(divElementFilter);
  };

  /**
   * PCブラウザ用のイベントリスナー
   */
  export const setEventViewThroughPC = (videoElement: HTMLVideoElement) => {
    const video$: Rx.Observable<any> = Rx.fromEvent(videoElement, 'mouseover');
    video$
      .pipe(filter(ev => ev.target.getAttribute('___filter') === null))
      .subscribe(ev => {
        const videoElement: HTMLVideoElement = ev.target;
        const divElementFilter: HTMLDivElement = document.createElement('div');
        let playMode: string = ev.target.getAttribute('playxxx');

        execfil(videoElement, playMode, divElementFilter);

        const divFilter$: Rx.Observable<any> = Rx.fromEvent(divElementFilter, 'click');
        divFilter$.subscribe(ev => {
          deleteMethod(videoElement, playMode, ev.target);
        });

        const divFilterOut$: Rx.Observable<any> = Rx.fromEvent(divElementFilter, 'mouseout');
        divFilterOut$.subscribe(ev => {
          cleanUp(videoElement, divElementFilter);
        });
      });

    video$
      .pipe(filter(ev => ev.target.getAttribute('___filter') === 'off'))
      .subscribe(ev => ev.target.removeAttribute('___filter'));
  };

  /**
   * スマホブラウザ用
   */
  export const setEventViewThroughSmartPhone = (videoElement) => {

    const video$: Rx.Observable<any> = Rx.fromEvent(videoElement, 'touchstart');
      video$
        .subscribe(ev => {
          const videoElement: HTMLVideoElement = ev.target;
          const divElementFilter: HTMLDivElement = document.createElement('div');
          let playMode: string = ev.target.getAttribute('playxxx');

          execfil(videoElement, playMode, divElementFilter);

          const divFilterOut$: Rx.Observable<any> = Rx.fromEvent(divElementFilter, 'touchend');
          divFilterOut$.subscribe(ev => {
            ev.stopPropagation();
            deleteMethod(videoElement, playMode, ev.target);
          });

          // スマホの傾き検知用
          const window$: Rx.Observable<any> = Rx.fromEvent(window, 'orientationchange');
          window$.subscribe(ev => {
            if (divElementFilter) {
              deleteFilter(videoElement, divElementFilter);
            }

            if (playMode === 'pause') {
              videoPlay(videoElement);
              // videoElement.removeAttribute('___videostop');
            }
          });
        });

      // video$
      //   .pipe(filter(ev => ev.target.getAttribute('___filter') === 'off'))
      //   .subscribe(ev => {
      //       document.getElementById('__idd').innerText += '___filterを___filter';
      //       ev.target.removeAttribute('___filter')
      //   });
  };
}
