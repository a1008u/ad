import * as Rx from "rxjs";
import {Filter} from "./Filter";

export namespace EventNotViewThrough {
  /**
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

    videoElement.removeAttribute('loop');
    videoElement.addEventListener('ended', () => {
      Filter.execfil2(videoElement, 'pause').then(divElementFilter => {
        const mainDivElement: HTMLElement = videoElement.parentElement;
        mainDivElement.classList.add('__aparent');
        mainDivElement.appendChild(divElementFilter);
        videoElement.setAttribute('__end', 'true');

        const filter$: Rx.Observable<any> = Rx.fromEvent(divElementFilter, 'click');
        filter$.subscribe(ev => {
          deleteFilter(ev);
        });
      });
    });
  };
}
