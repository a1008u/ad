import { Jsontype } from '../../../../service/class/jsontype';
import { OS } from '../../../../service/interface/OS';
import { Observable, fromEvent } from 'rxjs';
import { FilterEvent } from '../Filter/FilterEvent';

const filterEvent: FilterEvent = new FilterEvent();

export namespace VideoFilterEventFactory {
  /**
   * クリックやタッチ時のイベント
   * @param videoElement
   * @param atvJson
   * @param eventType
   */
  export const setClickOrTouchEvent = (
    videoElement: HTMLVideoElement,
    atvJson: Jsontype,
    eventType: string,
  ) => {
    const video$: Observable<any> = fromEvent(videoElement, eventType);
    video$.subscribe(ev => {
      const $videoElement: HTMLVideoElement = ev.target;
      filterEvent.prepareFilter($videoElement, atvJson);
    });
  };

  export const osEvent: OS = {
    ios: (videoTag: HTMLVideoElement, atvJson: Jsontype) => {
      setClickOrTouchEvent(videoTag, atvJson, 'touchstart');
    },
    android: (videoTag: HTMLVideoElement, atvJson: Jsontype) => {
      setClickOrTouchEvent(videoTag, atvJson, 'touchstart');
    },
    windowsphone: (videoTag: HTMLVideoElement, atvJson: Jsontype) => {
      setClickOrTouchEvent(videoTag, atvJson, 'touchstart');
    },
    pc: (videoTag: HTMLVideoElement, atvJson: Jsontype) => {
      setClickOrTouchEvent(videoTag, atvJson, 'click');
    },
  };
}
