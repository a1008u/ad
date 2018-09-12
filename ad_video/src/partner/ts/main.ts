import { tag } from '../../service/tag';
import * as emergence from '../../../node_modules/emergence.js/src/emergence';
import { EventVideo } from './service/EventVideo';
import {EventNotViewThrough} from './service/EventNotViewThrough';
import {EventViewThrough} from "./service/EventViewThrough";
import {oschecker} from "../../service/oschecker";
import axios from 'axios';


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
  },
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
  const mkTextArea = (atvJson: Jsontype) => {
    const divTextElement: HTMLDivElement = document.createElement('div');
    divTextElement.classList.add('__divTextElement');

    const divTextLeftElement: HTMLDivElement = document.createElement('div');

    divTextLeftElement.textContent = atvJson.BANNER_TEXT;
    divTextLeftElement.classList.add('__divTextLeftElement');

    const divRightElement: HTMLDivElement = document.createElement('div');
    divRightElement.classList.add('__divTextRightElement');

    const divTextRightElement: HTMLDivElement = document.createElement('div');
    divTextRightElement.textContent = atvJson.VIDEOAD_BTN_TEXT;
    divTextRightElement.classList.add('__button2');

    divRightElement.appendChild(divTextRightElement);
    divTextElement.appendChild(divTextLeftElement);
    divTextElement.appendChild(divRightElement);
    return divTextElement;
  };

  const mkElement = (
    rk: string,
    atvJson: Jsontype,
    script: HTMLScriptElement
  ): void => {
    // イベント登録
    const limitTime: number = Number(atvJson.VIDEOAD_VT_SECOND) * 1000;
    const mainDivElement: HTMLDivElement = document.createElement('div');

    load_css('../css/index.css');

    // viewthroughを利用するかしないかで、処理を分ける
    let videoElement: HTMLVideoElement;
    if (limitTime > 0) {
      videoElement = tag.mkVideoTag(atvJson, rk, true);
      mainDivElement.appendChild(videoElement);
      EventVideo.setEventForViewthrogh(videoElement, limitTime);
    } else {
      videoElement = tag.mkVideoTag(atvJson, rk, false);
      mainDivElement.appendChild(videoElement);
      EventNotViewThrough.setEventLoad(videoElement);
      mainDivElement.classList.add('__mainDivShadow');
      const divTextElement = mkTextArea(atvJson);
      mainDivElement.appendChild(divTextElement);
      mainDivElement.setAttribute('id', '___videostop');
    }

    // メイン処理(タグ設定 + スクリプトのrk削除 + 表示画像の起動)
    os[oschecker.isolate()](videoElement);
    script.parentNode.insertBefore(mainDivElement, script);
    mainDivElement.setAttribute("style", `width:${atvJson.WIDTH}px; z-index:30;`);
  };

  /**
   * メイン機能
   * @param limitTime
   */
  export let exec = (): void => {
    const scripts: NodeListOf<HTMLScriptElement> = document.getElementsByTagName('script');
    for (let num in scripts) {
      const script: HTMLScriptElement = scripts[num];
      const rkValue: string = script.getAttribute('data-atv-rk');
      script.removeAttribute('data-atv-rk');
      if (!rkValue) {
        continue;
      }

      // ブラウザ判定
      let atvJson: Jsontype;
      const domain: string = 'http://10.10.15.89:3000';

      axios
        .get(`${domain}/atvjson?atvrk=${rkValue}`)
        .then(resdata => {
          atvJson = resdata.data;
          console.log(atvJson);
          mkElement(rkValue, atvJson, script);
        })
        .catch(err => console.log(err));
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

  // limitTimeはDBから取得する
  advideo.exec();
})(window);
