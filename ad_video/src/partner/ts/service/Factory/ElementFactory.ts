import { osFontSize } from '../OsFontSize';
import { Jsontype } from "../../../../service/jsontype";
import { oschecker } from "../../../../service/oschecker";
import { EventNotViewThrough } from "../EventNotViewThrough";
import { EventViewThrough } from "../EventViewThrough";
import { tag } from "../../../../service/tag";
import { ViewThroughFactory } from "./ViewThroughFactory";

export namespace ElementFactory {

  // textareaの作成
  const mkTextArea = (atvJson: Jsontype, $scriptElement: HTMLScriptElement): string => {
    let [leftSize, rightSize]: [string, string] = osFontSize.getSize[oschecker.isolate()]();
    const hrefValue: string = ($scriptElement.getAttribute('atv-mode')) ? '#!' : atvJson.HREF_URL;
    return `<div class="__divTextElement">
              <div class="__divTextLeftElement" style="font-size:${leftSize}">${atvJson.BANNER_TEXT}</div>
                <div class="__divTextRightElement">
                <a href="${hrefValue}/">
                  <span class="__atv_button" ontouchstart="" style="font-size:${rightSize}">${atvJson.VIDEOAD_BTN_TEXT}</>
                </a>
              </div>
            </div>`;
  };

  /**
   * viewthrough有りか無しかで処理を分け、videoタグを生成
   * @param atvJson
   * @param rk
   * @param mainDivElement
   */
  const mkVideoElement = (atvJson: Jsontype, rk: string, mainDivElement: HTMLDivElement, $scriptElement: HTMLScriptElement) => {
    if (atvJson.VIDEOAD_VT_SECOND !== '0') {
      let $videoElement: HTMLVideoElement = tag.mkVideoTag(atvJson, rk, true);
      mainDivElement.appendChild($videoElement);
      EventViewThrough.setEventLoad($videoElement, Number(atvJson.VIDEOAD_VT_SECOND) * 1000, $scriptElement);
      return $videoElement;
    } else {
      let $videoElement: HTMLVideoElement = tag.mkVideoTag(atvJson, rk, false);
      mainDivElement.appendChild($videoElement);
      EventNotViewThrough.setEventLoad($videoElement);
      mainDivElement.classList.add('__mainDivShadow');

      const divTextArea: string = mkTextArea(atvJson, $scriptElement);
      mainDivElement.insertAdjacentHTML('beforeend', divTextArea);
      mainDivElement.setAttribute('id', '___videostop');
      return $videoElement;
    }
  };

  /**
   * 
   * @param rk 
   * @param atvJson 
   * @param script 
   */
  export const mkElement = (rk: string, atvJson: Jsontype, $scriptElement: HTMLScriptElement): void => {
    const $mainDivElement: HTMLDivElement = document.createElement('div');
    $mainDivElement.setAttribute("style", `width:${atvJson.WIDTH}px; z-index:30;`);

    // viewthrough有り無しで処理を分けたvideoタグを作成
    let videoElement: HTMLVideoElement = mkVideoElement(atvJson, rk, $mainDivElement, $scriptElement);

    // メイン処理(タグ設定 + スクリプトのrk削除 + 表示画像の起動)
    ViewThroughFactory.osEvent[oschecker.isolate()](videoElement);

    $scriptElement.parentNode.insertBefore($mainDivElement, $scriptElement);
  };
}
