import { tag } from '../../../service/tag';
import { Jsontype } from '../../../service/class/jsontype';

export namespace EventViewThrough {
  /**
   *
   * @param cntEvt
   * @param atvJson
   * @param videoTag
   */
  export const viewThroughAction = (
    cntEvt: any,
    atvJson: Jsontype,
    videoTag: HTMLElement,
  ) => {
    console.log('atvJson.entryIframe_url --- ' + atvJson.entryframe_url);
    window.clearInterval(cntEvt);
    // クリックのやつ
    const url: string = `${atvJson.entryframe_url}?url=${encodeURIComponent(
      atvJson.href_url,
    )}`;
    let iframeTag: HTMLIFrameElement = tag.mkIframeElementForTracking(
      url,
      '0',
      '0',
      'none',
    );
    videoTag.parentNode.insertBefore(iframeTag, videoTag);

    // 使用決定用に一旦表示（実際は削除します） -----------------------------------------
    const divElement: HTMLDivElement = document.createElement('div');
    divElement.textContent = 'viewthroughをしました';
    videoTag.parentNode.parentNode.insertBefore(
      divElement,
      videoTag.parentElement,
    );
    // ----------------------------------------------------------------------------
  };

  /**
   * viewthrough用の処理
   *  動画を見たら、250msごとにカウントを上げ、viewthroughの設定時刻を超えたらviewthroughの処理を起動する。
   * @param videoTag
   * @param atvJson
   */
  export const setEventLoad = (videoTag: HTMLElement, atvJson: Jsontype) => {
    let count = 0;
    let countEvt;
    let limitTime: number = Number(atvJson.videoad_vt_second) * 1000;
    videoTag.addEventListener('play', () => {
      if (count < limitTime) {
        countEvt = window.setInterval(() => {
          count += 250;
          if (count > limitTime) {
            viewThroughAction(countEvt, atvJson, videoTag);
          }
        }, 250);
      }
    });

    // 要検討：viewthrough(pauseの場合は、繰り返し動作を止める)
    videoTag.addEventListener('pause', () => {
      if (countEvt) {
        window.clearInterval(countEvt);
      }
    });
  };
}
