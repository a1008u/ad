import axios from 'axios';
import { Jsontype } from '../../service/jsontype';
import { tag } from '../../service/tag';
import * as emergence from '../../../node_modules/emergence.js/src/emergence';

((window, _) => {
  [].forEach.call(document.getElementsByTagName('script'), scriptElement => {
    // スクリプトタグにrkが存在しない場合は、次の「data-atv-rk」を確認する
    const rkValue: string = scriptElement.getAttribute('data-atv-rk');
    if (rkValue) {
      scriptElement.removeAttribute('data-atv-rk');
      mkIframe(scriptElement, rkValue, scriptElement.getAttribute('atv-mode'));

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
        callback: (element: HTMLIFrameElement, state) => {
          // iframeのwindowオブジェクトを取得
          let ifrm = element.contentWindow;
          if (state === 'visible') {
            // 外部サイトにメッセージを投げる
            element.contentWindow.postMessage("playOrPause", '*');
          } else if (state === 'reset') {
            // element.pause();
            element.contentWindow.postMessage("pause", '*');
          } else if (state === 'noreset') {
            // element.pause();
            element.contentWindow.postMessage("pause", '*');
          }
        },
      });
    }
  });
})(window);

async function getJson(domain: string, rkValue: string): Promise<Jsontype> {
  return axios
    .get(`${domain}/atvjson?atvrk=${rkValue}`)
    .then(resdata => resdata.data)
    .catch(err => console.log(err));
}

async function mkIframe(scriptElement: HTMLScriptElement, rkValue: string, atvMode: string) {
  const domain: string = 'http://10.10.15.99:3000';
  const infoJson: Jsontype = await getJson(domain, rkValue);
  infoJson.ATV_RK = rkValue;
  infoJson.ATV_MODE = (atvMode)? atvMode : '';
  const url: string = `./iframe/ad.html?atvJson=${encodeURIComponent(JSON.stringify(infoJson))}`;
  let iframeElement: HTMLIFrameElement = tag.mkIframeElement(url, infoJson.WIDTH, infoJson.HEIGHT);
  scriptElement.parentNode.insertBefore(iframeElement, scriptElement);
}
