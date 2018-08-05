import * as Rx from 'rxjs';
import * as axios from 'axios';
import {browser} from "../../service/browser";
import {tag} from "../../service/tag";

// let querys: string[] = location.search.substring(1).split('&');
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

let ua: string = browser.ck(window.navigator.userAgent.toLowerCase());
if('ie' === ua || 'edge' === ua) {
    // imgタグ生成
    let imgTag: HTMLImageElement = tag.mkImageTag();

    // イベント追加

    // imgを設定 TODO:（設定箇所を確認）
    let scripts = document.getElementsByTagName('script');
    scripts[0]
        .parentNode
        .insertBefore(imgTag, scripts[0]);
}

if('safari' === ua || 'firefox' === ua || 'chrome' === ua || 'opera' || ua) {
    location.search.substring(1)
        .split('&')
        .filter(query => query.substring(0, 3) === 'rk=')
        .forEach(query => {
            let [rkKey , rkValue]: string[] = query.split('=');
            Rx.from(axios.default.get(`http://localhost:3000/click_part2?${rkKey}=${rkValue}`))
                .subscribe(
                    resdata => location.replace(resdata.data.url)
                    , err => console.log(err)
                );
        });
}


if('safari_itp' === ua || 'unknown' === ua) {
    // 処理なし
}

