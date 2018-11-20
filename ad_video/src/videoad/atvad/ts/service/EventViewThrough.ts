import * as Rx from 'rxjs';
import { Filter } from './Filter/old/Filter';
import { tag } from '../../../service/tag';
import { Jsontype } from '../../../service/class/jsontype';
import { ImpService } from './ImpService';
import { FilterPlayMode } from './Filter/FilterPlayMode';
import { VideoAction } from './video/videoAction';

export namespace EventViewThrough {

  /**
   *
   * @param videoTag
   * @param atvJson
   */
  export const setEventLoad = (videoTag: HTMLElement, atvJson: Jsontype) => {
    let count = 0;
    let cntEvt;
    let limitTime: number = Number(atvJson.videoad_vt_second) * 1000;
    videoTag.addEventListener('play', () => {
      if (count < limitTime) {
        cntEvt = window.setInterval(() => {
          count += 250;
          if (count > limitTime) {
            window.clearInterval(cntEvt);
            // クリックのやつ
            const url: string = `${
              atvJson.entryframe_url
            }?url=${encodeURIComponent(atvJson.href_url)}`;
            let iframeTag: HTMLIFrameElement = tag.mkIframeElementForTracking(
              url,
              '0',
              '0',
              'none'
            );
            videoTag.parentNode.insertBefore(iframeTag, videoTag);

            // 使用決定用に一旦表示（実際は削除します） -----------------------------------------
            const divElement: HTMLDivElement = document.createElement('div');
            divElement.textContent = 'viewthroughをしました';
            videoTag.parentNode.parentNode.insertBefore(
              divElement,
              videoTag.parentElement
            );
            // ----------------------------------------------------------------------------
          }
        }, 250);
      }
    });

    // 要検討：viewthrough(pauseの場合は、繰り返し動作を止める)
    videoTag.addEventListener('pause', () => {
      if (cntEvt) {
        window.clearInterval(cntEvt);
      }
    });
  };
}
