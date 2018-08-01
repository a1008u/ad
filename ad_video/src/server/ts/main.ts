import app from "./app";
import * as logger from 'morgan';
import * as Express from 'express';
import * as path from "path";
import * as cors from "cors";

// POSTパラメータをJSONで取得するにはbody-parserを使う。
import * as bodyParser from 'body-parser';

const PORT = 3000;
const ROOT = '/';
// let router = Express.Router();
// const options:cors.CorsOptions = {
//     allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
//     credentials: true,
//     methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
//     origin: "*",
//     preflightContinue: false
// };
//
// router.use(cors(options));
// router.options("*", cors(options));

// app.use(Express.static('dist/server/js/statics'));
app.use(Express.static(path.join('dist/server/js/statics')));
app.use(logger('dev'));
app.use((req: Express.Request, res: Express.Response, next: any) =>{
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get(ROOT, (req: Express.Request, res: Express.Response) =>{
        console.log(path.join(__dirname, 'statics'));
        console.log(req.baseUrl);
        res.send('Hello world.');
    }
);


app.get('/click_part1', (req: Express.Request, res: Express.Response) => {

    app.use((req: Express.Request, res: Express.Response, next: any) =>{
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    if (req.query.rk) {
        res.redirect("/next.html?rk="+ req.query.rk);
    } else {
        res.redirect("/next.html");
    }
    res.end();
});

app.get('/click_part2', (req: Express.Request, res: Express.Response) => {
    if (req.query.rk) {
        res.json({url: "../../marchant/html/next.html?rk="+ req.query.rk});
    } else {
        res.json({});
    }
    res.end();
});

app.listen(PORT, () => {
    console.log('atv++++++Example app listening on port 3000!');
});
