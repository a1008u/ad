import { Jsontype } from "../../../../service/class/jsontype";
import { VideoAction } from "../video/videoAction";
import { FilterPlayMode } from "./FilterPlayMode";
import { ImpService } from "../ImpService";
import { Observable, fromEvent } from 'rxjs';
// import * as Rx from 'rxjs';

export class FilterEvent {

  constructor() {
    console.log('FilterEvent');
  }

  /**
   * main処理
   * @param ev
   */
  async prepareFilter(ev: any, atvJson: Jsontype) {
    const $videoElement: HTMLVideoElement = ev.target;
    await this.videoStateChange($videoElement);
    await this.showFilter($videoElement);
    ImpService.execImp($videoElement, atvJson);
  };

  /**
   * 動画起動処理
   * @param $videoElement
   */
  async videoStateChange($videoElement: HTMLVideoElement) {
    let playMode: string = $videoElement.getAttribute('playxxx');
    if (playMode === 'pause') {
      await VideoAction.playAction($videoElement);
    } else if (playMode === 'play') {
      VideoAction.pauseAction($videoElement);
    } else {
      // 初回稼働
      await VideoAction.playAction($videoElement);
      $videoElement.removeAttribute('videoStart');
    }
  };

  /**
   * filter処理
   * @param $videoElement
   * @param playMode
   */
  async showFilter($videoElement: HTMLVideoElement) {
    let playMode: string = $videoElement.getAttribute('playxxx');
    const filterPlayMode: FilterPlayMode = new FilterPlayMode();
    const $divElementFilter: HTMLDivElement = await filterPlayMode.execFil(
      $videoElement,
      playMode
    );
    const mainDivElement: HTMLElement = $videoElement.parentElement;
    mainDivElement.appendChild($divElementFilter);

    const divFilter$: Observable<any> = fromEvent(
      $divElementFilter,
      'animationend'
    );
    divFilter$.subscribe(ev => {
      filterPlayMode.deleteMethod($videoElement, playMode, ev.target);
    });
  }
}
