import axios from 'axios';
import { Filter } from './Filter';

export class FilterEnd extends Filter {

  constructor() {
    super();
    console.log('FilterEnd')
  }

  /**
   * 動画再生終了用フィルター生成(非ビュースルーで利用します)
   * @param videoTag
   * @param playMode
   */
  async execFilnotAnimation(videoTag: HTMLVideoElement, playMode: string) {
    const divElementFilter: HTMLDivElement = await this.mkFilterElement(
      videoTag,
      this.getFilter,
      playMode
    );

    const svgElement = divElementFilter.firstElementChild.firstElementChild;
    svgElement.setAttribute(
      'style',
      `width:${String(videoTag.clientWidth / 2)}px; height:${String(
        videoTag.clientHeight / 2
      )}px; pointer-events: none;`
    );
    return divElementFilter;
  }
}
