let query: string = location.search.substring(1);
let params: string[] = query.split("&");

for(let param of params) {
    console.log("起動します＋＋＋＋＋＋＋＋＋");
    let p = param.indexOf("=");
    if (p >= 0) {
        if (param.substring(0, p) == "rk") {
            let rk: string = decodeURIComponent(param.substring(p + 1));

            // RXに変換
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () =>  {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        let jx = JSON.parse(xhr.responseText);
                        console.log(jx);
                        // location.replace(jx.url);
                    }
                }
            };
            xhr.open("GET", "/clickx?rk="+rk, true);
            xhr.send(null);
            break;
        }
    }
}
