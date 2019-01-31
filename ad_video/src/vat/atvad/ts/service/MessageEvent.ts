import { Jsontype } from '../../../service/class/jsontype';
import { ImpService } from './ImpService';
import { VideoAction } from './video/videoAction';

export namespace MessageEvent {
  /**
   * 以下3つの処理のどれかを行う
   *  1.messageイベントの値が「pause」 -> 動画停止
   *  2.動画が終了していないかつ現在動画停止 -> 動画再生
   *  3.動画が終了していないかつ現在動画再生 -> 動画停止
   * @param eventStatus
   * @param videoElement
   * @param atvJson
   */
  export const ckAndExeAction = (
    eventStatus: string,
    videoElement: HTMLVideoElement,
    atvJson: Jsontype,
  ) => {
    if (eventStatus === 'pause') {
      VideoAction.pauseAction(videoElement);
    } else {
      if (
        !(
          videoElement.getAttribute('__end') !== undefined &&
          videoElement.getAttribute('__end') === 'true'
        )
      ) {
        const playMode: string = videoElement.getAttribute('playxxx');
        if (playMode === 'pause' || playMode === null) {
          VideoAction.playAction(videoElement);
          ImpService.execImp(videoElement, atvJson);
        } else {
          VideoAction.pauseAction(videoElement);
        }
      }
    }
  };

  /**
   * messageを利用して、iframeへイベントを伝える
   * ※iframeへイベントを伝えるためにmessageを利用。
   * @param videoElement
   * @param atvJson
   */
  export const register = (
    videoElement: HTMLVideoElement,
    atvJson: Jsontype,
  ) => {
    window.addEventListener(
      'message',
      event => ckAndExeAction(event.data, videoElement, atvJson),
      false,
    );
  };
}
