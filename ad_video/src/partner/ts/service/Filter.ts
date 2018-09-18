import axios from 'axios';
import { EventResize } from "./EventResize";

export namespace Filter {
  export let cleanUp = (videoElement: HTMLVideoElement, divElementFilter: HTMLDivElement) => {
    console.log('del_EventViewThrough');
    const mainDivElement:HTMLElement = videoElement.parentElement;
    mainDivElement.removeAttribute('__aparent');
    mainDivElement.removeChild(divElementFilter);
  };

  export const deleteFilter = (videoElement: HTMLVideoElement, divElementFilter: HTMLDivElement) => {
    cleanUp(videoElement, divElementFilter);
    videoElement.setAttribute('___filter', 'off');
  };

  export const videoPlay = (videoElement) => {
    videoElement.play();
    videoElement.setAttribute('playxxx', 'play');
  };

  const videoPause = (videoElement)  => {
    videoElement.pause();
    videoElement.setAttribute('playxxx', 'pause');
  };

  export let deleteMethod = (videoElement, playMode, divElementFilter) => {
    console.log('クリックを検知');
    if (playMode === 'pause') {
      videoPlay(videoElement);
    } else {
      videoPause(videoElement);
    }
    deleteFilter(videoElement, divElementFilter);
  };

  export let execfil = (videoTag: HTMLVideoElement, playMode: string, divElementFilter: HTMLDivElement) =>  {
    const mainDivElement: HTMLElement = videoTag.parentElement;
    mainDivElement.classList.add('__aparent');

    // filterの設定
    divElementFilter.classList.add('__filter');
    divElementFilter.setAttribute("style", `width:${String(videoTag.clientWidth)}px; height:${String(videoTag.clientHeight)}px; padding: ${String(videoTag.clientHeight/4)}px; cursor:pointer; z-index:30; box-sizing:border-box;`);

    const objectElement: HTMLObjectElement = document.createElement('object');
    objectElement.setAttribute('id', '___obj');

    const svgFilePath: string = playMode === 'pause' ? '../svg/play-circle-solid.svg': '../svg/pause-circle-solid.svg';
    const __text: string = playMode === 'pause' ? 'play': 'pause';

    axios
      .get(svgFilePath)
      .then(resdata => {
        const svg: string = resdata.data;
        objectElement.innerHTML = svg;
        objectElement.setAttribute("style", `width:${String(videoTag.clientWidth / 2)}px; height:${String(videoTag.clientHeight / 2)}px; pointer-events: none;`);
        objectElement.setAttribute('___text', __text);

        divElementFilter.appendChild(objectElement);

        const svgElement = divElementFilter.firstElementChild.firstElementChild;
        svgElement.setAttribute("style", `width:${String(videoTag.clientWidth / 2)}px; height:${String(videoTag.clientHeight / 2)}px; pointer-events: none;`);
      })
      .catch(err => console.log(err));

    mainDivElement.appendChild(divElementFilter);

    EventResize.setEvent(videoTag, divElementFilter);
  };
}
