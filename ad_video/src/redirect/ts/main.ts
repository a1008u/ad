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

const exec = (browser: string) => {
    const domain: string = 'http://192.168.1.6:3000';
    if ('ie' === browser || 'edge' === browser) {

        // イベント追加
        setEvent();

        // imgを作成 + 設定
        const imgTag: HTMLImageElement = tag.mkImageTag(`${domain}/getImage`);
        const scripts = document.getElementsByTagName('script');
        scripts[0].parentNode.insertBefore(imgTag, scripts[0]);
    }

    if ('safari' === browser || 'firefox' === browser || 'chrome' === browser || 'opera' === browser) {
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
    }

    // 多分partner側で確認すると思う。。。
    if ('itp_safari' === browser || 'unknown' === browser) {
        // 処理なし
    }
};

(()=>{
    console.log('起動します＋＋＋＋＋＋＋＋＋');
    exec(browser.ck());
})();
