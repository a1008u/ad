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

  let cleanUp = (videoTag: HTMLVideoElement, divElement_fil: HTMLDivElement) => {
    console.log('del_EventViewThrough');
    videoTag.removeAttribute('___videostop');
    videoTag.parentElement.removeAttribute('__aparent');
    videoTag.parentElement.removeChild(divElement_fil);
  };

  let deleteMethod = (videoTag, playMode, divElement_fil) => {
    console.log('クリックを検知');
    if (playMode === 'pause') {
      videoTag.play();
      videoTag.setAttribute('playxxx', 'play');
    } else {
      videoTag.pause();
      videoTag.setAttribute('playxxx', 'pause');
    }

    videoTag.removeAttribute('___videostop');
    videoTag.setAttribute('___filter', 'off');
    videoTag.parentElement.removeAttribute('__aparent');
    videoTag.parentElement.removeChild(divElement_fil);
  };

  let execfil = (videoTag, playMode, divElement_fil: HTMLDivElement) =>  {
    videoTag.classList.add('___videostop');
    videoTag.parentElement.classList.add('__aparent');
    divElement_fil.classList.add('__filter');
    divElement_fil.setAttribute("style", `width:${String(videoTag.clientWidth)}px; height:${String(videoTag.clientHeight)}px; padding: 12%; cursor:pointer`);
    const imgElement_play: HTMLObjectElement = document.createElement('object');
    imgElement_play.setAttribute('id', '___obj');

    if (playMode === 'pause') {
      axios.default
        .get('../svg/play-circle-solid.svg')
        .then(resdata => {
          let svg: string = resdata.data;
          imgElement_play.innerHTML = svg;
          imgElement_play.setAttribute("style", `width:${String(videoTag.clientWidth / 2)}px; height:${String(videoTag.clientHeight / 2)}px; pointer-events: none;`);
          imgElement_play.setAttribute('___text', 'play');
          divElement_fil.appendChild(imgElement_play);

          let svgTag = document.getElementById('___play');
          svgTag.setAttribute("style", `width:${String(videoTag.clientWidth / 2)}px; height:${String(videoTag.clientHeight / 2)}px; pointer-events: none;`);
        })
        .catch(err => console.log(err));

    } else {
      axios.default
        .get('../svg/pause-circle-solid.svg')
        .then(resdata => {
          let svg: string = resdata.data;
          imgElement_play.innerHTML = svg;
          imgElement_play.setAttribute("style", `width:${String(videoTag.clientWidth / 2)}px; height:${String(videoTag.clientHeight / 2)}px; pointer-events: none;`);
          imgElement_play.setAttribute('___text', 'pause');
          divElement_fil.appendChild(imgElement_play);

          let svgTag = document.getElementById('___pause');
          svgTag.setAttribute("style", `width:${String(videoTag.clientWidth / 2)}px; height:${String(videoTag.clientHeight / 2)}px; pointer-events: none;`);
        })
        .catch(err => console.log(err));
    }

    // divElement_fil.appendChild(imgElement_play);
    videoTag.parentElement.appendChild(divElement_fil);
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
          // cleanUp(videoElement, divElementFilter);
           deleteMethod(videoElement, playMode, ev.target);
        });
      });

    video$
      .pipe(filter(ev => ev.target.getAttribute('___filter') === 'off'))
      .subscribe(ev => ev.target.removeAttribute('___filter'));
  };

  /**
   * スマホブラウザ用
   */
  export const setEventViewThroughSmartPhone = (videoTag) => {
    videoTag.addEventListener('touchstart', () => {
      let fillter_off: string = videoTag.getAttribute('___filter');
      if (fillter_off === 'off') {
        videoTag.removeAttribute('___filter');
      } else {
        const divElement_fil: HTMLDivElement = document.createElement('div');
        let playMode: string = videoTag.getAttribute('playxxx');

        execfil(videoTag, playMode, divElement_fil);

        //doTimeout(videoTag, divElement_fil);
        setTimeout(() => {
          cleanUp(videoTag, divElement_fil);
        }, 1000);

        divElement_fil.addEventListener('touchstart', () => {
          deleteMethod(videoTag, playMode, divElement_fil);
        });

        // スマホの傾き検知用
        window.addEventListener('orientationchange', () => {
          if (divElement_fil) {
            videoTag.removeAttribute('___videostop');
            videoTag.setAttribute('___filter','off');
            videoTag.parentElement.removeAttribute('__aparent');
            videoTag.parentElement.removeChild(divElement_fil);
          }

          if (playMode === 'pause') {
            videoTag.play();
            videoTag.setAttribute('playxxx','play');
            videoTag.removeAttribute('___videostop');
          }
        });
      }
    });
  };
}
