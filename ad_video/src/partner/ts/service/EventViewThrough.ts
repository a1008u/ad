import { tag } from '../../../service/tag';
import { AnyRecordWithTtl } from 'dns';

export namespace EventViewThrough {

    let deleteMethod = (videoTag, playMode, divElement_fil) => {
      console.log('クリックを検知');
      if (playMode === 'pause') {
        videoTag.play();
        videoTag.setAttribute('playxxx', 'play');
      } else {
        videoTag.pause();
        videoTag.setAttribute('playxxx', 'pause');
      }

      videoTag.removeAttribute('___videostop');
      videoTag.setAttribute('___filter', 'off');
      videoTag.parentElement.removeAttribute('__aparent');
      videoTag.parentElement.removeChild(divElement_fil);
    };

    let cleanUp = (videoTag, divElement_fil) => {
      console.log('del');
      videoTag.removeAttribute('___videostop');
      videoTag.parentElement.removeAttribute('__aparent');
      videoTag.parentElement.removeChild(divElement_fil);
    };

    let exec = (videoTag, playMode, divElement_fil: HTMLDivElement) =>  {
      videoTag.classList.add('___videostop');
      videoTag.parentElement.classList.add('__aparent');
      divElement_fil.classList.add('__filter');
      divElement_fil.setAttribute("style", `width:${String(videoTag.clientWidth)}px; height:${String(videoTag.clientHeight)}px; padding: 12%; cursor:pointer`);
      const imgElement_play: HTMLObjectElement = document.createElement('object');
      imgElement_play.setAttribute('id', '___obj');

      if (playMode === 'pause') {
        // imgElement_play.textContent = '再生';
        imgElement_play.setAttribute('type', 'image/svg+xml');
        imgElement_play.setAttribute('data', '../svg/play-circle-solid.svg');
        imgElement_play.setAttribute("style", `width:${String(videoTag.clientWidth / 2)}px; height:${String(videoTag.clientHeight / 2)}px; pointer-events: none;`);
        imgElement_play.setAttribute('___text', 'play');
      } else {
        // imgElement_play.textContent = '停止';
        imgElement_play.setAttribute('type', 'image/svg+xml');
        imgElement_play.setAttribute('data', '../svg/pause-circle-solid.svg');
        imgElement_play.setAttribute("style", `width:${String(videoTag.clientWidth / 2)}px; height:${String(videoTag.clientHeight / 2)}px; pointer-events: none;`);
        imgElement_play.setAttribute('___text', 'pause');
      }

      divElement_fil.appendChild(imgElement_play);
      videoTag.parentElement.appendChild(divElement_fil);
    };

    /**
     * PCブラウザ用のイベントリスナー
     */
    export const setEventViewThroughPC = (videoTag) => {
      videoTag.addEventListener('mouseover', () => {
        let fillter_off: string = videoTag.getAttribute('___filter');
        if (fillter_off === 'off') {
          videoTag.removeAttribute('___filter');
        } else {

          const divElement_fil: HTMLDivElement = document.createElement('div');
          let playMode: string = videoTag.getAttribute('playxxx');

          exec(videoTag, playMode, divElement_fil);
          setTimeout(cleanUp(videoTag, divElement_fil), 1000);

          divElement_fil.addEventListener('click', () => {
              deleteMethod(videoTag, playMode, divElement_fil);
          });
        }
      });
    };


    /**
     * スマホブラウザ用
     */
    export const setEventViewThroughSmartPhone = (videoTag) => {

      videoTag.addEventListener('touchstart', () => {
        let fillter_off: string = videoTag.getAttribute('___filter');
        if (fillter_off === 'off') {
            videoTag.removeAttribute('___filter');
        } else {

          const divElement_fil: HTMLDivElement = document.createElement('div');
          let playMode: string = videoTag.getAttribute('playxxx');

          exec(videoTag, playMode,divElement_fil);
          setTimeout(cleanUp(videoTag, divElement_fil), 1000);

          divElement_fil.addEventListener('touchstart', () => {
            deleteMethod(videoTag, playMode, divElement_fil);
          });

          // スマホの傾き検知用
          window.addEventListener('orientationchange', () => {
            if (divElement_fil) {
              videoTag.removeAttribute('___videostop');
              videoTag.setAttribute('___filter','off');
              videoTag.parentElement.removeAttribute('__aparent');
              videoTag.parentElement.removeChild(divElement_fil);
            }

            if (playMode === 'pause') {
              videoTag.play();
              videoTag.setAttribute('playxxx','play');
              videoTag.removeAttribute('___videostop');
            }
          });
        }
      });
    };
}
