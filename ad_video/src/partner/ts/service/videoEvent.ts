import { tag } from '../../../service/tag';

export namespace videoEvent {
  /**
   * イベント処理
   * @param {HTMLVideoElement} videoTag
   * @param {HTMLAnchorElement} aTag
   * @param {number} limitTime
   */
  export const setEvent = (
    videoTag: HTMLVideoElement,
    aTag: HTMLAnchorElement,
    limitTime: number = 10000
  ) => {
    let count = 0;
    let cntEvt;

    // viewthrough
    videoTag.addEventListener('play', () => {
      if (count < limitTime) {
        cntEvt = window.setInterval(() => {
          count += 250;
          if (count > limitTime) {
            window.clearInterval(cntEvt);
            let iframeTag: HTMLIFrameElement = tag.mkTrackingTag(videoTag);
            videoTag.parentNode.insertBefore(iframeTag, videoTag);

          }
        }, 250);
      }
    });

    // viewthrough(pauseの場合は、繰り返し動作を止める)
    videoTag.addEventListener('pause', () => {
      if (cntEvt) {
        window.clearInterval(cntEvt);
      }
    });

    // videoタグ（aタグ）をクリックされた場合
    videoTag.parentNode.addEventListener('click', () => {
      videoTag.pause();
      aTag.href += '&p=' + videoTag.currentTime;
    });
  };

    export const setEventForTest = (
        videoTag: HTMLVideoElement,
        limitTime: number = 10000
    ) => {
        let count = 0;
        let cntEvt;

        // viewthrough
        videoTag.addEventListener('play', () => {
            if (count < limitTime) {
                cntEvt = window.setInterval(() => {
                    count += 250;
                    if (count > limitTime) {
                        window.clearInterval(cntEvt);
                        let iframeTag: HTMLIFrameElement = tag.mkTrackingTag(videoTag);
                        videoTag.parentNode.insertBefore(iframeTag, videoTag);

                        const divElement: HTMLDivElement = document.createElement('div');
                        divElement.textContent = 'viewthroughをしました'
                        videoTag.parentNode.insertBefore(divElement, videoTag);

                    }
                }, 250);
            }
        });

        // viewthrough(pauseの場合は、繰り返し動作を止める)
        videoTag.addEventListener('pause', () => {
            if (cntEvt) {
                window.clearInterval(cntEvt);
            }
        });

      videoTag.setAttribute('playxxx','play');
      videoTag.addEventListener('click', () => {
        console.log('クリックを検知');
        let playMode: string = videoTag.getAttribute('playxxx');
        if(playMode === null || playMode === 'undefined'|| playMode === 'pause') {
          videoTag.play();
          videoTag.setAttribute('playxxx','play');
        } else {
          videoTag.pause();
          videoTag.setAttribute('playxxx','pause');
        }
      });

    };



  export const setEventLoad = (videoTag: HTMLVideoElement, aElementText: string = 'テスト') => {

    videoTag.addEventListener('ended', () => {
      const divElement_fil: HTMLDivElement = document.createElement('div');
      divElement_fil.classList.add('__a');
      divElement_fil.addEventListener('click', () => {
        let targeElement: HTMLElement = videoTag.parentElement.parentElement;
        divElement.textContent = null;
        targeElement.removeChild(divElement);
        videoTag.removeAttribute('__end');
        videoTag.play();
      });

      const divElement_1: HTMLDivElement = document.createElement('div');
      divElement_1.classList.add('__link');
      divElement_1.appendChild(divElement_fil);

      const aElement2: HTMLAnchorElement = document.createElement('a');
      aElement2.textContent = aElementText;
      aElement2.href = 'https://www.google.com/';
      aElement2.classList.add('__a2');
      const divElement_2: HTMLDivElement = document.createElement('div');
      divElement_2.classList.add('__play');
      divElement_2.appendChild(aElement2);

      const divElement: HTMLDivElement = document.createElement('div');
      divElement.classList.add('__button');
      // divElement.appendChild(aElement);
      divElement.appendChild(divElement_1);
      divElement.appendChild(divElement_2);


      videoTag.classList.add('__video');
      videoTag.setAttribute('__end', 'true');
      videoTag.parentElement.classList.add('__aparent');
      let typeCss: string = videoTag.getAttribute('test-css-type');

      let targeElement: HTMLElement = videoTag.parentElement.parentElement;

      switch(typeCss) {
        case '9':
        targeElement.setAttribute("style", `position: relative;width:${String(videoTag.clientWidth)}px;`);
          videoTag.parentElement.setAttribute("style", `width:${String(videoTag.clientWidth)}px; height:${String(videoTag.clientHeight)}px;`);
          divElement.setAttribute("style", `width:100%; height:100%; background-color: rgba(0, 0, 0, 0.7); padding: 10%;`);
          divElement_fil.classList.add('___a');
          divElement_fil.textContent = '再生';
          aElement2.classList.add('___a');
          aElement2.textContent = 'インストールはこちら（１６文字）';
          break;

        case '10':
        targeElement.setAttribute("style", `position: relative;width:${String(videoTag.clientWidth)}px;`);
          videoTag.parentElement.setAttribute("style", `width:${String(videoTag.clientWidth)}px; height:${String(videoTag.clientHeight)}px;`);
          divElement.setAttribute("style", `width:100%; height:100%; background-color: rgba(0, 0, 0, 0.7); padding: 10%;`);
          divElement_fil.classList.add('___a');
          divElement_fil.textContent = '再生';
          aElement2.classList.add('___a');
          aElement2.textContent = '詳細はこちらへどうぞ（１６文字）';
          break;

        case '11':
        targeElement.setAttribute("style", `position: relative;width:${String(videoTag.clientWidth)}px;`);
          videoTag.parentElement.setAttribute("style", `width:${String(videoTag.clientWidth)}px; height:${String(videoTag.clientHeight)}px;`);
          divElement.setAttribute("style", `width:100%; height:100%; background-color: rgba(0, 0, 0, 0.7); padding: 10%;`);
          divElement_fil.classList.add('___a');
          divElement_fil.textContent = '再生';
          aElement2.classList.add('___a');
          aElement2.textContent = '詳細はこちら（１２文字）';
          break;

        case '12':
        targeElement.setAttribute("style", `position: relative;width:${String(videoTag.clientWidth)}px;`);
        videoTag.parentElement.setAttribute("style", `width:${String(videoTag.clientWidth)}px; height:${String(videoTag.clientHeight)}px;`);
        divElement.setAttribute("style", `width:100%; height:100%; background-color: rgba(0, 0, 0, 0.7); padding: 10%;`);
        divElement_fil.classList.add('___a');
        divElement_fil.textContent = '再生';
        aElement2.classList.add('___a');
        aElement2.textContent = '詳細を知りたい方はこちらへどうぞ（２２文字）';
        break;
      }
      targeElement.appendChild(divElement);
      console.log('div生成');
    });
  };
}
