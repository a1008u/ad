import { Jsontype } from '../../../service/class/jsontype';
import { ImpService } from './ImpService';
import { VideoAction } from './video/videoAction';

export namespace MessageEvent {
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
