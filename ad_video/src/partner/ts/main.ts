
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
  const mkElement = (
    rk: string,
    script: HTMLScriptElement,
    limitTime: number
  ): void => {
    // タグ生成
    const aElement: HTMLAnchorElement = tag.mkAtag(rk);

    // イベント登録
    const viewthroughUse: string = script.getAttribute('data-atv-viewthrough-flag');
    const videoTag: HTMLVideoElement = tag.mkVideoTag(script, rk, viewthroughUse? true: false);
    const divElement: HTMLDivElement = document.createElement('div');
    divElement.classList.add('__div');

    const divTextElement: HTMLDivElement = document.createElement('div');
    divTextElement.classList.add('__divTextElement');

    const divTextLeftElement: HTMLDivElement = document.createElement('div');
    divTextLeftElement.textContent = '＿＿＿＿＿詳細サンプル詳細サンプル詳細サンプル詳細サンプル詳細サンプル詳細サンプル＿＿＿＿＿';
    divTextLeftElement.classList.add('__divTextLeftElement');

    const divRightElement: HTMLDivElement = document.createElement('div');
    divRightElement.classList.add('__divTextRightElement');

    const divTextRightElement: HTMLDivElement = document.createElement('div');
    divTextRightElement.textContent = 'インストール';
    divTextRightElement.classList.add('__button2');

    divRightElement.appendChild(divTextRightElement);
    divTextElement.appendChild(divTextLeftElement);
    divTextElement.appendChild(divRightElement);

    // viewthroughを利用するかしないかで、処理を分ける
    if (viewthroughUse) {
      limitTime = Number(script.getAttribute('data-atv-viewthrough-time'));

      divElement.appendChild(videoTag);
      EventVideo.setEventForViewthrogh(videoTag, limitTime);
      os[oschecker.isolate()](videoTag);
      videoTag.play();

    } else {
      // スタイルシートの読み込み
      let load_css = (src: string) => {
        let head = document.getElementsByTagName('head')[0];
        let link = document.createElement("link");
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = src;
        link.classList.add('__videocss');
        head.insertBefore(link, head.firstChild);
      };

      divElement.setAttribute('id','___videostop');
      aElement.appendChild(videoTag);
      divElement.appendChild(aElement);
      let cssElements = document.getElementsByClassName('__videocss');
      if (cssElements.length === 0) {
        load_css('../css/index.css');
      }

      EventNotViewThrough.setEventLoad(videoTag);
      videoTag.play();

    }

    // メイン処理(タグ設定 + スクリプトのrk削除 + 表示画像の起動)
    divElement.appendChild(divTextElement);
    script.parentNode.insertBefore(divElement, script);
    script.removeAttribute('data-atv-rk');
  };

  /**
   * メイン機能
   * @param limitTime
   */
  export let exec = (limitTime: number): void => {
    const scripts: NodeListOf<HTMLScriptElement> = document.getElementsByTagName('script');
    for (let num in scripts) {
      const script: HTMLScriptElement = scripts[num];
      const rk: string = script.getAttribute('data-atv-rk');
      if (!rk) {
        continue;
      }

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
  let limitTime: number = 1000;
  advideo.exec(limitTime);
})(window);
