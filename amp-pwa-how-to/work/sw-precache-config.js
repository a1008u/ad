importScripts: ['service-worker-import.js']

// これで、画像をキャッシュするように設定された service-worker.js のスクリプトが生成されます。
// 画像が追加または変更されるたびに、下記のコマンドを実行してスクリプトを再生成する必要があります。
// sw-precache --config=sw-precache-config.js
module.exports = {
    // ロゴ画像などの静的コンテンツをキャッシュ
    staticFileGlobs: [
        'img/**.*'
        //
        ,'offline.html'
        ,'shell.html'
        ,'js/**.js'
    ],
    // ユーザーがアクセスしたページをキャッシュする
    runtimeCaching: [{
        urlPattern: '*',
        handler: (request, values, options) => {
            // If this is NOT a navigate request, such as a request for
            // an image, use the cacheFirst strategy.
            if (request.mode !== 'navigate') {
                return toolbox.cacheFirst(request, values, options);
            }

            return caches.match('/shell.html', {ignoreSearch: true});
        }
    }, {
        urlPattern: /cdn\.ampproject\.org/,
        handler: 'fastest'
    }],
    importScripts: ['service-worker-import.js']
};
