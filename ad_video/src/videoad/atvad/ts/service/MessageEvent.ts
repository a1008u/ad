import { Jsontype } from '../../../service/jsontype';
import axios from 'axios';

export namespace MassageEvent {
  export const register= (videoElement: HTMLVideoElement, atvJson: Jsontype) => {
    window.addEventListener('message', (event) => {
      if (event.data === 'pause') {
        videoElement.pause();
      } else {
        if (videoElement.getAttribute('__end') !== undefined && videoElement.getAttribute('__end') === 'true') {
          // 何も処理しない
        } else {
          let playMode: string = videoElement.getAttribute('playxxx');
          if (playMode === 'pause') {
            videoElement.pause();
          } else {
            videoElement.play();
            let imp: string = videoElement.getAttribute('imp');
            let atvMode: string = videoElement.getAttribute('atv_mode');
            if (!imp && !atvMode) {
              videoElement.setAttribute('imp', 'done');
              console.table('imp用 ' + atvJson);
              axios
                .get(atvJson.impression_url)
                .then(resdata => resdata.data)
                .catch(err => console.log(err));
            }
          }
        }
      }
    }, false);
  }
}
