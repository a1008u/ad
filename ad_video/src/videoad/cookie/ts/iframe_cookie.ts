import axios from 'axios';
import { cookies } from './cookies';
import { tag } from '../../service/tag';
import { browser } from '../../service/browser';
import { Browser } from './Browser';
import { Jsoncookie } from '../../service/class/jsoncookie';
import { IframeCookie } from './IframeCookie';

// IEでPromiseを利用する為に利用
// tslint:disable-next-line:no-var-requires
// require('es6-promise').polyfill();

/**
 * iframeでの役割
 *
 */
(async () => {
  // isspへアクセス
  console.log('=== cookie start === ');
  const iframeCookie: IframeCookie = new IframeCookie();
  await iframeCookie.exec();
  console.log('=== cookie  end === ');
})();
