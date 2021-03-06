import { Jsontype } from '../../service/class/jsontype';
import { ElementFactory } from './service/Factory/ElementFactory';

import 'ts-polyfill/lib/es2015-promise';
// import 'ts-polyfill';

/**
 * videoAdのメイン処理
 * □処理概要
 *  クエリからJsonを生成して、videoAdを表示させる
 */
export namespace iframeAtvad {
  export const mkVideoAd = () => {
    const query: string = location.search.substring(1);
    const [key, jsonValue]: string[] = query.split('=');
    if (key === 'atvJson') {
      const json: Jsontype = JSON.parse(decodeURIComponent(jsonValue));
      ElementFactory.mkElement(json);
    }
  };
}

/**
 * メイン処理（即時実行）
 */
((window, _) => iframeAtvad.mkVideoAd())(window);
