import app from './app';
import * as Express from 'express';
import * as path from 'path';
import * as fs from 'fs';
import { jsontype, Jsontype } from '../../videoad/service/jsontype';

import * as https from 'https';

// POSTパラメータをJSONで取得するにはbody-parserを使う。

const PORT = 3000;
const ROOT = '/';

app.get(ROOT, (req: Express.Request, res: Express.Response) => {
  console.log(path.join(__dirname, 'statics'));
  console.log(req.baseUrl);
  res.send('Hello world.');
});


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

  const videoframeurl: string = 'https//localhost:3000/videoad/atvad/html/iframe_atvad.html';
  const entryyframeurl: string = 'https//localhost:3000/videoad/entry/html/iframe_entry.html';
  const domain = 'https://localhost:3000';

  let mkJson = (rk: string) => {
    switch (rk) {
      case '010011a1':
        return new Jsontype(
          `${domain}/videoad/atvad/mp4/ba1.mp4`,
          'ここは表示しません',
          'https://www.google.com',
          '180',
          '320',
          '10',
          'ここは表示しません',
          videoframeurl,
          entryyframeurl);
      case '010011a2':
        return new Jsontype(
          `${domain}/videoad/atvad/mp4/ba2.mp4`,
          'ここは表示しません',
          'https://www.google.com',
          '180',
          '320',
          '20',
          'ここは表示しません',
          videoframeurl,
          entryyframeurl);
      case '010011a3':
        return new Jsontype(
          `${domain}/videoad/atvad/mp4/ba3.mp4`,
          'ここは表示しません',
          'https://www.google.com',
          '180',
          '320',
          '5',
          'ここは表示しません',
          videoframeurl,
          entryyframeurl);
      case '010011a4':
        return new Jsontype(
          `${domain}/videoad/atvad/mp4/ba4.mp4`,
          'ここは表示しません',
          'https://www.google.com',
          '180',
          '320',
          '8',
          'ここは表示しません',
          videoframeurl,
          entryyframeurl);
      case '010011a5':
        return new Jsontype(
          `${domain}/videoad/atvad/mp4/ba5.mp4`,
          'ここは表示しません',
          'https://www.google.com',
          '180',
          '320',
          '8',
          'ここは表示しません',
          videoframeurl,
          entryyframeurl);
      case '010011a6':
        return new Jsontype(
          `${domain}/videoad/atvad/mp4/ba6.mp4`,
          'ここは表示しません',
          'https://www.google.com',
          '180',
          '320',
          '8',
          'ここは表示しません',
          videoframeurl,
          entryyframeurl);
      case '010011a7':
        return new Jsontype(
          `${domain}/videoad/atvad/mp4/ba7.mp4`,
          'ここは表示しません',
          'https://www.google.com',
          '180',
          '320',
          '8',
          'ここは表示しません',
          videoframeurl,
          entryyframeurl);
      case '010011a8':
        return new Jsontype(
          `${domain}/videoad/atvad/mp4/ba8.mp4`,
          'MARVEL - INFINITY WAR -',
          'https://www.google.com',
          '180',
          '320',
          '0',
          '全容を今すぐ確認',
          videoframeurl,
          entryyframeurl);
      case '010011a9':
        return new Jsontype(
          `${domain}/videoad/atvad/mp4/ba9.mp4`,
          'FF零式　- OP特典　- ',
          'https://www.google.com',
          '180',
          '320',
          '0',
          'インストール',
          videoframeurl,
          entryyframeurl);
      case '010011a10':
        return new Jsontype(
          `${domain}/videoad/atvad/mp4/ba10.mp4`,
          'FF零式　- OP特典　- ',
          'https://www.google.com',
          '180',
          '320',
          '0',
          '詳細はこちら',
          videoframeurl,
          entryyframeurl);
      case '010011a11':
        return new Jsontype(
          `${domain}/videoad/atvad/mp4/ba11.mp4`,
          'KH2.8　- OP特典　- ',
          'https://www.google.com',
          '180',
          '320',
          '0',
          '詳細はこちら',
          videoframeurl,
          entryyframeurl);
      case '010011a12':
        return new Jsontype(
          `${domain}/videoad/atvad/mp4/ba12.mp4`,
          'KH3　- 主題歌「誓い」　- ',
          'https://www.google.com',
          '180',
          '320',
          '0',
          'インストール',
          videoframeurl,
          entryyframeurl);
      case '010011a1_pc':
        return new Jsontype(
          `${domain}/videoad/atvad/mp4/ba1.mp4`,
          'ここは表示しません',
          'https://www.google.com',
          '360',
          '640',
          '10',
          'ここは表示しません',
          videoframeurl,
          entryyframeurl);
      case '010011a2_pc':
        return new Jsontype(
          `${domain}/videoad/atvad/mp4/ba2.mp4`,
          'ここは表示しません',
          'https://www.google.com',
          '360',
          '640',
          '10',
          'ここは表示しません',
          videoframeurl,
          entryyframeurl);
      case '010011a3_pc':
        return new Jsontype(
          `${domain}/videoad/atvad/mp4/ba3.mp4`,
          'ここは表示しません',
          'https://www.google.com',
          '360',
          '640',
          '10',
          'ここは表示しません',
          videoframeurl,
          entryyframeurl);
      case '010011a4_pc':
        return new Jsontype(
          `${domain}/videoad/atvad/mp4/ba5.mp4`,
          'ここは表示しません',
          'https://www.google.com',
          '360',
          '640',
          '10',
          'ここは表示しません',
          videoframeurl,
          entryyframeurl);
      case '010011a5_pc':
        return new Jsontype(
          `${domain}/videoad/atvad/mp4/ba5.mp4`,
          'FF15 - 新作 - ',
          'https://www.google.com',
          '360',
          '640',
          '0',
          'ボタン',
          videoframeurl,
          entryyframeurl);
      case '010011a6_pc':
        return new Jsontype(
          `${domain}/videoad/atvad/mp4/ba6.mp4`,
          'ここは表示しません',
          'https://www.google.com',
          '360',
          '640',
          '10',
          'ここは表示しません',
          videoframeurl,
          entryyframeurl);
      case '010011a7_pc':
        return new Jsontype(
          `${domain}/videoad/atvad/mp4/ba7.mp4`,
          'ここは表示しません',
          'https://www.google.com',
          '360',
          '640',
          '8',
          'ここは表示しません',
          videoframeurl,
          entryyframeurl);
      case '010011a8_pc':
        return new Jsontype(
          `${domain}/videoad/atvad/mp4/ba8.mp4`,
          'MARVEL - INFINITY WAR -',
          'https://www.google.com',
          '360',
          '640',
          '0',
          '全容を今すぐ確認',
          videoframeurl,
          entryyframeurl);
      case '010011a9_pc':
        return new Jsontype(
          `${domain}/videoad/atvad/mp4/ba9.mp4`,
          'FF零式　- OP特典　- ',
          'https://www.google.com',
          '360',
          '640',
          '0',
          'インストール',
          videoframeurl,
          entryyframeurl);
      case '010011a10_pc':
        return new Jsontype(
          `${domain}/videoad/atvad/mp4/ba10.mp4`,
          'FF零式　- OP特典　- ',
          'https://www.google.com',
          '360',
        '640',
          '0',
          '詳細はこちら',
          videoframeurl,
          entryyframeurl);
      case '010011a11_pc':
        return new Jsontype(
          `${domain}/videoad/atvad/mp4/ba11.mp4`,
          'KH2.8　- OP特典　- ',
          'https://www.google.com',
          '360',
          '640',
          '0',
          '詳細はこちら',
          videoframeurl,
          entryyframeurl);
      case '010011a12_pc':
        return new Jsontype(
          `${domain}/videoad/atvad/mp4/ba12.mp4`,
          'KH3　- 主題歌「誓い」　- ',
          'https://www.google.com',
          '360',
          '640',
          '0',
          'インストール',
          videoframeurl,
          entryyframeurl);
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
app.get('/rr', (req: Express.Request, res: Express.Response) => {
  const rk: string = req.query.rk;
  console.log('rkは[' + rk + ']');

  const json = {'key': 'HelloWorld1'};
  res.json(json);
  res.end();
});

/**
 * 3回目のxhr用のAPI
 */
app.get('/issp', (req: Express.Request, res: Express.Response) => {
  const query: string = req.query.rk;
  console.log('rkは[' + query + ']');

  const json = {'key': 'HelloWorld2'};
  res.json(json);
  res.end();
});

app.get('/click_part1', (req: Express.Request, res: Express.Response) => {
  if (req.query.rk) {
    res.redirect('/next.html?rk=' + req.query.rk);
  } else {
    res.redirect('/next.html');
  }
  res.end();
});

app.get('/click_part2', (req: Express.Request, res: Express.Response) => {
  console.log('/marchant/html/next.html?rk=' + req.query.rk);
  if (req.query.rk) {
    res.json({ url: '/marchant/html/next.html?rk=' + req.query.rk });
  } else {
    res.json({});
  }
  res.end();
});

app.get('/getImage', (req: Express.Request, res: Express.Response) => {
  if (req.query.rk) {
    res.cookie('test', '/marchant/html/next.html?rk=' + req.query.rk, {
      maxAge: 60000,
    });
    fs.readFile('ts.jpg', (_, data) => {
      res.set('Content-Type', 'image/jpeg');
      res.send(data);
    });
  } else {
    res.cookie('test', '/marchant/html/next.html', { maxAge: 60000 });
  }
});

// app.listen(PORT, () => {
//   console.log('atv++++++Example app listening on port 3000!');
// });

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
