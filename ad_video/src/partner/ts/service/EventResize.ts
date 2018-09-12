import * as Rx from "rxjs";

export namespace EventResize {
  export const setEvent = (videoElement: HTMLVideoElement, divElementFilter: HTMLElement) => {

    const deleteFilter = (divElementFilter: HTMLElement) => {
      let MainDivElement: HTMLElement = divElementFilter.parentElement;
      if (MainDivElement) {
        MainDivElement.removeChild(divElementFilter);
        videoElement.removeAttribute('__end');
        videoElement.play();
      }
    };

    const window$: Rx.Observable<any> = Rx.fromEvent(window, 'resize');
    window$.subscribe(ev => {
      deleteFilter(divElementFilter);
    });
  };
}
