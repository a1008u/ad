const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {

    entry: {
        "ts":`./src/server/ts/main.ts`
    },

    output: {
        filename: "./server/js/app.js"
    },
    mode: 'production'
    ,
    target: 'node',
    externals: [nodeExternals()],
    resolve: {
        extensions: ['.ts', '.js']
    },

    // ファイルの種類がなんであってもwebpackが処理できるモジュールにLoaderが変換してくれることで、
    // webpackがbundleファイルを作れるようになる。
    module: {
        rules: [
            {
                // testプロパティ：拡張子を指定して、あるLoaderがどのような種類のファイルを処理するべきなのか特定する(正規表現で拡張子を指定)
                // useプロパティ：Loaderを指定して、testプロパティに指定したファイルがアプリケーションの依存関係や最終的なbundleファイルに加えられるように変換する
                test: /\.ts?$/, use: 'ts-loader'
            }
        ]
    }

};
