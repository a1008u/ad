import * as emergence from '../../../node_modules/emergence.js/src/emergence';

/**
 * emergenceの初期化
 * @param window
 */
export const emergenceInit = (window: Window) => {
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
    callback: (element: HTMLIFrameElement, state) => {
      // iframeのwindowオブジェクトを取得
      // let ifrm = element.contentWindow;
      if (state === 'visible') {
        // 外部サイトにメッセージを投げる
        let ca = element.getAttribute('advE');
        if (!ca) {
          console.log("kidou");
          element.setAttribute('advE', 'true');
          element.contentWindow.postMessage("playOrPause", '*');
        }
      }
      else if (state === 'reset') {
        // element.pause();
        let ca = element.getAttribute('advE');
        if (ca) {
          element.removeAttribute('advE');
          element.contentWindow.postMessage("pause", '*');
        }
      }
      else if (state === 'noreset') {
        // element.pause();
        let ca = element.getAttribute('advE');
        if (ca) {
          element.removeAttribute('advE');
          element.contentWindow.postMessage("pause", '*');
        }
      }
    },
  });
};