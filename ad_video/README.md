## 実行方法
  - 開発用
    ```$npm
    npm install // npm_moduleを取得していない場合
    export PATH=$PATH:./node_modules/.bin
    npm run build-dev // 開発環境用
    node dist/server/js/app.js
    ```

  - 本番用
    ```$npm
    npm install // npm_moduleを取得していない場合
    export PATH=$PATH:./node_modules/.bin
    npm run build-pro // 開発環境用
    node dist/server/js/app.js
    ```

### テスト環境
  - Mock用
  http://localhost:3000/atvad/html/index_pc_mock_notPreview.html
  http://localhost:3000/atvad/html/index_pc_mock_preview.html
  http://localhost:3000/atvad/html/index_sp_mock.html

  - preview用
  http://localhost:3000/atvad/html/index_pc_preview.html
  http://localhost:3000/atvad/html/index_sp_preview.html

  - 本番アクセス用 *hostsを切り替えることでテストにアクセスしてね
  http://localhost:3000/atvad/html/index_pc.html
  http://localhost:3000/atvad/html/index_sp.html


  http://10.10.15.90:3000/atvad/html/index_sp.html
  http://10.10.15.90:3000/atvad/html/index_pc.html

## ファイルサイズ

ファイル名|proサイズ(kiB)|devサイズ(kiB)
|:---|:---|:---|
|atvad_min.js|45.5|171|
|iframe_atvad_min.js|144|635|
|iframe_entry_min.js|39.2|149|
|iframe_cookie_min.js|55.2|197|