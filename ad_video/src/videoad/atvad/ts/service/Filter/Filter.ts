import axios from 'axios';
import { VideoAction } from '../video/videoAction';

export class Filter {

  constructor() {
    console.log('Filter')
  }

  /**
   * filterの削除(main)
   * @param videoElement 
   * @param playMode 
   * @param divElementFilter 
   */
  deleteMethod(videoElement, playMode, divElementFilter){
    if (playMode === 'play') {
      VideoAction.playAction(videoElement);
    } else {
      VideoAction.pauseAction(videoElement);
    }
    // this.deleteFilter(videoElement, divElementFilter);
    const mainDivElement: HTMLElement = videoElement.parentElement;
    mainDivElement.removeAttribute('atvMain');
    mainDivElement.removeChild(divElementFilter);
    videoElement.setAttribute('___filter', 'off');
  }

  /**
   * filterの作成（スタイル）
   * @param videoTag
   */
  getFilter(videoTag: HTMLVideoElement): HTMLDivElement {
    const divElementFilter: HTMLDivElement = document.createElement('div');
    divElementFilter.classList.add('__filter');
    divElementFilter.setAttribute(
      'style',
      `width:${String(videoTag.clientWidth)}px; height:${String(
        videoTag.clientHeight
      )}px; padding: ${String(
        videoTag.clientHeight / 4
      )}px; cursor:pointer; z-index:30; box-sizing:border-box;`
    );
    return divElementFilter;
  }

  /**
   * filterの作成（マークの取得）
   * @param playMode
   */
  // tslint:disable-next-line:only-arrow-functions
  async getSvgObjElment(playMode: string) {
    const svgFilePath: string =
      playMode === 'play'
        ? '../../atvad/svg/play-circle-solid.svg'
        : '../../atvad/svg/pause-circle-solid.svg';

    return axios
      .get(svgFilePath)
      .then(resdata => resdata.data)
      .catch(err => err);
  }

  /**
   * filterの作成（svgを生成）
   */
  mkObjElement(
    svgData: any,
    videoTag: HTMLVideoElement,
    playMode: string
  ): HTMLObjectElement {
    const objectElement: HTMLObjectElement = document.createElement('object');
    objectElement.setAttribute('id', '___obj');
    objectElement.innerHTML = svgData;
    objectElement.setAttribute(
      'style',
      `width:${String(videoTag.clientWidth / 2)}px; height:${String(
        videoTag.clientHeight / 2
      )}px; pointer-events: none;`
    );
    objectElement.setAttribute('___text', playMode);
    return objectElement;
  }

  /**
   * filterの作成（main）
   * @param videoTag 
   * @param getFilter 
   * @param playMode 
   */
  async mkFilterElement(
    videoTag: HTMLVideoElement,
    getFilter: (videoTag: HTMLVideoElement) => HTMLDivElement,
    playMode: string
  ) {
    const divElementFilter: HTMLDivElement = getFilter(videoTag);
    const svgData: any = await this.getSvgObjElment(playMode);
    const objectElement: HTMLObjectElement = this.mkObjElement(
      svgData,
      videoTag,
      playMode
    );
    divElementFilter.appendChild(objectElement);
    return divElementFilter;
  }
}
