import * as Rx from 'rxjs';
import * as axios from 'axios';

let querys: string[] = location.search.substring(1).split('&');
// for (let query of querys) {
//   console.log('起動します＋＋＋＋＋＋＋＋＋');
//
//   // ie,edge -> imgタグ生成
//   // firefox chrome -> rx + axiosで通信
//   // safari -> 何もしない
//
//   let p = query.indexOf('=');
//   if (p >= 0) {
//       if (query.substring(0, p) === 'rk') {
//           let rk: string = decodeURIComponent(query.substring(p + 1));
//
//           Rx.from(axios.default.get('http://localhost:3000/click_part2?rk=' + rk))
//             .subscribe(
//                 resdata => location.replace(resdata.data.url)
//                 , err => console.log(err)
//             );
//       }
//   }
// }

console.log('起動します＋＋＋＋＋＋＋＋＋');
location.search.substring(1).split('&')
    .filter(query => query.includes('rk'))
    .forEach(query => {
      let [_ , rkValue]: string[] = query.split('=');
      Rx.from(axios.default.get(`http://localhost:3000/click_part2?rk=${rkValue}`))
        .subscribe(
            resdata => location.replace(resdata.data.url)
            , err => console.log(err)
        );
    });
