import * as Rx from 'rxjs';
import * as axios from 'axios';
import { browser } from '../../service/browser';
import { tag } from '../../service/tag';
import { cookies } from './cookies';

// IEでPromiseを利用する為に利用
// tslint:disable-next-line:no-var-requires
require('es6-promise').polyfill();

const setEvent = (): void => {
  window.addEventListener('load', () => {
    let cookieValue = cookies.getCookie('test');

    if (cookieValue !== null) {
      window.location.replace(cookieValue);
    } else {
      console.log(`cookieValueは${cookieValue}です。`)
    }
  });
};

console.log('起動します＋＋＋＋＋＋＋＋＋');

const domain: string = 'http://10.10.15.61:3000';
const ua: string = browser.ck(window.navigator.userAgent.toLowerCase());
if ('ie' === ua || 'edge' === ua) {
  // イベント追加
  setEvent();

  // imgを作成 + 設定
  const imgTag: HTMLImageElement = tag.mkImageTag(`${domain}/getImage`);
  const scripts = document.getElementsByTagName('script');
  scripts[0].parentNode.insertBefore(imgTag, scripts[0]);
}

if ('safari' === ua || 'firefox' === ua || 'chrome' === ua || 'opera' || ua) {
  location.search
    .substring(1)
    .split('&')
    .filter(query => query.substring(0, 3) === 'rk=')
    .forEach(query => {
      const [rkKey, rkValue]: string[] = query.split('=');
      Rx.from(axios.default.get(`${domain}/click_part2?${rkKey}=${rkValue}`))
        .subscribe(
        resdata => window.location.replace(resdata.data.url),
        err => console.log(err)
         );
    });
}

// 多分partner側で確認すると思う。。。
if ('safari_itp' === ua || 'unknown' === ua) {
  // 処理なし
}
