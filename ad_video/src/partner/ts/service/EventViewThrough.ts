import { tag } from '../../../service/tag';
import { AnyRecordWithTtl } from 'dns';

export namespace EventViewThrough {
    /**
     * PCブラウザ用のイベントリスナー
     */
    videoTag.addEventListener('mouseover', () => {

      let fillter_off: string = videoTag.getAttribute('___filter');
      if (fillter_off === 'off') {
        videoTag.removeAttribute('___filter');
      } else {

        videoTag.classList.add('___videostop');
        videoTag.parentElement.classList.add('__aparent');
        const divElement_fil: HTMLDivElement = document.createElement('div');
        divElement_fil.classList.add('__filter');
        divElement_fil.setAttribute("style", `width:${String(videoTag.clientWidth)}px; height:${String(videoTag.clientHeight)}px; padding: 12%; cursor:pointer`);

        const imgElement_play: HTMLObjectElement = document.createElement('object');
        imgElement_play.setAttribute('id', '___obj');
        let playMode: string = videoTag.getAttribute('playxxx');
        if (playMode === 'pause') {
          // imgElement_play.textContent = '再生';
          imgElement_play.setAttribute('type','image/svg+xml');
          imgElement_play.setAttribute('data','../svg/play-circle-solid.svg');
          imgElement_play.setAttribute("style", `width:${String(videoTag.clientWidth/2)}px; height:${String(videoTag.clientHeight/2)}px; pointer-events: none;`);
          imgElement_play.setAttribute('___text','play');
        } else {
            // imgElement_play.textContent = '停止';
            imgElement_play.setAttribute('type','image/svg+xml');
            imgElement_play.setAttribute('data','../svg/pause-circle-solid.svg');
            imgElement_play.setAttribute("style", `width:${String(videoTag.clientWidth/2)}px; height:${String(videoTag.clientHeight/2)}px; pointer-events: none;`);
            imgElement_play.setAttribute('___text','pause');
        }

        divElement_fil.appendChild(imgElement_play);
        videoTag.parentElement.appendChild(divElement_fil);

        let cleanUp = () => {
          // console.log('del');
          videoTag.removeAttribute('___videostop');
          videoTag.parentElement.removeAttribute('__aparent');
          videoTag.parentElement.removeChild(divElement_fil);
        };
        setTimeout(cleanUp, 1000);

        divElement_fil.addEventListener('click', () => {
          console.log('クリックを検知');
          let playMode: string = videoTag.getAttribute('playxxx');
          if (playMode === 'pause') {
            videoTag.play();
            videoTag.setAttribute('playxxx', 'play');
          } else {
            videoTag.pause();
            videoTag.setAttribute('playxxx', 'pause');
          }

          // TODO あとで共通化
          console.log('del');
          videoTag.removeAttribute('___videostop');
          videoTag.setAttribute('___filter', 'off');
          videoTag.parentElement.removeAttribute('__aparent');
          videoTag.parentElement.removeChild(divElement_fil);
        });
      }
    });

    /**
     * スマホブラウザ用
     */
    videoTag.addEventListener('touchstart', () => {
      let fillter_off: string = videoTag.getAttribute('___filter');
      if (fillter_off === 'off') {
        videoTag.removeAttribute('___filter');
      } else {
        videoTag.classList.add('___videostop');
        videoTag.parentElement.classList.add('__aparent');
        const divElement_fil: HTMLDivElement = document.createElement('div');
        divElement_fil.classList.add('__filter');
        divElement_fil.setAttribute("style", `width:${String(videoTag.clientWidth)}px; height:${String(videoTag.clientHeight)}px; padding: 12%; cursor:pointer`);

        const imgElement_play: HTMLObjectElement = document.createElement('object');
        imgElement_play.setAttribute('id','___obj');
        let playMode: string = videoTag.getAttribute('playxxx');

        if(playMode === 'pause') {
          // imgElement_play.textContent = '再生';
          imgElement_play.setAttribute('type','image/svg+xml');
          imgElement_play.setAttribute('data','../svg/play-circle-solid.svg');
          imgElement_play.setAttribute("style", `width:${String(videoTag.clientWidth/2)}px; height:${String(videoTag.clientHeight/2)}px; pointer-events: none;`);
          imgElement_play.setAttribute('___text','play');
        } else {
          // imgElement_play.textContent = '停止';
          imgElement_play.setAttribute('type','image/svg+xml');
          imgElement_play.setAttribute('data','../svg/pause-circle-solid.svg');
          imgElement_play.setAttribute("style", `width:${String(videoTag.clientWidth/2)}px; height:${String(videoTag.clientHeight/2)}px; pointer-events: none;`);
          imgElement_play.setAttribute('___text','pause');
        }
        divElement_fil.appendChild(imgElement_play);
        videoTag.parentElement.appendChild(divElement_fil);

        let cleanUp = () => {
          console.log('del');
          videoTag.removeAttribute('___videostop');
          videoTag.parentElement.removeAttribute('__aparent');
          videoTag.parentElement.removeChild(divElement_fil);
        };
        setTimeout(cleanUp, 1000);

        divElement_fil.addEventListener('touchstart', () => {
          console.log('クリックを検知');
          let playMode: string = videoTag.getAttribute('playxxx');
          if (playMode === 'pause') {
            videoTag.play();
            videoTag.setAttribute('playxxx', 'play');
          } else {
            videoTag.pause();
            videoTag.setAttribute('playxxx', 'pause');
          }

          // TODO あとで共通化
          console.log('del');
          videoTag.removeAttribute('___videostop');
          videoTag.setAttribute('___filter','off');
          videoTag.parentElement.removeAttribute('__aparent');
          videoTag.parentElement.removeChild(divElement_fil);
        });

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
