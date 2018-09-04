import { tag } from '../../../service/tag';
import { AnyRecordWithTtl } from 'dns';

export namespace EventNotViewThrough {
  /**
   *
   * @param videoTag
   * @param aElementText
   */
  export const setEventLoad = (videoTag: HTMLVideoElement, aElementText: string = 'テスト') => {

    videoTag.addEventListener('ended', () => {
      const divElement_fil: HTMLDivElement = document.createElement('div');
      divElement_fil.classList.add('__a');
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

      divElement.appendChild(divElement_1);
      divElement.appendChild(divElement_2);

      videoTag.classList.add('__video');
      videoTag.setAttribute('__end', 'true');
      videoTag.parentElement.classList.add('__aparent');
      let typeCss: string = videoTag.getAttribute('test-css-type');

      let targeElement: HTMLElement = videoTag.parentElement.parentElement;

      switch (typeCss) {
        case '9':
          targeElement.setAttribute("style", `position: relative;width:${String(videoTag.clientWidth)}px;`);
          videoTag.parentElement.setAttribute("style", `width:${String(videoTag.clientWidth)}px; height:${String(videoTag.clientHeight)}px;`);
          divElement.setAttribute("style", `width:100%; height:100%; background-color: rgba(0, 0, 0, 0.7); padding: 10%;`);

          const imgElement_play: HTMLObjectElement = document.createElement('object');
          imgElement_play.setAttribute('type','image/svg+xml');
          imgElement_play.setAttribute('data','../svg/play-circle-solid.svg');
          imgElement_play.setAttribute("style", `width:${String(videoTag.clientWidth/3)}px; height:${String(videoTag.clientHeight/3)}px; pointer-events: none;`);
          
          divElement_1.addEventListener('click', () => {
              let targeElement: HTMLElement = videoTag.parentElement.parentElement;
              divElement.textContent = null;
              targeElement.removeChild(divElement);
              videoTag.removeAttribute('__end');
              videoTag.play();
          });

          divElement_1.appendChild(imgElement_play);

          aElement2.classList.add('___a2');
          aElement2.textContent = 'インストールはこちら（１６文字）';
          break;

        case '10':
          targeElement.setAttribute("style", `position: relative;width:${String(videoTag.clientWidth)}px;`);
          videoTag.parentElement.setAttribute("style", `width:${String(videoTag.clientWidth)}px; height:${String(videoTag.clientHeight)}px;`);
          divElement.setAttribute("style", `width:100%; height:100%; background-color: rgba(0, 0, 0, 0.7); padding: 10%;`);
          divElement_fil.classList.add('___a');
          divElement_fil.textContent = '再生';
          aElement2.classList.add('___a2');
          aElement2.textContent = '詳細はこちらへどうぞ（１６文字）';

          divElement_fil.addEventListener('click', () => {
            let targeElement: HTMLElement = videoTag.parentElement.parentElement;
            divElement.textContent = null;
            targeElement.removeChild(divElement);
            videoTag.removeAttribute('__end');
            videoTag.play();
          });

          break;

        case '11':
        targeElement.setAttribute("style", `position: relative;width:${String(videoTag.clientWidth)}px;`);
          videoTag.parentElement.setAttribute("style", `width:${String(videoTag.clientWidth)}px; height:${String(videoTag.clientHeight)}px;`);
          divElement.setAttribute("style", `width:100%; height:100%; background-color: rgba(0, 0, 0, 0.7); padding: 13% 0%;`);
          divElement_fil.classList.add('___a');
          divElement_fil.textContent = '再生';
          aElement2.classList.add('___a2');
          aElement2.textContent = '詳細はこちら（１２文字）';

          divElement_fil.addEventListener('click', () => {
            let targeElement: HTMLElement = videoTag.parentElement.parentElement;
            divElement.textContent = null;
            targeElement.removeChild(divElement);
            videoTag.removeAttribute('__end');
            videoTag.play();
          });

          break;

        case '12':
          targeElement.setAttribute("style", `position: relative;width:${String(videoTag.clientWidth)}px;`);
          videoTag.parentElement.setAttribute("style", `width:${String(videoTag.clientWidth)}px; height:${String(videoTag.clientHeight)}px;`);
          divElement.setAttribute("style", `width:100%; height:100%; background-color: rgba(0, 0, 0, 0.7); padding: 10%;`);
          divElement_fil.classList.add('___a');
          divElement_fil.textContent = '再生';
          aElement2.classList.add('___a2');
          aElement2.textContent = '詳細を知りたい方はこちらへどうぞ（２２文字）';

          divElement_fil.addEventListener('click', () => {
            let targeElement: HTMLElement = videoTag.parentElement.parentElement;
            divElement.textContent = null;
            targeElement.removeChild(divElement);
            videoTag.removeAttribute('__end');
            videoTag.play();
          });

          break;
      }

      window.addEventListener('orientationchange', () => {
        let targeElement: HTMLElement = videoTag.parentElement.parentElement;
        divElement.textContent = null;
        targeElement.removeChild(divElement);
        videoTag.removeAttribute('__end');
        videoTag.play();
      });

      targeElement.appendChild(divElement);
      console.log('div生成');
    });
  };
}
