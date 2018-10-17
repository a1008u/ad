import * as Express from 'express';
// import * as https from 'https';
// import * as fs from 'fs';
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

    // // . 鍵ファイルと証明書ファイル
    // let options = {
    //   key: fs.readFileSync( './server_key.pem' ),
    //   cert: fs.readFileSync( './server_crt.pem' )
    // };

    // // . 鍵ファイルと証明書ファイルを指定して、https で待受け
    // let server = https
    // .createServer( options, this.app )
    // .listen( appEnv.port, () => {
    //   console.log( "server stating on " + appEnv.port + " ..." );
    // });


  }
}

export default new App().app;
