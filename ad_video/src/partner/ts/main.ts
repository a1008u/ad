import { tag } from '../../service/tag';
import * as emergence from '../../../node_modules/emergence.js/src/emergence';
import {EventNotViewThrough} from './service/EventNotViewThrough';
import {EventViewThrough} from "./service/EventViewThrough";
import {oschecker} from "../../service/oschecker";
import axios from 'axios';
import { Jsontype } from '../../service/jsontype';

const setFontSize = (divTextLeftElement, divTextRightElement) => {
  divTextLeftElement.setAttribute('style', 'font-size:28px');
  divTextRightElement.setAttribute('style', 'font-size:24px');
};

const os2: OS2 = {
  ios: (divTextLeftElement, divTextRightElement) => {
    divTextLeftElement.setAttribute('style', 'font-size:16px');
    divTextRightElement.setAttribute('style', 'font-size:12px');
  },
  android: (divTextLeftElement, divTextRightElement) => {
    setFontSize(divTextLeftElement, divTextRightElement);
  },
  windowsphone: (divTextLeftElement, divTextRightElement) => {
    setFontSize(divTextLeftElement, divTextRightElement);
  },
  pc: (divTextLeftElement, divTextRightElement) => {
    setFontSize(divTextLeftElement, divTextRightElement);
  },
};

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
  const mkTextArea = (atvJson: Jsontype): HTMLDivElement => {
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

    os2[oschecker.isolate()](divTextLeftElement, divTextRightElement);
    divRightElement.appendChild(divTextRightElement);
    divTextElement.appendChild(divTextLeftElement);
    divTextElement.appendChild(divRightElement);
    return divTextElement;
  };

  /**
   * viewthrough有りか無しかで処理を分け、videoタグを生成
   * @param atvJson 
   * @param rk 
   * @param mainDivElement 
   */
  const mkVideoElement = (atvJson: Jsontype, rk: string, mainDivElement: HTMLDivElement) => {
    const viewThroughTime: number = Number(atvJson.VIDEOAD_VT_SECOND) * 1000;
    if (viewThroughTime > 0) {
      let videoElement: HTMLVideoElement = tag.mkVideoTag(atvJson, rk, true);
      mainDivElement.appendChild(videoElement);
      // EventVideo.setEventForViewthrogh(videoElement, viewThroughTime);
      EventViewThrough.setEventLoad(videoElement, viewThroughTime);
      return videoElement;
    } else {
      let videoElement: HTMLVideoElement = tag.mkVideoTag(atvJson, rk, false);
      mainDivElement.appendChild(videoElement);
      EventNotViewThrough.setEventLoad(videoElement);
      mainDivElement.classList.add('__mainDivShadow');
      const divTextElement: HTMLDivElement = mkTextArea(atvJson);
      mainDivElement.appendChild(divTextElement);
      mainDivElement.setAttribute('id', '___videostop');
      return videoElement;
    }
  };

  const mkElement = (
    rk: string,
    atvJson: Jsontype,
    script: HTMLScriptElement
  ): void => {
    const mainDivElement: HTMLDivElement = document.createElement('div');
    load_css('../css/index.css');

    // viewthrough有り無しで処理を分けたvideoタグを作成
    let videoElement: HTMLVideoElement = mkVideoElement(atvJson, rk, mainDivElement);

    // メイン処理(タグ設定 + スクリプトのrk削除 + 表示画像の起動)
    os[oschecker.isolate()](videoElement);
    script.parentNode.insertBefore(mainDivElement, script);
    mainDivElement.setAttribute("style", `width:${atvJson.WIDTH}px; z-index:30;`);
  };

  /**
   * メイン機能
   * @param viewThroughTime
   */
  export let exec = (): void => {
    const scripts: NodeListOf<HTMLScriptElement> = document.getElementsByTagName('script');
    for (let num in scripts) {
      const script: HTMLScriptElement = scripts[num];
      const rkValue: string = script.getAttribute('data-atv-rk');
      script.removeAttribute('data-atv-rk');

      // スクリプトタグにrkが存在しない場合は、次の「data-atv-rk」を確認する
      if (!rkValue) {
        continue;
      }

      // ブラウザ判定
      const domain: string = 'http://10.10.15.89:3000';

      axios
        .get(`${domain}/atvjson?atvrk=${rkValue}`)
        .then(resdata => resdata.data)
        .then(atvJson => mkElement(rkValue, atvJson, script))
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
          // 何も処理しない
        } else {
          let playMode: string = element.getAttribute('playxxx');
          if (playMode === 'pause') {
            element.pause();
          } else {
            element.play();
          }
        }
      } else if (state === 'reset') {
        element.pause();
      } else if (state === 'noreset') {
        element.pause();
      }
    },
  });

  // viewThroughTimeはDBから取得する
  advideo.exec();
})(window);
