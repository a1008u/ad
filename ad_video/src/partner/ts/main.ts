import { videoEvent } from './service/videoEvent';
import { tag } from '../../service/tag';
import { viewstatus } from './service/viewstatus';
import * as emergence from '../../../node_modules/emergence.js/src/emergence';


namespace advideo {

  const mkTag = (rk: string, script: HTMLScriptElement): void => {
      // タグ生成
      const aTag: HTMLAnchorElement = tag.mkAtag(rk);
      const videoTag: HTMLVideoElement = tag.mkVideoTag(script, rk);
      aTag.appendChild(videoTag);

      // イベント登録
      videoEvent.setEvent(videoTag, aTag);

      // メイン処理(タグ設定 + スクリプトのrk削除 + 表示画像の起動)
      script.parentNode.insertBefore(aTag, script);
      script.removeAttribute('data-atv-rk');
      
  };

  export let mkvideo = (): void => {
      let scripts: NodeListOf<HTMLScriptElement> = document.getElementsByTagName('script');
      for (let num in scripts) {
        const script: HTMLScriptElement = scripts[num];
        const rk: string = script.getAttribute('data-atv-rk');
        if (!rk) {
          continue;
        }

        mkTag(rk, script);
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
    callback: (element, state) => {
      if (state === 'visible') {
        console.log('Element is visible.');
        element.play();
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

  // viewthrough
  advideo.mkvideo();
})(window);
