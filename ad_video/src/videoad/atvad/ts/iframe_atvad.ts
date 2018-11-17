import '../css/index.css';
import { Jsontype } from '../../service/class/jsontype';
import { ElementFactory } from './service/Factory/ElementFactory';
require('es6-promise').polyfill();

((window, _) => {
  // url取得のクエリチェック
  let query: string = location.search.substring(1);
  console.log(query);
  let [key, value]: string[] = query.split('=');

  // videoタグ表示処理を行う
  if (key === 'atvJson') {
    let json: Jsontype = JSON.parse(decodeURIComponent(value));
    ElementFactory.mkElement(json);
  }
})(window);
