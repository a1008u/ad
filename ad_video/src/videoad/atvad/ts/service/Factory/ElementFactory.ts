import { EventNotViewThrough } from '../EventNotViewThrough';
import { VideoFilterEventFactory } from './VideoFilterEventFactory';
import { EventViewThrough } from '../EventViewThrough';
import { oschecker } from '../../../../service/oschecker';
import { Jsontype } from '../../../../service/class/jsontype';
import { tag } from '../../../../service/tag';
import { MessageEvent } from '../MessageEvent';

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
    loop: string
  ): HTMLVideoElement => {
    const $videoElement: HTMLVideoElement = tag.mkVideoElement(atvJson, loop);
    mainDivElement.appendChild($videoElement);

    if (atvJson.ATV_MODE !== '') {
      // プレビュー用として返す
      $videoElement.setAttribute('atv_mode', atvJson.ATV_MODE);
      return $videoElement;
    }

    EventViewThrough.setEventLoad($videoElement, atvJson);
    return $videoElement;
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
    loop: string
  ): HTMLVideoElement => {
    const $videoElement: HTMLVideoElement = tag.mkVideoElement(atvJson, loop);
    $videoElement.removeAttribute('loop');
    mainDivElement.appendChild($videoElement);
    EventNotViewThrough.setEventLoad($videoElement);

    mkAdArea(atvJson, mainDivElement);
    return $videoElement;
  };

  /**
   * AdArea（広告エリア）作成
   * @param atvJson 
   * @param mainDivElement 
   */
  export const mkAdArea = (atvJson: Jsontype, mainDivElement: HTMLDivElement) => {
    const adAreaDiv: string = EventNotViewThrough.mkAdArea(atvJson);
    mainDivElement.insertAdjacentHTML('beforeend', adAreaDiv);
  };

  /**
   * videoElementの作成
   * @param atvJson
   */
  export const mkElement = (atvJson: Jsontype): void => {
    // 動画広告の枠（横の長さ）を指定
    const $mainDivElement: HTMLDivElement = document.querySelector('#atvMain');
    $mainDivElement.setAttribute('style',`width:${atvJson.width}px; z-index:30;`);

    const videoElement: HTMLVideoElement =
      atvJson.videoad_vt_second !== '0'
        ? mkViewThroughVideoElement($mainDivElement, atvJson, 'true')
        : mkNotViewThroughVideoElement($mainDivElement, atvJson, 'false');
    VideoFilterEventFactory.osEvent[oschecker.isolate()](videoElement, atvJson);

    // 動画が表示されているか判定処理
    MessageEvent.register(videoElement, atvJson);
  };
}
