import { Jsontype } from '../../../../service/class/jsontype';
import { VideoAction } from '../video/videoAction';
import { FilterPlayMode } from './FilterPlayMode';
import { ImpService } from '../ImpService';
import { Observable, fromEvent } from 'rxjs';

export class FilterEvent {
  /**
   * main処理
   * @param ev
   * @param atvJson
   */
  async prepareFilter($videoElement: HTMLVideoElement, atvJson: Jsontype) {
    await this.videoStateChange($videoElement);
    await this.showFilter($videoElement, atvJson);
    ImpService.execImp($videoElement, atvJson);
  }

  /**
   * 動画起動処理
   * @param $videoElement
   */
  async videoStateChange($videoElement: HTMLVideoElement) {
    const playMode: string = $videoElement.getAttribute('playxxx');
    if (playMode === 'pause') {
      VideoAction.playAction($videoElement);
    } else if (playMode === 'play') {
      VideoAction.pauseAction($videoElement);
    } else {
      // 初回稼働
      VideoAction.playAction($videoElement);
      $videoElement.removeAttribute('videoStart');
    }
  }

  /**
   * filter処理
   * @param $videoElement
   * @param playMode
   */
  async showFilter($videoElement: HTMLVideoElement, atvJson: Jsontype) {
    // filter生成
    const playMode: string = $videoElement.getAttribute('playxxx');
    const filterPlayMode: FilterPlayMode = new FilterPlayMode();
    const $divElementFilter: HTMLDivElement = await filterPlayMode.execFil(
      $videoElement,
      atvJson,
      playMode,
    );
    const mainDivElement: HTMLElement = $videoElement.parentElement;
    mainDivElement.appendChild($divElementFilter);

    // animationendイベントを生成
    const divFilter$: Observable<any> = fromEvent(
      $divElementFilter,
      'animationend',
    );
    divFilter$.subscribe(ev => {
      filterPlayMode.deleteMethod($videoElement, playMode, ev.target);
    });
  }
}
