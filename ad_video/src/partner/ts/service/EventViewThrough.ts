import { tag } from '../../../service/tag';
import { AnyRecordWithTtl } from 'dns';
import * as Rx from 'rxjs';
import {filter} from 'rxjs/operators'
import * as axios from 'axios';
import { resolve } from 'url';
import { rejects } from 'assert';
import { Z_FILTERED } from 'zlib';
import {Filter} from "./Filter";

export namespace EventViewThrough {
  /**
   * PCブラウザ用のイベントリスナー
   */
  export const setEventViewThroughPC = (videoElement: HTMLVideoElement) => {
    const video$: Rx.Observable<any> = Rx.fromEvent(videoElement, 'mouseover');
    video$
      .subscribe(ev => {
        const videoElement: HTMLVideoElement = ev.target;
        const divElementFilter: HTMLDivElement = document.createElement('div');
        let playMode: string = videoElement.getAttribute('playxxx');

        Filter.execfil(videoElement, playMode, divElementFilter);

        const divFilter$: Rx.Observable<any> = Rx.fromEvent(divElementFilter, 'click');
        divFilter$.subscribe(ev => {
          Filter.deleteMethod(videoElement, playMode, ev.target);
        });

        const divFilterOut$: Rx.Observable<any> = Rx.fromEvent(divElementFilter, 'mouseout');
        divFilterOut$.subscribe(ev => {
          Filter.cleanUp(videoElement, ev.target);
        });
      });

  };

  /**
   * スマホブラウザ用
   */
  export const setEventViewThroughSmartPhone = (videoElement) => {

    const video$: Rx.Observable<any> = Rx.fromEvent(videoElement, 'touchstart');
    video$.subscribe(ev => {
      const videoElement: HTMLVideoElement = ev.target;
      const divElementFilter: HTMLDivElement = document.createElement('div');
      let playMode: string = ev.target.getAttribute('playxxx');

      Filter.execfil(videoElement, playMode, divElementFilter);

      const divFilterOut$: Rx.Observable<any> = Rx.fromEvent(divElementFilter, 'touchend');
      divFilterOut$.subscribe(ev => {
        ev.stopPropagation();
        Filter.deleteMethod(videoElement, playMode, ev.target);
      });

      // スマホの傾き検知用
      const window$: Rx.Observable<any> = Rx.fromEvent(window, 'orientationchange');
      window$.subscribe(ev => {
        if (divElementFilter) {
          Filter.deleteFilter(videoElement, divElementFilter);
        }

        if (playMode === 'pause') {
          Filter.videoPlay(videoElement);
        }
      });
    });

    video$
      .pipe(filter(ev => ev.target.getAttribute('___filter') === 'off'))
      .subscribe(ev => {
        document.getElementById('__idd').innerText += '___filterを___filter';
        ev.target.removeAttribute('___filter')
      });
  };
}
