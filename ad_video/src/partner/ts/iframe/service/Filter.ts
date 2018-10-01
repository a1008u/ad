import axios from 'axios';
import { EventResize } from "./EventResize";

export namespace Filter {
  export let cleanUp = (videoElement: HTMLVideoElement, divElementFilter: HTMLDivElement) => {
    const mainDivElement:HTMLElement = videoElement.parentElement;
    mainDivElement.removeAttribute('atvMain');
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
    console.log('playModeは【 '+playMode+' 】');
    if (playMode === 'pause') {
      videoPlay(videoElement);
    } else {
      videoPause(videoElement);
    }
    deleteFilter(videoElement, divElementFilter);
  };

  export let execfil = (videoTag: HTMLVideoElement, playMode: string) => {

    // filterの設定
    const divElementFilter: HTMLDivElement = document.createElement('div');
    divElementFilter.classList.add('__filter');
    divElementFilter.setAttribute("style", `width:${String(videoTag.clientWidth)}px; height:${String(videoTag.clientHeight)}px; padding: ${String(videoTag.clientHeight/4)}px; cursor:pointer; z-index:30; box-sizing:border-box;`);

    const svgFilePath: string = playMode === 'pause' ? '../../svg/play-circle-solid.svg': '../../svg/pause-circle-solid.svg';
    const mode: string = playMode === 'pause' ? 'play': 'pause';
    axios
      .get(svgFilePath)
      .then(resdata => resdata.data)
      .then(svg => {
        const objectElement: HTMLObjectElement = document.createElement('object');
        objectElement.setAttribute('id', '___obj');
        objectElement.innerHTML = svg;
        objectElement.setAttribute("style", `width:${String(videoTag.clientWidth / 2)}px; height:${String(videoTag.clientHeight / 2)}px; pointer-events: none;`);
        objectElement.setAttribute('___text', mode);
        divElementFilter.appendChild(objectElement);
        const svgElement = divElementFilter.firstElementChild.firstElementChild;
        svgElement.setAttribute("style", `width:${String(videoTag.clientWidth / 2)}px; height:${String(videoTag.clientHeight / 2)}px; pointer-events: none;`);
      })
      .catch(err => console.log(err));

    // リサイズしたら動くようにする
    EventResize.setEvent(videoTag, divElementFilter);

    return divElementFilter;
  };
}
