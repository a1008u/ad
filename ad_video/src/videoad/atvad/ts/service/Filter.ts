import axios from 'axios';

export namespace Filter {
  let cleanUp = (videoElement: HTMLVideoElement, divElementFilter: HTMLDivElement) => {
    const mainDivElement: HTMLElement = videoElement.parentElement;
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
    if (playMode === 'pause') {
      videoPlay(videoElement);
    } else {
      videoPause(videoElement);
    }
    deleteFilter(videoElement, divElementFilter);
  };

  /**
   * svgを取得する
   */
  const mkObjElement = (svgData: any, videoTag: HTMLVideoElement, playMode: string) : HTMLObjectElement => {
    const objectElement: HTMLObjectElement = document.createElement('object');
    objectElement.setAttribute('id', '___obj');
    objectElement.innerHTML = svgData;
    objectElement.setAttribute("style", `width:${String(videoTag.clientWidth / 2)}px; height:${String(videoTag.clientHeight / 2)}px; pointer-events: none;`);
    const mode: string = playMode === 'pause' ? 'play' : 'pause';
    objectElement.setAttribute('___text', mode);
    return objectElement;
  };



  const getFilterNotAnimation = (videoTag: HTMLVideoElement) : HTMLDivElement => {
    const divElementFilter: HTMLDivElement = document.createElement('div');
    divElementFilter.classList.add('__filter');
    divElementFilter.setAttribute("style", `width:${String(videoTag.clientWidth)}px; height:${String(videoTag.clientHeight)}px; padding: ${String(videoTag.clientHeight / 4)}px; cursor:pointer; z-index:30; box-sizing:border-box;`);
    return divElementFilter;
  };

  const getFilter = (videoTag: HTMLVideoElement) : HTMLDivElement => {
    const divElementFilter: HTMLDivElement = getFilterNotAnimation(videoTag);
    divElementFilter.classList.add('___ani');
    return divElementFilter;
  };

  /**
   * 
   * @param playMode 
   */
  export async function getSvgObjElment(playMode: string) {
    const svgFilePath: string = playMode === 'pause' 
      ? '../../atvad/svg/play-circle-solid.svg' 
      : '../../atvad/svg/pause-circle-solid.svg';

    return axios
      .get(svgFilePath)
      .then(resdata => resdata.data)
      .catch(err => console.log(err));
  }


  async function mkFilterElement(videoTag: HTMLVideoElement, getFilter: (videoTag: HTMLVideoElement) => HTMLDivElement, playMode: string ) {
    const divElementFilter: HTMLDivElement = getFilter(videoTag);
    const svgData = await getSvgObjElment(playMode);
    const objectElement: HTMLObjectElement = mkObjElement(svgData, videoTag, playMode);
    divElementFilter.appendChild(objectElement);
    return divElementFilter;
  }

  /**
   * 動画再生時用フィルター生成
   * @param videoTag 
   * @param playMode 
   */
  export async function execFil(videoTag: HTMLVideoElement, playMode: string) {
    const divElementFilter: HTMLDivElement = await mkFilterElement(videoTag, getFilter, playMode);
    const svgElement = divElementFilter.firstElementChild.firstElementChild;
    svgElement.setAttribute("style", `width:${String(videoTag.clientWidth / 2)}px; height:${String(videoTag.clientHeight / 2)}px; pointer-events: none;`);
    return divElementFilter;
  }

  /**
   * 動画再生終了用フィルター生成(非ビュースルーで利用します)
   * @param videoTag 
   * @param playMode 
   */
  export async function execFilnotAnimation(videoTag: HTMLVideoElement, playMode: string) {
    const divElementFilter: HTMLDivElement = await mkFilterElement(videoTag, getFilterNotAnimation, playMode);
    const svgElement = divElementFilter.firstElementChild.firstElementChild;
    svgElement.setAttribute("style", `width:${String(videoTag.clientWidth / 2)}px; height:${String(videoTag.clientHeight / 2)}px; pointer-events: none;`);
    return divElementFilter;
  }
}
