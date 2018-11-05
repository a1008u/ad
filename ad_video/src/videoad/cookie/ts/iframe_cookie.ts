import * as Rx from 'rxjs';
import axios from 'axios';
import { cookies } from './cookies';
import { tag } from '../../service/tag';
import { browser } from '../../service/browser';
import { Jsoncookie } from '../../service/jsoncookie';
import { Browser } from './Browser';

// IEでPromiseを利用する為に利用
// tslint:disable-next-line:no-var-requires
require('es6-promise').polyfill();

// const setEvent = (cookieKey: string = 'test'): void => {
//   window.addEventListener('load', () => {
//     let cookieValue = cookies.getCookie(cookieKey);

//     if (cookieValue !== null) {
//       window.location.replace(cookieValue);
//     } else {
//       console.log(`cookieValueは${cookieValue}です。`);
//     }
//   });
// };

// IMGタグ用 IE p -> h -> is -> Lp
const execImgElement = (jsoncookie: Jsoncookie) => {
  console.log('IEだよ')

  // イベント追加
  // setEvent();

  // imgを作成 + 設定 
  // const imgTag: HTMLImageElement = tag.mkImageTag(`${jsoncookie.rurl}`);
  const imgTag: HTMLImageElement = tag.mkImageTag(`${jsoncookie.imgurl}`);
  const scripts = document.getElementsByTagName('script');
  scripts[0].parentNode.insertBefore(imgTag, scripts[0]);
};

// Cookie用 chrome V3
const execCookie = (jsoncookie: Jsoncookie) => {
  console.log('IE以外だよ');
  console.log(location.search);

  // V3をcookieに保存する
  let result: boolean = cookies.setItem('v3', jsoncookie.v3, 0, './', '', true);

  // iframeで遷移する
  window.location.replace(jsoncookie.rurl);
};

// SDK用

/**
 * ブラウザ別に処理を分ける
 */
const browsers: Browser = {
  ie: (jsoncookie: Jsoncookie) => {
    execImgElement(jsoncookie);
  },
  edge: (jsoncookie: Jsoncookie) => {
    execImgElement(jsoncookie);
  },
  chrome: (jsoncookie: Jsoncookie) => {
    execCookie(jsoncookie);
  },
  firefox: (jsoncookie: Jsoncookie) => {
    execCookie(jsoncookie);
  },
  opera: (jsoncookie: Jsoncookie) => {
    execCookie(jsoncookie);
  },
  safari: (jsoncookie: Jsoncookie) => {
    execCookie(jsoncookie);
  },
  // tslint:disable-next-line:no-empty
  itp_safari: (jsoncookie: Jsoncookie) => {},
  // tslint:disable-next-line:no-empty
  unknown: (jsoncookie: Jsoncookie) => {},
};

async function exec() {
  // json取得
  let urlQuerry: string = location.search;
  let decodeUrlQuerry: string = decodeURIComponent(urlQuerry);
  let [urlKey, urlValue] = decodeUrlQuerry.split('?url=');
  console.log('?url = ' + urlValue);

  let jsoncookie: Jsoncookie = await getJson(urlValue);
  console.log(jsoncookie);

  // // 端末とOS別の対応
  browsers[browser.ck()](jsoncookie);
}

/**
 * 2回目のxhr送信（アクセスログ設定 + isへ飛ばす際のJSON取得）
 * @param urlValue
 */
async function getJson(urlValue: string): Promise<any> {
  return axios
    .get(urlValue)
    .then(resdata => resdata.data)
    .catch(err => console.log(err));
}

/**
 * iframeでの役割
 * 
 */
(() => {
  console.log(`document.hiddenの結果：：${document.hidden}`);
  
  // isspへアクセス
  console.log('=== cookie start === ');
  exec();
  console.log('=== cookie  end === ');
})();
