import { tag } from '../../../service/tag';
import { AnyRecordWithTtl } from 'dns';

export namespace EventNotViewThrough {
  /**
   * <div class='__aparent'>
   *  <div class='__button'>
   *     <div class='__play'></div>
   *     <div class='__link'>
   *      <div class='__a'></div>
   *     </div>
   *  </div>
   *  <video class='__video' __end='true'></video>
   * </div>
   *
   * @param videoTag
   * @param aElementText
   */
  export const setEventLoad = (videoTag: HTMLVideoElement, aElementText: string = 'テスト') => {

    videoTag.addEventListener('ended', () => {

      // link文字作成
      const divElement_a: HTMLDivElement = document.createElement('div');
      divElement_a.classList.add('__a');

      // filterの子要素１を作成　リンク用
      const divElement_1: HTMLDivElement = document.createElement('div');
      divElement_1.classList.add('__link');
      divElement_1.appendChild(divElement_a);

      // aTag作成
      const aElement2: HTMLAnchorElement = document.createElement('a');
      aElement2.textContent = aElementText;
      aElement2.href = 'https://www.google.com/';
      aElement2.classList.add('__a2');

      // filterの子要素２を作成　再生用
      const divElement_2: HTMLDivElement = document.createElement('div');
      divElement_2.classList.add('__play');
      divElement_2.appendChild(aElement2);

      // リンク用と再生用を載せるdivを作成
      const divElement: HTMLDivElement = document.createElement('div');
      divElement.classList.add('__button');

      divElement.appendChild(divElement_1);
      divElement.appendChild(divElement_2);

      videoTag.classList.add('__video');
      videoTag.setAttribute('__end', 'true');
      videoTag.parentElement.classList.add('__aparent');
      let targeElement: HTMLElement = videoTag.parentElement.parentElement;


      targeElement.setAttribute("style", `position: relative;width:${String(videoTag.clientWidth)}px;`);
      videoTag.parentElement.setAttribute("style", `width:${String(videoTag.clientWidth)}px; height:${String(videoTag.clientHeight)}px;`);



      let typeCss: string = videoTag.getAttribute('test-css-type');
      switch (typeCss) {
        case '9':
          // svg利用パターン
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

        // こちらは利用しないと思う -------------------------
        case '10':
        case '11':
        case '12':

          if(typeCss === '10') {
              divElement.setAttribute("style", `width:100%; height:100%; background-color: rgba(0, 0, 0, 0.7); padding: 10%;`);
              aElement2.textContent = '詳細はこちらへどうぞ（１６文字）';
          }

          if(typeCss === '10') {
              divElement.setAttribute("style", `width:100%; height:100%; background-color: rgba(0, 0, 0, 0.7); padding: 13% 0%;`);
              aElement2.textContent = '詳細はこちら（１２文字）';
          }

          if(typeCss === '10') {
              divElement.setAttribute("style", `width:100%; height:100%; background-color: rgba(0, 0, 0, 0.7); padding: 10%;`);
              aElement2.textContent = '詳細を知りたい方はこちらへどうぞ（２２文字）';
          }

          divElement_a.classList.add('___a');
          divElement_a.textContent = '再生';
          aElement2.classList.add('___a2');

          divElement_a.addEventListener('click', () => {
            let targeElement: HTMLElement = videoTag.parentElement.parentElement;
            divElement.textContent = null;
            targeElement.removeChild(divElement);
            videoTag.removeAttribute('__end');
            videoTag.play();
          });

          break;
      // こちらは利用しないと思う -------------------------
      }

      window.addEventListener('orientationchange', () => {
        let targeElement: HTMLElement = videoTag.parentElement.parentElement;
        divElement.textContent = null;
        targeElement.removeChild(divElement);
        videoTag.removeAttribute('__end');
        videoTag.play();
      });

      targeElement.appendChild(divElement);
    });
  };
}
