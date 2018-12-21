import { Filter } from './Filter';
import { Jsontype } from '../../../../service/class/jsontype';

export class FilterStartAndEnd extends Filter {
  constructor() {
    super();
  }

  /**
   * 動画再生終了用フィルター生成(非ビュースルーで利用します)
   * @param videoTag
   * @param playMode
   */
  async execFilnotAnimation(
    videoTag: HTMLVideoElement,
    atvJson: Jsontype,
    playMode: string,
  ) {
    const divElementFilter: HTMLDivElement = await this.mkFilterElement(
      videoTag,
      this.getFilter,
      playMode,
      atvJson,
    );

    const svgElement: Element =
      divElementFilter.firstElementChild.firstElementChild;
    svgElement.setAttribute(
      'style',
      `width:${String(Number(atvJson.width) / 2)}px; height:${String(
        Number(atvJson.height) / 2,
      )}px; pointer-events: none;`,
    );
    return divElementFilter;
  }
}
