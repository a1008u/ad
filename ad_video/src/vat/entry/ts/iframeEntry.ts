import { Entry } from './entry';

// IEでPromiseを利用する為に利用
// tslint:disable-next-line:no-var-requires
// require('es6-promise').polyfill();

import 'ts-polyfill/lib/es2015-promise';

/**
 * clickしたことを伝えるよ
 * 今度は、トラッキングの本ちゃんへ
 */
(async () => {
  const entry: Entry = new Entry();
  await entry.exec();
})();
