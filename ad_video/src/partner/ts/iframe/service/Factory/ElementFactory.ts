import { EventNotViewThrough } from '../EventNotViewThrough';
import { VideoFilterEventFactory } from './VideoFilterEventFactory';
import { EventViewThrough } from '../EventViewThrough';
import { oschecker } from '../../../../../service/oschecker';
import { Jsontype } from '../../../../../service/jsontype';
import { tag } from '../../../../../service/tag';
import { MassageEvent } from '../MessageEvent';

export namespace ElementFactory {

  /**
   * viewThrough有りでvideoElementを作成
   * @param mainDivElement 
   * @param atvJson 
   * @param loop 
   */
  const mkViewThroughVideoElement = (mainDivElement: HTMLDivElement, atvJson: Jsontype, loop: string) :HTMLVideoElement => {
    const $videoElement: HTMLVideoElement = tag.mkVideoElement(atvJson, loop);
    mainDivElement.appendChild($videoElement);

    console.log(atvJson.ATV_MODE);
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
  const mkNormalVideoElement = (mainDivElement: HTMLDivElement, atvJson: Jsontype, loop: string) :HTMLVideoElement => {

    const $videoElement: HTMLVideoElement = tag.mkVideoElement(atvJson, loop);
    $videoElement.removeAttribute('loop');
    mainDivElement.appendChild($videoElement);
    EventNotViewThrough.setEventLoad($videoElement);
    mainDivElement.classList.add('__mainDivShadow');

    // 広告エリアを作成
    const adAreaDiv: string = EventNotViewThrough.mkAdArea(atvJson);
    mainDivElement.insertAdjacentHTML('beforeend', adAreaDiv);
    return $videoElement;
  };

  /**
   * viewthrough有りか無しかで処理を分け、videoタグを生成
   * @param atvJson
   * @param rk
   * @param mainDivElement
   */
  const mkVideoElement = (mainDivElement: HTMLDivElement, atvJson: Jsontype): HTMLVideoElement => {
    if (atvJson.videoad_vt_second !== '0') {
      return mkViewThroughVideoElement(mainDivElement, atvJson, 'true');
    } else {
      return mkNormalVideoElement(mainDivElement, atvJson, 'false');
    }
  };

  /**
   * 
   * @param atvJson
   */
  export const mkElement = (atvJson: Jsontype): void => {
    // 動画広告の枠（横の長さ）を指定
    const $mainDivElement: HTMLDivElement = document.querySelector('#atvMain');
    $mainDivElement.setAttribute("style", `width:${atvJson.width}px; z-index:30;`);

    let videoElement: HTMLVideoElement = mkVideoElement($mainDivElement, atvJson);
    VideoFilterEventFactory.osEvent[oschecker.isolate()](videoElement);

    // 動画が表示されているか判定処理
    MassageEvent.register(videoElement, atvJson);
  };
}
