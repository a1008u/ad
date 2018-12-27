import { Filter } from './Filter';
import { Jsontype } from '../../../../service/class/jsontype';

export class FilterPlayMode extends Filter {
  /**
   * 動画再生時用フィルター生成
   * @param videoElement
   * @param playMode
   */
  async execFil(
    videoElement: HTMLVideoElement,
    atvJson: Jsontype,
    playMode: string,
  ) {
    const divElementFilter: HTMLDivElement = await this.mkFilterElement(
      videoElement,
      this.getFilter,
      playMode,
      atvJson,
    );

    // アニメーション効果用のクラス属性を付与
    divElementFilter.classList.add('___ani');

    const svgElement = divElementFilter.firstElementChild.firstElementChild;
    svgElement.setAttribute(
      'style',
      `width:${String(Number(atvJson.width) / 2)}px; height:${String(
        Number(atvJson.height) / 2,
      )}px; pointer-events: none;`,
    );
    return divElementFilter;
  }
}
