import { Entry } from './entry';

// IEでPromiseを利用する為に利用
// tslint:disable-next-line:no-var-requires
// require('es6-promise').polyfill();

/**
 * clickしたことを伝えるよ
 * 今度は、トラッキングの本ちゃんへ
 */
(async () => {
  console.log('=== entry start === ');
  const entry: Entry = new Entry();
  await entry.exec();
  console.log('===entry end === ');
})();