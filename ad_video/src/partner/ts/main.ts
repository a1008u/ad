import * as emergence from '../../../node_modules/emergence.js/src/emergence';
import axios from 'axios';
import { ElementFactory } from './service/Factory/ElementFactory';

namespace advideo {
  // スタイルシートの読み込み
  export const loadCss = (src: string) => {
    if (!document.getElementById('__atv_videocss')) {
      let head = document.getElementsByTagName('head')[0];
      let link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = src;
      link.setAttribute('id', '__atv_videocss');
      head.insertBefore(link, head.firstChild);
    }
  };

  /**
   * メイン機能
   * @param viewThroughTime
   */
  export const exec = (): void => {
    [].forEach.call(document.getElementsByTagName('script'), scriptElement => {
      // スクリプトタグにrkが存在しない場合は、次の「data-atv-rk」を確認する
      const rkValue: string = scriptElement.getAttribute('data-atv-rk');
      if (rkValue) {
        const domain: string = 'http://10.10.15.81:3000';

        // const domain: string = 'http://actr-test.intra.accesstrade.net/video';
        scriptElement.removeAttribute('data-atv-rk');
        axios
          .get(`${domain}/atvjson?atvrk=${rkValue}`)
          .then(resdata => resdata.data)
          .then(atvJson => ElementFactory.mkElement(rkValue, atvJson, scriptElement))
          .catch(err => console.log(err));
      }
    });
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
  advideo.loadCss('../css/index.css');
  advideo.exec();
})(window);
