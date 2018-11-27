import { Filter } from './Filter';

export class FilterPlayMode extends Filter {

  constructor() {
    super();
    console.log('FilterPlayMode')
  }

  /**
   * 動画再生時用フィルター生成
   * @param videoTag
   * @param playMode
   */
  async execFil(videoTag: HTMLVideoElement, playMode: string) {
    const divElementFilter: HTMLDivElement = await this.mkFilterElement(
      videoTag,
      this.getFilter,
      playMode
    );

    // アニメーション効果用のクラス属性を付与
    divElementFilter.classList.add('___ani');

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
