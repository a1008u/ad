import * as Rx from 'rxjs';
import * as axios from 'axios';
import { browser } from '../../service/browser';
import { tag } from '../../service/tag';
import { cookies } from './cookies';

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

const doCookie = (domain: string) => {
  // イベント追加
  setEvent();
  // imgを作成 + 設定
  const imgTag: HTMLImageElement = tag.mkImageTag(`${domain}/getImage`);
  const scripts = document.getElementsByTagName('script');
  scripts[0].parentNode.insertBefore(imgTag, scripts[0]);
};

const doJson = (domain: string) => {
  location.search
    .substring(1)
    .split('&')
    .filter(query => query.substring(0, 3) === 'rk=')
    .forEach(query => {
      const [rkKey, rkValue]: string[] = query.split('=');
      Rx.from(
        axios.default.get(`${domain}/click_part2?${rkKey}=${rkValue}`)
      ).subscribe(
        resdata => window.location.replace(resdata.data.url),
        err => console.log(err)
      );
    });
};

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
  unknown: (domain: string) => {},
};

(() => {
  console.log('起動します＋＋＋＋＋＋＋＋＋');
  const domain: string = 'http://192.168.1.6:3000';
  browsers[browser.ck()](domain);
})();
