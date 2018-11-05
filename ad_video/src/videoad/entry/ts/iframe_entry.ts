import axios from 'axios';
import { Jsonentry } from '../../service/jsonentry';
import { tag } from '../../service/tag';

// IEでPromiseを利用する為に利用
// tslint:disable-next-line:no-var-requires
require('es6-promise').polyfill();

/**
 * clickしたことを伝えるよ
 * 今度は、トラッキングの本ちゃんへ
 */
(() => {
  console.log('=== entry start === ');
  exec();
})();

async function exec() {
  let data: Jsonentry = await getJson();
  console.log(data);
  const url: string = `${data.vh_frame_url}?url=${encodeURIComponent(data.rurl)}`;
  console.log(url);
  let iframeElement: HTMLIFrameElement = tag.mkIframeElementForTracking(url, '0', '0', 'none');

  let divElement: HTMLElement = document.getElementById('atv_cookie_space');
  divElement.parentNode.insertBefore(iframeElement, divElement);
  console.log('===entry end === ');
}

/**
 * 2回目のxhr送信（アクセスログ設定 + isへ飛ばす際のJSON取得）
 */
async function getJson(): Promise<any> {
  let urlQuerry: string = location.search.substring(1);

  let decodeUrlQuerry: string = decodeURIComponent(urlQuerry);
  let [urlKey, urlValue] = decodeUrlQuerry.split('url=');

  console.log('urlValue ' + urlValue);

  return axios
    .get(urlValue)
    .then(resdata => resdata.data)
    .catch(err => console.log(err));
}
