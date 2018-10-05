import axios from 'axios';
import { Jsontype } from '../../service/jsontype';
import { tag } from '../../service/tag';
import * as emergence from '../../../node_modules/emergence.js/src/emergence';
import { rejects } from 'assert';

const emergenceInit = (window: Window) => {
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

/**
 * メイン処理
 */
((window, _) => {
  [].forEach.call(document.getElementsByTagName('script'), scriptElement => {
    // スクリプトタグにrkが存在しない場合は、次の「data-atv-rk」を確認する
    const rkValue: string = scriptElement.getAttribute('data-atv-rk');
    const atvMode: string = scriptElement.getAttribute('data-atv-mode');

    // プレビュー用
    if (atvMode && rkValue) {
      mainExecPre(scriptElement, rkValue, window, atvMode);
      scriptElement.removeAttribute('data-atv-rk');
      scriptElement.removeAttribute('data-atv-mode');
    } else if(atvMode) {
      mainExecPre(scriptElement, rkValue, window, atvMode);
      scriptElement.removeAttribute('data-atv-mode');
    } else if(rkValue) {
       // 非プレビュー用
      mainExec(scriptElement, rkValue, window);
      scriptElement.removeAttribute('data-atv-rk');
      scriptElement.removeAttribute('data-atv-mode');
    }
  });
})(window);

async function mainExec(scriptElement: any, rkValue: string, window: Window) {
  await mkIframe(scriptElement, rkValue);

  // 動画自動実行用library
  emergenceInit(window);
}

async function mainExecPre(scriptElement: any, rkValue: string, window: Window, atvMode: string) {
  await mkIframePre(scriptElement, rkValue, atvMode);

  // 動画自動実行用library
  emergenceInit(window);
}

async function mkIframe(scriptElement: HTMLScriptElement, rkValue: string) {

  const domain: string = 'http://10.10.15.52:3000';
  // const domain: string = 'http://192.168.1.6:3000';

  const infoJson: Jsontype = await getJson(domain, rkValue);

  // 追加要素
  infoJson.ATV_RK = rkValue;
  infoJson.ATV_MODE = '';
  infoJson.ADAREA_HEIGHT =
    infoJson.VIDEOAD_VT_SECOND !== '0'
      ? '0'
      : infoJson.HEIGHT === '360'
        ? '100'
        : '50';

  let ifWidth: number = Number(infoJson.HEIGHT) + Number(infoJson.ADAREA_HEIGHT);

  // iframe生成
  const url: string = `./iframe/ad.html?atvJson=${encodeURIComponent(JSON.stringify(infoJson))}`;
  let iframeElement: HTMLIFrameElement = tag.mkIframeElement(url, infoJson.WIDTH, String(ifWidth));
  scriptElement.parentNode.insertBefore(iframeElement, scriptElement);
}

async function mkIframePre(scriptElement: HTMLScriptElement, rkValue: string, atvMode: string) {

  const domain: string = 'http://10.10.15.52:3000';
  // const domain: string = 'http://192.168.1.6:3000';

  let moveURL: string = scriptElement.getAttribute('data-atv-url');
  const bannerText: string = scriptElement.getAttribute('data-atv-banner-text');
  const btnText: string = scriptElement.getAttribute('data-atv-btn-text');
  const infoJson: Jsontype = moveURL
    ? atvMode === 'pc'
      ? await getJsonPc(moveURL)
      : await getJsonSp(moveURL)
    : await getJson(domain, rkValue);
  scriptElement.removeAttribute('data-atv-url');

  // 追加要素
  infoJson.ATV_RK = '';
  infoJson.ATV_MODE = atvMode;

  if(bannerText && btnText){
    // viewthrough無
    infoJson.BANNER_TEXT = bannerText;
    infoJson.VIDEOAD_BTN_TEXT = btnText;
    infoJson.VIDEOAD_VT_SECOND = '0';
  } else {
    // viewthrough有
    infoJson.ADAREA_HEIGHT = '0';
  }

  if( (infoJson.BANNER_TEXT !== 'ここは表示しません' &&  infoJson.VIDEOAD_BTN_TEXT !== 'ここは表示しません') ||(bannerText && btnText)){
    infoJson.ADAREA_HEIGHT = infoJson.HEIGHT === '360' ? '100' : '50';
  }

  let ifWidth: number = Number(infoJson.HEIGHT) + Number(infoJson.ADAREA_HEIGHT);

  // iframe生成
  const url: string = `./iframe/ad.html?atvJson=${encodeURIComponent(JSON.stringify(infoJson))}`;
  let iframeElement: HTMLIFrameElement = tag.mkIframeElement(url, infoJson.WIDTH, String(ifWidth));
  scriptElement.parentNode.insertBefore(iframeElement, scriptElement);
}

/**
 * 1回目のxhr送信（動画広告表示用のJSON取得）
 * @param domain 
 * @param rkValue 
 */
async function getJson(domain: string, rkValue: string): Promise<Jsontype> {
  return axios
    .get(`${domain}/atvjson?atvrk=${rkValue}`)
    .then(resdata => resdata.data)
    .catch(err => console.log(err));
}

/**
 * 動画URLから取得(PC)
 * @param moveURL 
 */
async function getJsonPc(moveURL: string): Promise<Jsontype> {
  let j = new Jsontype(
    moveURL,
    '',
    'ここは表示しません',
    '360',
    '640',
    '10',
    'ここは表示しません');

  return new Promise<Jsontype>(
    (resolove, _) => {
      resolove(j)
    }
  )
}

/**
 * 動画URLから取得(SP)
 * @param moveURL 
 */
async function getJsonSp(moveURL: string): Promise<Jsontype> {
  let j = new Jsontype(
    moveURL,
    '',
    'ここは表示しません',
    '180',
    '320',
    '10',
    'ここは表示しません');

  return new Promise<Jsontype>(
    (resolove, _) => {
      resolove(j)
    }
  )
}