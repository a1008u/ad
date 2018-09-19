import * as emergence from '../../../node_modules/emergence.js/src/emergence';
import axios from 'axios';
import { ElementFactory } from './service/Factory/ElementFactory';

namespace advideo {
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
        .then(atvJson => ElementFactory.mkElement(rkValue, atvJson, script))
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
