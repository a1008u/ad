import { EventNotViewThrough } from '../EventNotViewThrough';
import { VideoFilterEventFactory } from './VideoFilterEventFactory';
import { EventViewThrough } from '../EventViewThrough';
import { oschecker } from '../../../../service/oschecker';
import { Jsontype } from '../../../../service/class/jsontype';
import { tag } from '../../../../service/tag';
import { MessageEvent } from '../MessageEvent';
import { Preview } from '../Preview/Preview';

export namespace ElementFactory {
  /**
   * viewThrough有りでvideoElementを作成
   * @param mainDivElement
   * @param atvJson
   * @param loop
   */
  export const mkViewThroughVideoElement = (
    mainDivElement: HTMLDivElement,
    atvJson: Jsontype,
  ): HTMLVideoElement => {
    const $videoElement: HTMLVideoElement = tag.mkVideoElement(atvJson);
    mainDivElement.appendChild($videoElement);

    // プレビュー用として返す
    if (atvJson.ATV_MODE !== '') {
      $videoElement.setAttribute('atv_mode', atvJson.ATV_MODE);
      return $videoElement;
    }

    EventViewThrough.setEventLoad($videoElement, atvJson);
    return $videoElement;
  };

  /**
   * AdArea（広告エリア）作成
   * @param atvJson
   * @param mainDivElement
   */
  export const mkAdArea = (
    atvJson: Jsontype,
    mainDivElement: HTMLDivElement,
  ) => {
    const adAreaDiv: string = EventNotViewThrough.mkAdArea(atvJson);
    mainDivElement.insertAdjacentHTML('beforeend', adAreaDiv);
  };

  /**
   * viewThrough無しでvideoElementを作成
   * @param mainDivElement
   * @param atvJson
   * @param loop
   */
  export const mkNotViewThroughVideoElement = (
    mainDivElement: HTMLDivElement,
    atvJson: Jsontype,
  ): HTMLVideoElement => {
    const $videoElement: HTMLVideoElement = tag.mkVideoElement(atvJson);
    $videoElement.removeAttribute('loop');
    mainDivElement.appendChild($videoElement);

    EventNotViewThrough.setEventLoad($videoElement, atvJson);
    mkAdArea(atvJson, mainDivElement);
    return $videoElement;
  };

  /**
   * videoElementの作成
   * @param atvJson
   */
  export const mkElement = (atvJson: Jsontype): void => {
    // 動画広告の枠（横の長さ）を指定
    const $mainDivElement: HTMLDivElement = document.querySelector('#atvMain');
    let height: string = String(
      Number(atvJson.height) + Number(atvJson.ADAREA_HEIGHT),
    );
    $mainDivElement.setAttribute(
      'style',
      `width:${atvJson.width}px; height:${height}px; z-index:30;`,
    );

    // videoの生成
    const videoElement: HTMLVideoElement =
      atvJson.videoad_vt_second !== '0'
        ? mkViewThroughVideoElement($mainDivElement, atvJson)
        : mkNotViewThroughVideoElement($mainDivElement, atvJson);

    // preview用の場合の処理
    if (atvJson.ATV_MODE.includes('preview')) {
      const preview: Preview = new Preview();
      preview.exec(videoElement, atvJson);
    }

    VideoFilterEventFactory.osEvent[oschecker.isolate()](videoElement, atvJson);

    // 動画が表示されているか判定処理
    MessageEvent.register(videoElement, atvJson);
  };
}
