import * as Rx from 'rxjs';
import * as axios from 'axios';

let query: string = location.search.substring(1);
let params: string[] = query.split('&');

for (let param of params) {
  console.log('起動します＋＋＋＋＋＋＋＋＋');

  // Rx.from(axios.default.get('https://jsonplaceholder.typicode.com/todos/1'))
  //   .subscribe(
  //     resdata => console.log(resdata..data)
  //     , err => console.log(err)
  //   );

    Rx.from(axios.default.post('http://10.10.5.32:8081/at/m/sreport_for_api.do?pass_key=68e48c0cd10659a16756f0c99bd6752c&from_year=2012&from_month=08&from_day=01&to_year=2012&to_month=08&to_day=31&summary_type=0&mid=459665&response_type=1&priceCutFlag=1'))
    .subscribe(
      resdata => console.log(resdata.data)
      , err => console.log(err)
    );

  let p = param.indexOf('=');
  if (p >= 0) {
    if (param.substring(0, p) == 'rk') {
      let rk: string = decodeURIComponent(param.substring(p + 1));

      // RXに変換
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            let jx = JSON.parse(xhr.responseText);
            console.log(jx);
            // location.replace(jx.url);
          }
        }
      };
      xhr.open('GET', '/clickx?rk=' + rk, true);
      xhr.send(null);
      break;
    }
  }
}
