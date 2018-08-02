import app from "./app";
import * as Express from 'express';
import * as path from "path";

// POSTパラメータをJSONで取得するにはbody-parserを使う。
import * as bodyParser from 'body-parser';

const PORT = 3000;
const ROOT = '/';


app.get(ROOT, (req: Express.Request, res: Express.Response) =>{
        console.log(path.join(__dirname, 'statics'));
        console.log(req.baseUrl);
        res.send('Hello world.');
    }
);


app.get('/click_part1', (req: Express.Request, res: Express.Response) => {
    if (req.query.rk) {
        res.redirect("/next.html?rk="+ req.query.rk);
    } else {
        res.redirect("/next.html");
    }
    res.end();
});

app.get('/click_part2', (req: Express.Request, res: Express.Response) => {
    if (req.query.rk) {
        res.json({url: "/next.html?rk="+ req.query.rk});
    } else {
        res.json({});
    }
    res.end();
});

app.listen(PORT, () => {
    console.log('atv++++++Example app listening on port 3000!');
});
