import * as Express from 'express';
import * as path from "path";
import * as logger from 'morgan';
import * as cors from "cors";

class App {

    public app: Express.Application;

    constructor() {
        this.app = Express();
        this.app.use(Express.static(path.join('dist/server/statics')));
        this.app.use(logger('dev'));
        this.app.use(cors());
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



