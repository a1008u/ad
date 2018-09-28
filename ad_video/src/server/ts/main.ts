import app from './app';
import * as Express from 'express';
import * as path from 'path';
import * as fs from 'fs';
import { jsontype, Jsontype } from '../../service/jsontype';

// POSTパラメータをJSONで取得するにはbody-parserを使う。

const PORT = 3000;
const ROOT = '/';

app.get(ROOT, (req: Express.Request, res: Express.Response) => {
  console.log(path.join(__dirname, 'statics'));
  console.log(req.baseUrl);
  res.send('Hello world.');
});

app.get('/atvjson', (req: Express.Request, res: Express.Response) => {
  let mkJson = (rk: string) => {
    switch (rk) {
      case '010011a1':
        return new Jsontype(
          '../../mp4/ba1.mp4',
          'ここは表示しません',
          'https://www.google.com',
          '180',
          '360',
          '10',
          'ここは表示しません');
      case '010011a2':
        return new Jsontype(
          '../../mp4/ba2.mp4',
          'ここは表示しません',
          'https://www.google.com',
          '180',
          '360',
          '20',
          'ここは表示しません');
      case '010011a3':
        return new Jsontype(
          '../../mp4/ba3.mp4',
          'ここは表示しません',
          'https://www.google.com',
          '180',
          '360',
          '5','ここは表示しません');
      case '010011a4':
        return new Jsontype(
          '../../mp4/ba4.mp4',
          'ここは表示しません',
          'https://www.google.com',
          '180',
          '360',
          '8',
          'ここは表示しません');
      case '010011a5':
        return new Jsontype(
          '../../mp4/ba5.mp4',
          'ここは表示しません',
          'https://www.google.com',
          '180',
          '360',
          '8',
          'ここは表示しません');
      case '010011a6':
        return new Jsontype(
          '../../mp4/ba6.mp4',
          'ここは表示しません',
          'https://www.google.com',
          '180',
          '360',
          '8',
          'ここは表示しません');
      case '010011a7':
        return new Jsontype(
          '../../mp4/ba7.mp4',
          'ここは表示しません',
          'https://www.google.com',
          '180',
          '360',
          '8',
          'ここは表示しません');
      case '010011a8':
        return new Jsontype(
          '../../mp4/ba8.mp4',
          'MARVEL - INFINITY WAR -',
          'https://www.google.com',
          '180',
          '360',
          '0',
          '全容を今すぐ確認');
      case '010011a9':
        return new Jsontype(
          '../../mp4/ba9.mp4',
          'FF零式　- OP特典　- ',
          'https://www.google.com',
          '180',
          '360',
          '0',
          'インストール');
      case '010011a10':
        return new Jsontype(
          '../../mp4/ba10.mp4',
          'FF零式　- OP特典　- ',
          'https://www.google.com',
          '180',
          '360',
          '0',
          '詳細はこちら');
      case '010011a11':
        return new Jsontype(
          '../../mp4/ba11.mp4',
          'KH2.8　- OP特典　- ',
          'https://www.google.com',
          '180',
          '360',
          '0',
          '詳細はこちら');
      case '010011a12':
        return new Jsontype(
          '../../mp4/ba12.mp4',
          'KH3　- 主題歌「誓い」　- ',
          'https://www.google.com',
          '180',
          '360',
          '0',
          'インストール');
      case '010011a1_pc':
        return new Jsontype(
          '../../mp4/ba1.mp4',
          'ここは表示しません',
          'https://www.google.com',
          '360',
          '640',
          '10',
          'ここは表示しません');
      case '010011a2_pc':
        return new Jsontype(
          '../../mp4/ba2.mp4',
          'ここは表示しません',
          'https://www.google.com',
          '360',
          '640',
          '10',
          'ここは表示しません');
      case '010011a3_pc':
        return new Jsontype(
          '../../mp4/ba3.mp4',
          'ここは表示しません',
          'https://www.google.com',
          '360',
          '640',
          '10',
          'ここは表示しません');
      case '010011a4_pc':
        return new Jsontype(
          '../../mp4/ba5.mp4',
          'ここは表示しません',
          'https://www.google.com',
          '360',
          '640',
          '10',
          'ここは表示しません');
      case '010011a5_pc':
        return new Jsontype(
          '../../mp4/ba5.mp4',
          'ここは表示しません',
          'https://www.google.com',
          '360',
          '640',
          '10',
          'ここは表示しません');
      case '010011a6_pc':
        return new Jsontype(
          '../../mp4/ba6.mp4',
          'ここは表示しません',
          'https://www.google.com',
          '360',
          '640',
          '10',
          'ここは表示しません');
      case '010011a7_pc':
        return new Jsontype(
          '../../mp4/ba7.mp4',
          'ここは表示しません',
          'https://www.google.com',
          '360',
          '640',
          '8',
          'ここは表示しません');
      case '010011a8_pc':
        return new Jsontype(
          '../../mp4/ba8.mp4',
          'MARVEL - INFINITY WAR -',
          'https://www.google.com',
          '360',
          '640',
          '0',
          '全容を今すぐ確認');
      case '010011a9_pc':
        return new Jsontype(
          '../../mp4/ba9.mp4',
          'FF零式　- OP特典　- ',
          'https://www.google.com',
          '360',
          '640',
          '0',
          'インストール');
      case '010011a10_pc':
        return new Jsontype(
          '../../mp4/ba10.mp4',
          'FF零式　- OP特典　- ',
          'https://www.google.com',
          '360',
        '640',
          '0',
          '詳細はこちら');
      case '010011a11_pc':
        return new Jsontype(
          '../../mp4/ba11.mp4',
          'KH2.8　- OP特典　- ',
          'https://www.google.com',
          '360',
        '640',
          '0',
          '詳細はこちら');
      case '010011a12_pc':
        return new Jsontype(
          '../../mp4/ba12.mp4',
          'KH3　- 主題歌「誓い」　- ',
          'https://www.google.com',
          '360',
          '640',
          '0',
          'インストール');
    }
  };

  const atvrk: string = req.query.atvrk;
  const jsontype: Jsontype = mkJson(atvrk);
  res.json(jsontype);
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

app.listen(PORT, () => {
  console.log('atv++++++Example app listening on port 3000!');
});
