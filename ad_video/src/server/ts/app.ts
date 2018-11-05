import * as Express from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import * as cors from 'cors';

class App {
  public app: Express.Application;

  constructor() {
    this.app = Express();
    this.app.use(Express.static(path.join('dist/server/statics')));
    this.app.use(logger('dev'));
    this.app.use(cors());
    // this.app.use((req, res, next) => {
    //   res.setHeader('Access-Control-Allow-Origin', '*');
    //   res.setHeader(
    //     'Access-Control-Allow-Methods',
    //     'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    //   );
    //   res.setHeader(
    //     'Access-Control-Allow-Headers',
    //     'X-Requested-With,content-type'
    //   );
    // });
  }
}

export default new App().app;
