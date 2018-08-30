import { videoEvent } from './service/videoEvent';
import { tag } from '../../service/tag';
import * as emergence from '../../../node_modules/emergence.js/src/emergence';

namespace advideo {
  const mkElement = (
    rk: string,
    script: HTMLScriptElement,
    limitTime: number
  ): void => {
    // タグ生成
    const aTag: HTMLAnchorElement = tag.mkAtag(rk);

    // イベント登録
    const viewthroughUse: string = script.getAttribute('data-atv-viewthrough-flag');
    const videoTag: HTMLVideoElement = tag.mkVideoTag(script, rk, viewthroughUse? true: false);

    if (viewthroughUse) {
      // if(true)の条件はあくまで、サンプルのため本番では削除する

      limitTime = Number(script.getAttribute('data-atv-viewthrough-time'));

      if (script.getAttribute('data-atv-not-anchor')) {
        videoEvent.setEventForTest(videoTag, limitTime);
        script.parentNode.insertBefore(videoTag, script);
      } else {
        aTag.appendChild(videoTag);
        videoEvent.setEvent(videoTag, aTag, limitTime);
        // メイン処理(タグ設定 + スクリプトのrk削除 + 表示画像の起動)
        script.parentNode.insertBefore(aTag, script);
      }

    } else {

      // スタイルシートの読み込み
      let load_css = (src) => {
        let head = document.getElementsByTagName('head')[0];
        let link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = src;
        link.classList.add('__videocss');
        head.insertBefore(link, head.firstChild);
      };

      aTag.appendChild(videoTag);
      let cssElements = document.getElementsByClassName('__videocss');
      if (cssElements.length === 0) {
        load_css('../css/index.css');
      }

      videoEvent.setEventLoad(videoTag);
        // メイン処理(タグ設定 + スクリプトのrk削除 + 表示画像の起動)
        script.parentNode.insertBefore(aTag, script);
    }

    script.removeAttribute('data-atv-rk');
  };

  /**
   * メイン機能
   * @param limitTime
   */
  export let exec = (limitTime: number): void => {
    // tslint:disable-next-line:prettier
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
