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
  const iframeCookie: IframeCookie = new IframeCookie();
  await iframeCookie.exec();
})();
