import { Jsontype } from '../../../service/class/jsontype';
import { ImpService } from './ImpService';
import { VideoAction } from './video/videoAction';

export namespace MassageEvent {

  // // pasue処理
  // export const pauseAction = (videoElement: HTMLVideoElement) => {
  //   videoElement.setAttribute('playxxx', 'pause');
  //   videoElement.pause();
  // };

  // // play処理
  // export const playAction = (videoElement: HTMLVideoElement) => {
  //   videoElement.setAttribute('playxxx', 'play');
  //   videoElement.play();
  // };

  export const register = (
    videoElement: HTMLVideoElement,
    atvJson: Jsontype
  ) => {
    window.addEventListener(
      'message',
      event => {
        if (event.data === 'pause') {
          VideoAction.pauseAction(videoElement);
        } else {
          if (
            videoElement.getAttribute('__end') !== undefined &&
            videoElement.getAttribute('__end') === 'true'
          ) {
            // 何も処理しない
          } else {
            let playMode: string = videoElement.getAttribute('playxxx');
            if (playMode === 'pause' || playMode === null) {
              VideoAction.playAction(videoElement);
              ImpService.execImp(videoElement, atvJson);
            } else {
              VideoAction.pauseAction(videoElement);
            }
          }
        }
      },
      false
    );
  };
}
