import { EventViewThrough } from '../EventViewThrough';
import { Jsontype } from '../../../../service/class/jsontype';
import { OS } from '../../../../service/interface/OS';
import * as Rx from 'rxjs';
import { FilterEvent } from '../Filter/FilterEvent';

const filterEvent: FilterEvent = new FilterEvent();

export namespace VideoFilterEventFactory {
  
  export const osEvent: OS = {
    ios: (videoTag: HTMLVideoElement, atvJson: Jsontype) => {
      setTouchEventSmartPhone(videoTag, atvJson);
    },
    android: (videoTag: HTMLVideoElement, atvJson: Jsontype) => {
      setTouchEventSmartPhone(videoTag, atvJson);
    },
    windowsphone: (videoTag: HTMLVideoElement, atvJson: Jsontype) => {
      setTouchEventSmartPhone(videoTag, atvJson);
    },
    pc: (videoTag: HTMLVideoElement, atvJson: Jsontype) => {
      setClickEventPC(videoTag, atvJson);
    },
  };

  /**
   * PCブラウザ用 イベントリスナー
   */
  export const setClickEventPC = (
    videoElement: HTMLVideoElement,
    atvJson: Jsontype
  ) => {
    const video$: Rx.Observable<any> = Rx.fromEvent(videoElement, 'click');
    video$.subscribe(ev => {
      filterEvent.prepareFilter(ev, atvJson);
    });
  };

  /**
   * スマホブラウザ用 イベントリスナー
   */
  export const setTouchEventSmartPhone = (
    videoElement: HTMLVideoElement,
    atvJson: Jsontype
  ) => {
    const video$: Rx.Observable<any> = Rx.fromEvent(videoElement, 'touchstart');
    video$.subscribe(ev => {
      filterEvent.prepareFilter(ev, atvJson);
    });
  };
}
