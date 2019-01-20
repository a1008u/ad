import { Jsontype } from '../../../../service/class/jsontype';
import { Observable, fromEvent } from 'rxjs';
import { VideoAction } from '../video/videoAction';
import { FilterStartAndEnd } from '../Filter/FilterStartAndEnd';

export class Preview {
  async exec($videoElement: HTMLVideoElement, atvJson: Jsontype) {
    // playMarkを表示
    const filterStart: FilterStartAndEnd = new FilterStartAndEnd();
    // filterStart
    //   .execFilnotAnimation($videoElement, atvJson, 'play')
    //   .then(divElementFilter => {
    //     // 動画再生終了フィルターの表示
    //     this.Filter($videoElement, divElementFilter);

    //     // 動画停止後、再生ボタンをクリックしたタイミングで再生を行う
    //     console.log('click を登録するよ', divElementFilter)
    //     divElementFilter.addEventListener('click', ev => {
    //       console.log('click 動いてるよ')
    //       this.deleteFilter(ev, $videoElement)
    //     });

    //     // const filter$: Observable<any> = fromEvent(divElementFilter, 'click');
    //     // filter$.subscribe(ev => this.deleteFilter(ev, $videoElement));
    //   });

    const divElementFilter: HTMLDivElement = await filterStart.execFilnotAnimation($videoElement, atvJson, 'play')
    // 動画再生時のフィルターの表示
    this.Filter($videoElement, divElementFilter);

    // 動画再生後、再生ボタンをクリックしたタイミングで再生を行う
    const filter$: Observable<any> = fromEvent(divElementFilter, 'click');
    filter$.subscribe(ev => this.deleteFilter(ev, $videoElement));
  }

  private deleteFilter(ev: any, $videoElement: HTMLVideoElement) {
    let targeFilterElement: HTMLElement = ev.target;
    targeFilterElement.parentElement.removeChild(targeFilterElement);
    VideoAction.playAction($videoElement);
  }

  private Filter(
    $videoElement: HTMLVideoElement,
    $divElementFilter: HTMLDivElement,
  ) {
    const mainDivElement: HTMLElement = $videoElement.parentElement;
    mainDivElement.classList.add('__aparent');
    mainDivElement.appendChild($divElementFilter);
  }
}
