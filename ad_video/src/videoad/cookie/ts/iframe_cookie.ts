import * as Rx from 'rxjs';
import axios from 'axios';
import { cookies } from './cookies';
import { tag } from '../../service/tag';
import { browser } from '../../service/browser';

// IEでPromiseを利用する為に利用
// tslint:disable-next-line:no-var-requires
require('es6-promise').polyfill();

const setEvent = (cookieKey: string = 'test'): void => {
  window.addEventListener('load', () => {
    let cookieValue = cookies.getCookie(cookieKey);

    if (cookieValue !== null) {
      window.location.replace(cookieValue);
    } else {
      console.log(`cookieValueは${cookieValue}です。`);
    }
  });
};

// IMGタグ用 IE p -> h -> is -> Lp
const doCookie = (domain: string) => {

  console.log('IEだよ')

  // イベント追加
  setEvent();
  // imgを作成 + 設定
  const imgTag: HTMLImageElement = tag.mkImageTag(`${domain}/getImage`);
  const scripts = document.getElementsByTagName('script');
  scripts[0].parentNode.insertBefore(imgTag, scripts[0]);
};

// Cookie用 chrome V3
const doJson = (domain: string) => {

  console.log('IE以外だよ')
  console.log(location.search);

  location.search
    .substring(1)
    .split('&')
    .filter(query => query.substring(0, 3) === 'rk=')
    .forEach(query => {
      const [rkKey, rkValue]: string[] = query.split('=');
      Rx.from(axios.get(`${domain}/click_part2?${rkKey}=${rkValue}`)).subscribe(
        resdata => {
          // iframe作成
          window.location.replace(resdata.data.url);

          // replacueダメかも。。。
          

          // setCookieをする
        }, err => console.log(err)
      );
    });
};

// SDK用

/**
 * ブラウザ別に処理を分ける
 */
const browsers: Browser = {
  ie: (domain: string) => {
    doCookie(domain);
  },
  edge: (domain: string) => {
    doCookie(domain);
  },
  chrome: (domain: string) => {
    doJson(domain);
  },
  firefox: (domain: string) => {
    doJson(domain);
  },
  opera: (domain: string) => {
    doJson(domain);
  },
  safari: (domain: string) => {
    doJson(domain);
  },
  // tslint:disable-next-line:no-empty
  itp_safari: (domain: string) => {},
  // tslint:disable-next-line:no-empty
  unknown: (domain: string) => {}
};

/**
 * iframeでの役割
 * 1.hへのアクセス
 * 2.
 * 3.
 */
(() => {
  console.log(`document.hiddenの結果：：${document.hidden}`);
  const domain: string = 'http://10.10.15.44:3000';

  // isspへアクセス
  console.log('=== send_m start === ');
  exec(domain);
  console.log('=== send_m  end === ');
})();

async function exec(domain) {
  // json取得
  let rk: string = location.search.substring(1);
  let data = await getJson(domain, rk);
  console.log(data.key);

  // 端末とOS別の対応
  browsers[browser.ck()](domain);
}

/**
 * 2回目のxhr送信（アクセスログ設定 + isへ飛ばす際のJSON取得）
 * @param domain 
 * @param rkValue 
 */
async function getJson(domain: string, rkValue: string): Promise<any> {
  return axios
    .get(`${domain}/issp?rk=${rkValue}`)
    .then(resdata => resdata.data)
    .catch(err => console.log(err));
}