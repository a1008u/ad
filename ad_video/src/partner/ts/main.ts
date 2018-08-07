import { videoEvent } from './service/videoEvent';
import { tag } from '../../service/tag';
import { viewstatus } from './service/viewstatus';

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
      if (viewstatus.ckViewStatus(videoTag)) {
          videoTag.play();
      }
  };

  export let mkvideo = (): void => {
      let scripts = document.getElementsByTagName('script');
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

  // ブラウザ判定

  // viewthrough
  advideo.mkvideo();
})(window);
