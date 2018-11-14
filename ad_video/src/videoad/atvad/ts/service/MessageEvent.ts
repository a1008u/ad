import { Jsontype } from '../../../service/jsontype';
import { ImpService } from './ImpService';

export namespace MassageEvent {
  export const register= (videoElement: HTMLVideoElement, atvJson: Jsontype) => {
    window.addEventListener('message', (event) => {
        if (event.data === 'pause') {
          videoElement.setAttribute('playxxx', 'pause');
          videoElement.pause();
        } else {
          if (videoElement.getAttribute('__end') !== undefined && videoElement.getAttribute('__end') === 'true') {
            // 何も処理しない
          } else {
            let playMode: string = videoElement.getAttribute('playxxx');
            if (playMode === 'pause') {
              videoElement.setAttribute('playxxx', 'pause');
              videoElement.pause();
            } else {
              videoElement.setAttribute('playxxx', 'play');
              videoElement.play();
              ImpService.execImp(videoElement, atvJson);
            }
          }
        }
      },  false);
  };
}
