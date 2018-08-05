import { videoEvent } from './service/videoEvent';
import { tag } from '../../service/tag';
import { viewstatus } from './service/viewstatus';

namespace advideo {
  export let mkvideo = (): void => {
    let scripts = document.getElementsByTagName('script');

    for (let num in scripts) {
      let script: HTMLScriptElement = scripts[num];
      let rk: string = script.getAttribute('data-atv-rk');
      if (!rk) {
        continue;
      }

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
      break;
    }
  };
}

// 即時実行
((window, _) => {
  advideo.mkvideo();
})(window);
