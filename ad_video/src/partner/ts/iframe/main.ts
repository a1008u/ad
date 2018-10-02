import { ElementFactory } from './service/Factory/ElementFactory';
import { Jsontype } from '../../../service/jsontype';

((window, _) => {
  // url取得のクエリチェック
  let query: string = location.search.substring(1);
  let [key, value]: string[] = query.split('=');

  if (key === 'atvJson') {
    let json: Jsontype = JSON.parse(decodeURIComponent(value));
    console.log(json);
    ElementFactory.mkElement(json);
  }
})(window);
