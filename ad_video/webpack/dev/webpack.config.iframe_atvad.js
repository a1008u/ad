module.exports = {

    entry: {
        "ts":`./src/videoad/atvad/ts/iframe_atvad.ts`
    },

    output: {
        filename: "./server/statics/videoad/atvad/js/iframe_atvad_min.js"
    },
    mode: 'development'
    ,
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
            },
            {
                test: /\.css/,
                use: [
                    'style-loader',
                    {loader: 'css-loader', options: {url: false}},
                ],
                use: [
                    // linkタグに出力する機能
                    'style-loader',
                    // CSSをバンドルするための機能
                    {
                        loader: 'css-loader',
                        options: {
                        // オプションでCSS内のurl()メソッドの取り込みを禁止する
                        url: false,
                        // CSSの空白文字を削除する
                        minimize: true,
                        // ソースマップを有効にする
                        sourceMap: true,
                        },
                    },
                ],
            }
        ]
    },
    devtool:"source-map"
};
