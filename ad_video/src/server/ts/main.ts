import app from './app';
import * as Express from 'express';
import * as path from 'path';
import * as fs from 'fs';

// POSTパラメータをJSONで取得するにはbody-parserを使う。

const PORT = 3000;
const ROOT = '/';

app.get(ROOT, (req: Express.Request, res: Express.Response) => {
  console.log(path.join(__dirname, 'statics'));
  console.log(req.baseUrl);
  res.send('Hello world.');
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
