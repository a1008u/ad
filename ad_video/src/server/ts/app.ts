// const express = require('express');
// const path = require('path');
// const logger = require('morgan');
// const app = express();
//
// app.use(logger('dev'));
// app.use(express.static(path.join(__dirname, 'statics')));
//
// app.get('/click', function(req, res) {
//     if (req.query.rk) {
//         res.redirect("/next.html?rk="+ req.query.rk);
//     } else {
//         res.redirect("/next.html");
//     }
//     res.end();
//
// });
//
// app.get('/clickx', function(req, res) {
//     if (req.query.rk) {
//         res.json({url: "/next.html?rk="+ req.query.rk});
//     } else {
//         res.json({});
//     }
//     res.end();
// });
//
// app.listen(3000, () => console.log('videoads'));
// module.exports = app;

import * as Express from 'express';
class App {

    public app: Express.Application;

    constructor() {
        this.app = Express();
        // this.config();
    }

    // private config(): void{
    //     // support application/json type post data
    //     this.app.use(bodyParser.json());
    //
    //     //support application/x-www-form-urlencoded post data
    //     this.app.use(bodyParser.urlencoded({ extended: false }));
    // }

}

export default new App().app;



