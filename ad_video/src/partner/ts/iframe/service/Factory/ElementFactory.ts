import { osFontSize } from '../OsFontSize';
import { EventNotViewThrough } from '../EventNotViewThrough';
import { ViewThroughFactory } from './ViewThroughFactory';
import { EventViewThrough } from '../EventViewThrough';
import { oschecker } from '../../../../../service/oschecker';
import { Jsontype } from '../../../../../service/jsontype';
import { tag } from '../../../../../service/tag';


// export namespace ElementFactory {
//   // AdAreaの作成
//   const mkAdArea = (atvJson: Jsontype, $scriptElement: HTMLScriptElement): string => {
//     // let [leftSize, rightSize]: [string, string] = osFontSize.getSize[oschecker.isolate()]();
//     // const hrefValue: string = ($scriptElement.getAttribute('atv-mode')) ? '#!' : atvJson.HREF_URL;

//     let leftSize: string;
//     let rightSize: string;
//     let hrefValue: string;
//     if ($scriptElement.getAttribute('atv-mode') === 'pc') {
//       [leftSize, rightSize] = ['28px', '24px'];
//       hrefValue = '#!';
//     } else if ($scriptElement.getAttribute('atv-mode') === 'sp') {
//       [leftSize, rightSize] = ['16px', '12px'];
//       hrefValue = '#!';
//     } else {
//       [leftSize, rightSize] = osFontSize.getSize[oschecker.isolate()]();
//       hrefValue = atvJson.HREF_URL;
//     }

//     return `<div class="__divTextElement">
//               <div class="__divTextLeftElement" style="font-size:${leftSize}">${atvJson.BANNER_TEXT}</div>
//               <div class="__divTextRightElement">
//                 <a href="${hrefValue}/">
//                   <span class="__atv_button" ontouchstart="" style="font-size:${rightSize}">${atvJson.VIDEOAD_BTN_TEXT}</>
//                 </a>
//               </div>
//             </div>`;
//   };

//   const mkViewThroughVideoElement = (atvJson: Jsontype
//     , rk: string
//     , mainDivElement: HTMLDivElement, $scriptElement: HTMLScriptElement) => {
//     let $videoElement: HTMLVideoElement = tag.mkVideoTag(atvJson, rk, true);
//     mainDivElement.appendChild($videoElement);
//     EventViewThrough.setEventLoad($videoElement, Number(atvJson.VIDEOAD_VT_SECOND) * 1000, $scriptElement);
//     return $videoElement;
//   };

//   const mkNormalVideoElement = (atvJson: Jsontype
//     , rk: string
//     , mainDivElement: HTMLDivElement
//     , mkAdArea: (atvJson: Jsontype, $scriptElement: HTMLScriptElement) => string, $scriptElement: HTMLScriptElement) => {
//     let $videoElement: HTMLVideoElement = tag.mkVideoTag(atvJson, rk, false);
//     mainDivElement.appendChild($videoElement);
//     EventNotViewThrough.setEventLoad($videoElement);
//     mainDivElement.classList.add('__mainDivShadow');

//     // 広告エリアを作成
//     const adAreaDiv: string = mkAdArea(atvJson, $scriptElement);
//     mainDivElement.insertAdjacentHTML('beforeend', adAreaDiv);
//     mainDivElement.setAttribute('id', '___videostop');
//     return $videoElement;
//   };

//   /**
//    * viewthrough有りか無しかで処理を分け、videoタグを生成
//    * @param atvJson
//    * @param rk
//    * @param mainDivElement
//    */
//   const mkVideoElement = (atvJson: Jsontype, rk: string, mainDivElement: HTMLDivElement, $scriptElement: HTMLScriptElement) => {
//     if (atvJson.VIDEOAD_VT_SECOND !== '0') {
//       return mkViewThroughVideoElement(atvJson, rk, mainDivElement, $scriptElement);
//     } else {
//       return mkNormalVideoElement(atvJson, rk, mainDivElement, mkAdArea, $scriptElement);
//     }
//   };

//   /**
//    * 
//    * @param rk 
//    * @param atvJson 
//    * @param script 
//    */
//   export const mkElement = (rk: string, atvJson: Jsontype, $scriptElement: HTMLScriptElement): void => {
//     const $mainDivElement: HTMLDivElement = document.createElement('div');
//     // 動画広告の枠（横の長さ）を指定
//     $mainDivElement.setAttribute("style", `width:${atvJson.WIDTH}px; z-index:30;`);

//     // viewthrough有り無しで処理を分けたvideoタグを作成
//     // メイン処理(タグ設定 + スクリプトのrk削除 + 表示画像の起動)
//     let videoElement: HTMLVideoElement = mkVideoElement(atvJson, rk, $mainDivElement, $scriptElement);
//     ViewThroughFactory.osEvent[oschecker.isolate()](videoElement);

//     $scriptElement.parentNode.insertBefore($mainDivElement, $scriptElement);
//   };
// }

//

export namespace ElementFactory {
  // AdAreaの作成
  const mkAdArea = (atvJson: Jsontype): string => {
    let leftSize: string;
    let rightSize: string;
    let hrefValue: string;
    if (atvJson.ATV_MODE === 'pc') {
      [leftSize, rightSize] = ['28px', '24px'];
      hrefValue = '#!';
    } else if (atvJson.ATV_MODE === 'sp') {
      [leftSize, rightSize] = ['16px', '12px'];
      hrefValue = '#!';
    } else {
      [leftSize, rightSize] = osFontSize.getSize[oschecker.isolate()]();
      hrefValue = atvJson.HREF_URL;
    }

    return `<div class="__divTextElement" style="height:${atvJson.ADAREA_HEIGHT}px">
              <div class="__divTextLeftElement" style="font-size:${leftSize}">
                <span class="__atv_text">${atvJson.BANNER_TEXT}</span>
              </div>
              <div class="__divTextRightElement">
                <a class="__atv_text" href="${hrefValue}/">
                  <span class="__atv_button" ontouchstart="" style="font-size:${rightSize}">${atvJson.VIDEOAD_BTN_TEXT}</>
                </a>
              </div>
            </div>`;
  };

  const mkViewThroughVideoElement = (mainDivElement: HTMLDivElement, atvJson: Jsontype, loop: string) :HTMLVideoElement => {

    const $videoElement: HTMLVideoElement = tag.mkVideoElement(atvJson, loop);
    mainDivElement.appendChild($videoElement);
    // EventViewThrough.setEventLoad($videoElement, Number(atvJson.VIDEOAD_VT_SECOND) * 1000, $scriptElement);
    return $videoElement;
  };

  const mkNormalVideoElement = (mainDivElement: HTMLDivElement, atvJson: Jsontype, loop: string) :HTMLVideoElement => {

    const $videoElement: HTMLVideoElement = tag.mkVideoElement(atvJson, loop);
    mainDivElement.appendChild($videoElement);
    EventNotViewThrough.setEventLoad($videoElement);
    mainDivElement.classList.add('__mainDivShadow');

    // 広告エリアを作成
    const adAreaDiv: string = mkAdArea(atvJson);
    mainDivElement.insertAdjacentHTML('beforeend', adAreaDiv);
    // mainDivElement.setAttribute('id', '___videostop');
    return $videoElement;
  };

  /**
   * viewthrough有りか無しかで処理を分け、videoタグを生成
   * @param atvJson
   * @param rk
   * @param mainDivElement
   */
  const mkVideoElement = (mainDivElement: HTMLDivElement, atvJson: Jsontype): HTMLVideoElement => {
    if (atvJson.VIDEOAD_VT_SECOND !== '0') {
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
    $mainDivElement.setAttribute("style", `width:${atvJson.WIDTH}px; z-index:30;`);

    let videoElement: HTMLVideoElement = mkVideoElement($mainDivElement, atvJson);
    ViewThroughFactory.osEvent[oschecker.isolate()](videoElement);

    window.addEventListener('message', (event) => {
      console.log("kidou-----")

      if (event.data === 'pause') {
        videoElement.pause();
      } else {
        if(videoElement.getAttribute('__end') !== undefined && videoElement.getAttribute('__end') === 'true') {
          // 何も処理しない
        } else {
          let playMode: string = videoElement.getAttribute('playxxx');
          if (playMode === 'pause') {
            videoElement.pause();
          } else {
            videoElement.play();
          }
        }
      }
    }, false);
  };
}
