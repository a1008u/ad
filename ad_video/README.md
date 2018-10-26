## 実行方法
  - 開発用
     ```$npm
    npm install // npm_moduleを取得していない場合
    export PATH=$PATH:./node_modules/.bin
    npm run build-dev // 開発環境用
    docker-compose up --build

    // express
    npm run build-serverdev
    node dist/server/js/app.js
    ``` 
  - 本番用
    ```$npm
    npm install // npm_moduleを取得していない場合
    export PATH=$PATH:./node_modules/.bin 
    npm run build-pro // 本番環境用
    docker-compose up --build　// もし動作を見たいのなら。。
    ``` 

## typescriptの始め方  

 - pakage.jsonの作成
    ```
    npm init;
    ```

 - typescriptの登録
    ```
    npm i typescript --save
    ```
 - その他のインストール
    ```$npm
    npm install --save-dev axios rxjs @rxjs/rx
    npm install --save-dev es6-promise
    npm install --save-dev webpack webpack-cli ts-loader
    npm install --save-dev jasmin jasmine-core @types/jasmine
    npm install --save-dev emergence.js
    npm install --save-dev platform 
    npm install --save-dev @types/platform 
    
    npm install --save-dev karma karma-cli karma-coverage karma-typescript karma-webpack karma-jasmine
    npm install --save-dev karma-chrome-launcher  karma-edge-launcher karma-firefox-launcher karma-ie-launcher karma-safari-launcher
    npm install --save-dev karma-sourcemap-loader
    npm install --save-dev karma-jasmine-html-reporter karma-mocha-reporter karma-spec-reporter
    npm install --save-dev tslint prettier tslint-plugin-prettier tslint-config-prettier tslint-config-standard
    npm install --save-dev express webpack-node-externals
    npm install --save-dev @types/express
    npm install --save-dev body-parser morgan
    npm install --save cors
    npm install --save-dev @types/cors
    npm i --save-dev npm-run-all rimraf cpx
    npm i --save-dev style-loader css-loader
    ```
 
- test用のコマンド
    ```$npm
    npm run test
    ```
- 環境変数を通す
    ```$npm 
    export PATH=$PATH:./node_modules/.bin 
    ``` 
## windowsでの実行方法
  - ツールのインストール  
    スタートを押して，コマンドプロンプトを右クリックし，管理者として実行をクリック
    ```
     @"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
    ```
  - gitのインストール(nodeバージョン管理ツール)
    ```
    choco install git
    ```
  - nodistのインストール(nodeバージョン管理ツール)
    ```
    choco install nodist
    ```
  - nodeのインストール
    ```
    nodist dist
    nodist バージョン指定
    node -v
    ```


    // "build-dev": "npm-run-all clean build:* cpx:*",
    // "build:partnerdev": "webpack --config ./webpack.config.partner_dev.js",
    // "build:partneriframedev": "webpack --config ./webpack.config.partner_iframe_dev.js",
    // "build-marchantdev": "webpack --config ./webpack.config.marchant_dev.js",
    // "build:redirecthisdev": "webpack --config ./webpack.config.redirect_send_h_is_dev.js",
    // "build:redirectmdev": "webpack --config ./webpack.config.redirect_send_m_dev.js",
    // "build:serverdev": "webpack --config ./webpack.config.server_dev.js",

### テスト環境
https://localhost:3000/videoad/adscript/html/index_pc_mock.html
https://localhost:3000/videoad/adscript/html/index_sp_mock.html


# docker
docker inspect mysql_mysql-test_1
docker run --rm --volumes-from mysql_mysql-test_1 -v $(pwd):/backup boombatower/docker-backup backup
ls -l

docker run --volumes-from mysql_mysql-test_1 -v $(pwd):/backup mysql_mysql-test_1 bash -c "tar xvf /backup.tar.xz"

docker container prune

docker -v $(pwd):/backup mysql_mysql-test_1 bash -c "cd tar xvf /backup.tar.xz"
docker exec -it -v $(pwd):/backup 5c97a7948805 bash -c "ls -l"



docker cp backup.tar.xz mysql_mysql-test_1:./backup.tar.xz
docker exec -it mysql_mysql-test_1 bash -c "ls -l"
docker exec -it mysql_mysql-test_1 bash -c "tar xvf ./backup.tar.xz"


docker run --volumes-from mysql_db_data_1 -v $(pwd):/backup mysql bash -c "cd /backup && apt-get update && apt-get install xz-utils && tar xvf ./backup.tar.xz"

