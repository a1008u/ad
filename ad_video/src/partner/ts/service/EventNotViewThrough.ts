import * as Rx from "rxjs";
import {Filter} from "./Filter";

export namespace EventNotViewThrough {
  /**
   * <div class='__aparent'>
   *  <div class='__button'>
   *     <div class='__play'></div>
   *  </div>
   *  <video class='__video' __end='true'></video>
   * </div>
   *
   * @param videoTag
   */
  export const setEventLoad = (videoElement: HTMLVideoElement) => {

    const deleteFilter = (ev: any) => {
      let targeFilterElement: HTMLElement = ev.target;
      targeFilterElement.parentElement.removeChild(targeFilterElement);
      videoElement.removeAttribute('__end');
      videoElement.play();
    };

    videoElement.addEventListener('ended', () => {

      const divElementFilter: HTMLDivElement = document.createElement('div');
      Filter.execfil(videoElement, 'pause', divElementFilter);
      videoElement.setAttribute('__end','true');

      const filter$: Rx.Observable<any> = Rx.fromEvent(divElementFilter, 'click');
      filter$.subscribe(ev => {
        deleteFilter(ev);
      });

      const window$: Rx.Observable<any> = Rx.fromEvent(window, 'orientationchange');
      window$.subscribe(ev => {
        deleteFilter(ev);
      });
    });
  };
}
