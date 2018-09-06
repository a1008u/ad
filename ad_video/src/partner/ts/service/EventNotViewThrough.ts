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


      // filterの子要素２を作成　再生用
      const divElement_2: HTMLDivElement = document.createElement('div');
      divElement_2.classList.add('__play');

      // リンク用と再生用を載せるdivを作成
      const divElement: HTMLDivElement = document.createElement('div');
      divElement.classList.add('__button');

      divElement.appendChild(divElement_2);

      videoTag.classList.add('__video');
      videoTag.setAttribute('__end', 'true');
      videoTag.parentElement.classList.add('__aparent');
      let targeElement: HTMLElement = videoTag.parentElement.parentElement;


      targeElement.setAttribute("style", `position: relative;width:${String(videoTag.clientWidth)}px;`);
      videoTag.parentElement.setAttribute("style", `width:${String(videoTag.clientWidth)}px; height:${String(videoTag.clientHeight)}px;`);

      // svg利用パターン
      divElement.setAttribute("style", `width:100%; height:${String(videoTag.clientHeight)}px; background-color: rgba(0, 0, 0, 0.7); padding: 10%;`);
      const imgElement_play: HTMLObjectElement = document.createElement('object');
      imgElement_play.setAttribute('type','image/svg+xml');
      imgElement_play.setAttribute('data','../svg/play-circle-solid.svg');
      imgElement_play.setAttribute("style", `width:${String(videoTag.clientWidth/3)}px; height:${String(videoTag.clientHeight/3)}px; pointer-events: none;`);

      divElement_2.addEventListener('click', () => {
          let targeElement: HTMLElement = videoTag.parentElement.parentElement;
          divElement.textContent = null;
          targeElement.removeChild(divElement);
          videoTag.removeAttribute('__end');
          videoTag.play();
      });

        divElement_2.appendChild(imgElement_play);

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
