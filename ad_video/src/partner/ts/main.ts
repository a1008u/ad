import { videoEvent } from './service/videoEvent';
import { tag } from '../../service/tag';
import * as emergence from '../../../node_modules/emergence.js/src/emergence';
import { EventVideo } from './service/EventVideo';
import {EventNotViewThrough} from './service/EventNotViewThrough';
import {EventViewThrough} from "./service/EventViewThrough";

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

    // viewthroughを利用するかしないかで、処理を分ける
    if (viewthroughUse) {
      limitTime = Number(script.getAttribute('data-atv-viewthrough-time'));

      // videoタグにアンカーを設置するかしないか決める（あくまで、サンプルのため本番ではこの分岐はなくなる）
      if (script.getAttribute('data-atv-not-anchor')) {
        const ddivElement: HTMLDivElement = document.createElement('div');
        ddivElement.appendChild(videoTag);

        // videoEvent.setEventForTest(videoTag, limitTime);
        EventVideo.setEventForViewthrogh(videoTag, limitTime);
        //EventViewThrough.setEventViewThroughPC(videoTag);
        EventViewThrough.setEventViewThroughSmartPhone(videoTag);
        videoTag.play();

        script.parentNode.insertBefore(ddivElement, script);
      } else {
        // 多分こっちは消す
        const ddivElement: HTMLDivElement = document.createElement('div');
        ddivElement.appendChild(videoTag);
        aTag.appendChild(ddivElement);

        // videoEvent.setEvent(videoTag, aTag, limitTime);
        EventVideo.setEventForViewthroghAboutA(videoTag, aTag, limitTime);
        EventNotViewThrough.setEventLoad(videoTag, 'this is the test');
        videoTag.play();

        // メイン処理(タグ設定 + スクリプトのrk削除 + 表示画像の起動)
        script.parentNode.insertBefore(aTag, script);
      }
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

      const ddivElement: HTMLDivElement = document.createElement('div');
      ddivElement.setAttribute('id','___videostop');
      aTag.appendChild(videoTag);
      ddivElement.appendChild(aTag);
      let cssElements = document.getElementsByClassName('__videocss');
      if (cssElements.length === 0) {
        load_css('../css/index.css');
      }

      // videoEvent.setEventLoad(videoTag);
      EventNotViewThrough.setEventLoad(videoTag);
      videoTag.play();

      // メイン処理(タグ設定 + スクリプトのrk削除 + 表示画像の起動)
      script.parentNode.insertBefore(ddivElement, script);
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
