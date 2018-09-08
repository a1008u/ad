
import { tag } from '../../service/tag';
import * as emergence from '../../../node_modules/emergence.js/src/emergence';
import { EventVideo } from './service/EventVideo';
import {EventNotViewThrough} from './service/EventNotViewThrough';
import {EventViewThrough} from "./service/EventViewThrough";
import {oschecker} from "../../service/oschecker";

const os: OS = {
    ios: (videoTag: HTMLVideoElement) => {
        console.log('smart phoneと判定');
        EventViewThrough.setEventViewThroughSmartPhone(videoTag);
    },
    android: (videoTag: HTMLVideoElement) => {
        console.log('smart phoneと判定');
        EventViewThrough.setEventViewThroughPC(videoTag);
    },
    windowsphone: (videoTag: HTMLVideoElement) => {
        console.log('smart phoneと判定');
      EventViewThrough.setEventViewThroughPC(videoTag);
    },
    pc: (videoTag: HTMLVideoElement) => {
        console.log('pcと判定');
        EventViewThrough.setEventViewThroughPC(videoTag);
    }
};

namespace advideo {

  // スタイルシートの読み込み
  const load_css = (src: string) => {
    let head = document.getElementsByTagName('head')[0];
    let link = document.createElement("link");
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = src;
    link.classList.add('__videocss');
    head.insertBefore(link, head.firstChild);
  };

  // textareaの作成
  const mkTextArea = () => {
    const divTextElement: HTMLDivElement = document.createElement('div');
    divTextElement.classList.add('__divTextElement');

    const divTextLeftElement: HTMLDivElement = document.createElement('div');
    divTextLeftElement.textContent = 'あいうえおかきくけこさしすせそたちつてと';
    divTextLeftElement.classList.add('__divTextLeftElement');

    const divRightElement: HTMLDivElement = document.createElement('div');
    divRightElement.classList.add('__divTextRightElement');

    const divTextRightElement: HTMLDivElement = document.createElement('div');
    divTextRightElement.textContent = 'インストール';
    divTextRightElement.classList.add('__button2');

    divRightElement.appendChild(divTextRightElement);
    divTextElement.appendChild(divTextLeftElement);
    divTextElement.appendChild(divRightElement);
    return divTextElement;
  };

  const mkElement = (
    rk: string,
    script: HTMLScriptElement,
    limitTime: number　= 1000
  ): void => {
    // イベント登録
    const viewthroughUse: string = script.getAttribute('data-atv-viewthrough-flag');
    const videoElement: HTMLVideoElement = tag.mkVideoTag(script, rk, viewthroughUse? true: false);
    const mainDivElement: HTMLDivElement = document.createElement('div');

    load_css('../css/index.css');

    mainDivElement.appendChild(videoElement);
    videoElement.play();

    // viewthroughを利用するかしないかで、処理を分ける
    if (viewthroughUse) {
      EventVideo.setEventForViewthrogh(videoElement, limitTime);
    } else {
      EventNotViewThrough.setEventLoad(videoElement);
      mainDivElement.classList.add('__mainDivShadow');
      const divTextElement = mkTextArea();
      mainDivElement.appendChild(divTextElement);
      mainDivElement.setAttribute('id','___videostop');
    }

    // メイン処理(タグ設定 + スクリプトのrk削除 + 表示画像の起動)
    os[oschecker.isolate()](videoElement);
    script.parentNode.insertBefore(mainDivElement, script);
    mainDivElement.setAttribute("style", `width:${script.getAttribute('data-atv-width')}px; z-index:30;`);
    script.removeAttribute('data-atv-rk');
  };

  /**
   * メイン機能
   * @param limitTime
   */
  export let exec = (): void => {
    const scripts: NodeListOf<HTMLScriptElement> = document.getElementsByTagName('script');
    for (let num in scripts) {
      const script: HTMLScriptElement = scripts[num];
      const rk: string = script.getAttribute('data-atv-rk');
      if (!rk) {
        continue;
      }

      let limitTime: number =  Number(script.getAttribute('data-atv-viewthrough-time'));
      mkElement(rk, script, limitTime);
      break;
    }
  };
}

// 即時実行
((window, _) => {

  // 動画自動実行用library
  emergence.init({
    container: window,
    reset: true,
    handheld: true,
    throttle: 250,
    elemCushion: 0.5,
    offsetTop: 0,
    offsetRight: 0,
    offsetBottom: 0,
    offsetLeft: 0,
    callback: (element: HTMLVideoElement, state) => {
      if (state === 'visible') {
        if(element.getAttribute('__end') !== undefined && element.getAttribute('__end') === 'true') {
          console.log('起動しない');
        } else {
          let playMode: string = element.getAttribute('playxxx');
          if (playMode === 'pause') {
            console.log('Element is visible1.');
            element.pause();
          } else {
            console.log('Element is visible2.');
            element.play();
          }
        }
      } else if (state === 'reset') {
        console.log('Element is hidden with reset.');
        element.pause();
      } else if (state === 'noreset') {
        console.log('Element is hidden with NO reset.');
        element.pause();
      }
    },
  });

  // ブラウザ判定

  // limitTimeはDBから取得する
  advideo.exec();
})(window);
