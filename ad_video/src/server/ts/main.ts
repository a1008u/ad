import app from './app';
import * as Express from 'express';
import * as path from 'path';
import * as fs from 'fs';
import { jsontype, Jsontype } from '../../videoad/service/jsontype';

import * as https from 'https';
import { Jsonentry } from '../../videoad/service/jsonentry';
import { Jsoncookie } from '../../videoad/service/jsoncookie';

// POSTパラメータをJSONで取得するにはbody-parserを使う。

const PORT = 3000;
const ROOT = '/';

app.get(ROOT, (req: Express.Request, res: Express.Response) => {
  console.log(path.join(__dirname, 'statics'));
  console.log(req.baseUrl);
  res.send('Hello world.');
});


const domain = 'https://10.10.15.85:3000';

/**
 * 0回目のxhr用のAPI imp用
 */
app.get('/imp', (req: Express.Request, res: Express.Response) => {
  const query: string = req.query.rk;
  console.log('rkは[' + query + ']');

  const json = {'key': 'okImp'};
  res.json(json);
  res.end();
});

/**
 * 1回目のxhr用のAPI
 */
app.get('/sp/vad.json', (req: Express.Request, res: Express.Response) => {
  const videoframeurl: string = `${domain}/videoad/atvad/html/iframe_atvad.html`;
  const entryyframeurl: string = `${domain}/videoad/entry/html/iframe_entry.html`;
  const impurl: string = `${domain}/imp`;

  let mkJson = (rk: string) => {
    switch (rk) {
      case '010011a1':
        return new Jsontype(
          `${domain}/videoad/atvad/mp4/ba1.mp4`,
          'ここは表示しません',
          `${domain}/click?rk=010011a1`,
          '180',
          '320',
          '10',
          'ここは表示しません',
          '010011a1',
          videoframeurl,
          entryyframeurl,
          impurl);
      case '010011a2':
        return new Jsontype(
          `${domain}/videoad/atvad/mp4/ba2.mp4`,
          'ここは表示しません',
          `${domain}/click?rk=010011a2`,
          '180',
          '320',
          '20',
          'ここは表示しません',
          '010011a2',
          videoframeurl,
          entryyframeurl,
          impurl);
      case '010011a3':
        return new Jsontype(
          `${domain}/videoad/atvad/mp4/ba3.mp4`,
          'ここは表示しません',
          `${domain}/click?rk=010011a3`,
          '180',
          '320',
          '5',
          'ここは表示しません',
          '010011a3',
          videoframeurl,
          entryyframeurl,
          impurl);
      case '010011a4':
        return new Jsontype(
          `${domain}/videoad/atvad/mp4/ba4.mp4`,
          'ここは表示しません',
          `${domain}/click?rk=010011a4`,
          '180',
          '320',
          '8',
          'ここは表示しません',
          '010011a4',
          videoframeurl,
          entryyframeurl,
          impurl);
      case '010011a5':
        return new Jsontype(
          `${domain}/videoad/atvad/mp4/ba5.mp4`,
          'ここは表示しません',
          `${domain}/click?rk=010011a5`,
          '180',
          '320',
          '8',
          'ここは表示しません',
          '010011a5',
          videoframeurl,
          entryyframeurl,
          impurl);
      case '010011a6':
        return new Jsontype(
          `${domain}/videoad/atvad/mp4/ba6.mp4`,
          'ここは表示しません',
          `${domain}/click?rk=010011a6`,
          '180',
          '320',
          '8',
          'ここは表示しません',
          '010011a6',
          videoframeurl,
          entryyframeurl,
          impurl);
      case '010011a7':
        return new Jsontype(
          `${domain}/videoad/atvad/mp4/ba7.mp4`,
          'ここは表示しません',
          `${domain}/click?rk=010011a7`,
          '180',
          '320',
          '8',
          'ここは表示しません',
          '010011a7',
          videoframeurl,
          entryyframeurl,
          impurl);
      case '010011a8':
        return new Jsontype(
          `${domain}/videoad/atvad/mp4/ba8.mp4`,
          'MARVEL - INFINITY WAR -',
          `${domain}/click?rk=010011a8`,
          '180',
          '320',
          '0',
          '全容を今すぐ確認',
          '010011a8',
          videoframeurl,
          entryyframeurl,
          impurl);
      case '010011a9':
        return new Jsontype(
          `${domain}/videoad/atvad/mp4/ba9.mp4`,
          'FF零式　- OP特典　- ',
          `${domain}/click?rk=010011a9`,
          '180',
          '320',
          '0',
          'インストール',
          '010011a9',
          videoframeurl,
          entryyframeurl,
          impurl);
      case '010011a10':
        return new Jsontype(
          `${domain}/videoad/atvad/mp4/ba10.mp4`,
          'FF零式　- OP特典　- ',
          `${domain}/click?rk=010011a10`,
          '180',
          '320',
          '0',
          '詳細はこちら',
          '010011a10',
          videoframeurl,
          entryyframeurl,
          impurl);
      case '010011a11':
        return new Jsontype(
          `${domain}/videoad/atvad/mp4/ba11.mp4`,
          'KH2.8　- OP特典　- ',
          `${domain}/click?rk=010011a11`,
          '180',
          '320',
          '0',
          '詳細はこちら',
          '010011a11',
          videoframeurl,
          entryyframeurl,
          impurl);
      case '010011a12':
        return new Jsontype(
          `${domain}/videoad/atvad/mp4/ba12.mp4`,
          'KH3　- 主題歌「誓い」　- ',
          `${domain}/click?rk=010011a12`,
          '180',
          '320',
          '0',
          'インストール',
          '010011a12',
          videoframeurl,
          entryyframeurl,
          impurl);
      case '010011a1_pc':
        return new Jsontype(
          `${domain}/videoad/atvad/mp4/ba1.mp4`,
          'ここは表示しません',
          `${domain}/click?rk=010011a1_pc`,
          '360',
          '640',
          '10',
          'ここは表示しません',
          '010011a1_pc',
          videoframeurl,
          entryyframeurl,
          impurl);
      case '010011a2_pc':
        return new Jsontype(
          `${domain}/videoad/atvad/mp4/ba2.mp4`,
          'ここは表示しません',
          `${domain}/click?rk=010011a2_pc`,
          '360',
          '640',
          '10',
          'ここは表示しません',
          '010011a2_pc',
          videoframeurl,
          entryyframeurl,
          impurl);
      case '010011a3_pc':
        return new Jsontype(
          `${domain}/videoad/atvad/mp4/ba3.mp4`,
          'ここは表示しません',
          `${domain}/click?rk=010011a3_pc`,
          '360',
          '640',
          '10',
          'ここは表示しません',
          '010011a3_pc',
          videoframeurl,
          entryyframeurl,
          impurl);
      case '010011a4_pc':
        return new Jsontype(
          `${domain}/videoad/atvad/mp4/ba5.mp4`,
          'ここは表示しません',
          `${domain}/click?rk=010011a4_pc`,
          '360',
          '640',
          '10',
          'ここは表示しません',
          '010011a4_pc',
          videoframeurl,
          entryyframeurl,
          impurl);
      case '010011a5_pc':
        return new Jsontype(
          `${domain}/videoad/atvad/mp4/ba5.mp4`,
          'FF15 - 新作 - ',
          `${domain}/click?rk=010011a5_pc`,
          '360',
          '640',
          '0',
          'ボタン',
          '010011a5_pc',
          videoframeurl,
          entryyframeurl,
          impurl);
      case '010011a6_pc':
        return new Jsontype(
          `${domain}/videoad/atvad/mp4/ba6.mp4`,
          'ここは表示しません',
          `${domain}/click?rk=010011a6_pc`,
          '360',
          '640',
          '10',
          'ここは表示しません',
          '010011a6_pc',
          videoframeurl,
          entryyframeurl,
          impurl);
      case '010011a7_pc':
        return new Jsontype(
          `${domain}/videoad/atvad/mp4/ba7.mp4`,
          'ここは表示しません',
          `${domain}/click?rk=010011a7_pc`,
          '360',
          '640',
          '8',
          'ここは表示しません',
          '010011a7_pc',
          videoframeurl,
          entryyframeurl,
          impurl);
      case '010011a8_pc':
        return new Jsontype(
          `${domain}/videoad/atvad/mp4/ba8.mp4`,
          'MARVEL - INFINITY WAR -',
          `${domain}/click?rk=010011a8_pc`,
          '360',
          '640',
          '0',
          '全容を今すぐ確認',
          '010011a8_pc',
          videoframeurl,
          entryyframeurl,
          impurl);
      case '010011a9_pc':
        return new Jsontype(
          `${domain}/videoad/atvad/mp4/ba9.mp4`,
          'FF零式　- OP特典　- ',
          `${domain}/click?rk=010011a9_pc`,
          '360',
          '640',
          '0',
          'インストール',
          '010011a9_pc',
          videoframeurl,
          entryyframeurl,
          impurl);
      case '010011a10_pc':
        return new Jsontype(
          `${domain}/videoad/atvad/mp4/ba10.mp4`,
          'FF零式　- OP特典　- ',
          `${domain}/click?rk=010011a10_pc`,
          '360',
          '640',
          '0',
          '詳細はこちら',
          '010011a10_pc',
          videoframeurl,
          entryyframeurl,
          impurl);
      case '010011a11_pc':
        return new Jsontype(
          `${domain}/videoad/atvad/mp4/ba11.mp4`,
          'KH2.8　- OP特典　- ',
          `${domain}/click?rk=010011a11_pc`,
          '360',
          '640',
          '0',
          '詳細はこちら',
          '010011a11_pc',
          videoframeurl,
          entryyframeurl,
          impurl);
      case '010011a12_pc':
        return new Jsontype(
          `${domain}/videoad/atvad/mp4/ba12.mp4`,
          'KH3　- 主題歌「誓い」　- ',
          `${domain}/click?rk=010011a12_pc`,
          '360',
          '640',
          '0',
          'インストール',
          '010011a12_pc',
          videoframeurl,
          entryyframeurl,
          impurl);
    }
  };

  const atvrk: string = req.query.rk;
  const jsontype: Jsontype = mkJson(atvrk);
  res.json(jsontype);
  res.end();
});

/**
 * 2回目のxhr用のAPI
 */
app.get('/click', (req: Express.Request, res: Express.Response) => {
  const query: string = req.query.rk;
  console.log('rkは[' + query + ']');

  const jsoncookie: Jsonentry = new Jsonentry(
    'true',
    'z4361737039', // n
    '01005gtr000005', // rk
    `${domain}/cookie?rk=01005gtr000005`, // rurlです 利用 iframe_url + url= rurl
    'f3a42d90657264333bb4880f59055aed',
    `${domain}/videoad/cookie/html/iframe_cookie.html` // iframe_url
  );
  res.json(jsoncookie);
  res.end();
});

/**
 * 3回目のxhr用のAPI
 */
app.get('/cookie', (req: Express.Request, res: Express.Response) => {
  const query: string = req.query.rk;
  console.log('rkは[' + query + ']');

  const jsoncookie: Jsoncookie = new Jsoncookie(
    `${domain}/atvad/html/lp.html`, // rurlです 利用 iframe_url + url= rurl
    'thanku0001',
    `${domain}/ts.jpg`,
    `/videoad/cookie`
  );
  res.json(jsoncookie);
  res.end();
});

// IE用
app.get('/image', (req: Express.Request, res: Express.Response) => {
  console.log(' ===== IE用 ====== ');
  console.log(req.query.rurl);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.cookie('test', 'rurl=' + req.query.rurl, {
    maxAge: 60000,
  });
  fs.readFile('ts.jpg', (_, data) => {
    res.set('Content-Type', 'image/jpeg');
    res.send(data);
    res.end();
  });
  
});

const options = {
  key : fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
};

let server = https.createServer(options, app);

// ルート設定
app.get('/', (req, res) => {
  res.writeHead(200);
  console.log(path.join(__dirname, 'statics'));
  console.log(req.baseUrl);
  res.end("Hello World.");
});

// イベント待機
server.listen(3000);
