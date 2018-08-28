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

    };



  export const setEventLoad = (videoTag: HTMLVideoElement, aElementText: string = 'テスト') => {

    videoTag.addEventListener('ended', () => {
      const aElement: HTMLAnchorElement = document.createElement('a');
      aElement.textContent = aElementText;
      aElement.href = 'https://www.google.com/';
      aElement.classList.add('__a');

      const divElement: HTMLDivElement = document.createElement('div');
      divElement.classList.add('__button');
      divElement.appendChild(aElement);
      videoTag.classList.add('__video');
      videoTag.setAttribute('__end', 'true');
      videoTag.parentElement.classList.add('__aparent');
      let typeCss: string = videoTag.getAttribute('test-css-type');

      switch(typeCss) {
        case '1':
          videoTag.parentElement.setAttribute("style", `width:${String(videoTag.width)}px; height:${String(videoTag.height)}px;`);
          videoTag.setAttribute("style", `filter: grayscale(100%);`);
          break;
        case '2':
          videoTag.parentElement.setAttribute("style", `width:${String(videoTag.width)}px; height:${String(videoTag.height)}px;`);
          videoTag.setAttribute("style", `filter: blur(5px);`);
          break;
        case '3':
          videoTag.parentElement.setAttribute("style", `width:${String(videoTag.width)}px; height:${String(videoTag.height)}px;`);
          videoTag.setAttribute("style", `filter: opacity(40%);`);
          break;
        case '4':
          videoTag.parentElement.setAttribute("style", `width:${String(videoTag.width)}px; height:${String(videoTag.height)}px;`);
          divElement.setAttribute("style", `width:100%; height:100%; opacity:0.5;`);
          break;
      }

      videoTag.parentNode.insertBefore(divElement, videoTag);
      console.log('div生成');
    });
  };
}
