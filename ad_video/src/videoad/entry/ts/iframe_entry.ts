import axios from 'axios';
import { Jsoncookie } from '../../service/jsoncookie';

// IEでPromiseを利用する為に利用
// tslint:disable-next-line:no-var-requires
require('es6-promise').polyfill();

/**
 * hへアクセス
 * 1.hへのアクセス
 * 2.
 * 3.
 */
(() => {
  console.log('=== send_is start === ');
  exec();
  console.log('=== send_is end === ');
})();

async function exec() {
  let data: Jsoncookie = await getJson();
  console.table(data);
  // const url: string = `../../send_m/html/fm.html?rk=${data.key}`;
  // let iframeElement: HTMLIFrameElement = tag.mkIframeElementForTracking(url, '0', '0', 'none');

  // let divElement: HTMLElement = document.getElementById('atv_re_send_h_is');
  // divElement.parentNode.insertBefore(iframeElement, divElement);
}

/**
 * 2回目のxhr送信（アクセスログ設定 + isへ飛ばす際のJSON取得）
 */
async function getJson(): Promise<any> {
  let urlQuerry: string = location.search.substring(1);

  let decodeUrlQuerry: string = decodeURIComponent(urlQuerry);
  let [key, url] = decodeUrlQuerry.split('url=');

  console.log(url);

  return axios
    .get(url)
    .then(resdata => resdata.data)
    .catch(err => console.log(err));
}
