import '../css/index.css';
import { Jsontype } from '../../service/jsontype';
import { ElementFactory } from './service/Factory/ElementFactory';


((window, _) => {
  // url取得のクエリチェック
  let query: string = location.search.substring(1);
  console.log(query);
  let [key, value]: string[] = query.split('=');

  // videoタグ表示処理を行う
  if (key === 'atvJson') {
    let json: Jsontype = JSON.parse(decodeURIComponent(value));
    console.table(json);
    ElementFactory.mkElement(json);
  }
})(window);
