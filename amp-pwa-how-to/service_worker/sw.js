const cacheName = 'my-site-cache-v1';
const filesToCache = [
    '/',
    '/index.html',
    '/styles/main.css'
];

/**
 * Service Workerが実行されるとすぐにトリガーされ、Service Workerごとに一度だけ呼び出されます。
 * Service Workerスクリプトを変更すると、ブラウザでは別のService Workerと見なされ、そのinstallイベントが取得されます。
 * installイベントが発生すると、クライアントを制御する前に必要なものをすべてキャッシュできます。
 * event.waitUntil()にPromiseが渡されると、ブラウザはインストールの完了のタイミングと成功したかどうかを把握できます。
 * Promiseが棄却されると、インストールは失敗したことになり、ブラウザは Service Workerを破棄され、クライアントは制御されません。
 * つまり、fetchイベントではキャッシュに存在する「filesToCache」にのみ依存することになります。 これは依存関係です。
 */
self.addEventListener('install', e => {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        // caches.open()を使用してキャッシュを開き、キャッシュに名前を付けます。
        // キャッシュに名前を付けることでファイルのバージョン管理が可能になります。
        // また、データと App Shell を切り離し、お互いに影響を与えることなく個別に更新できるように なります。
        caches
            .open(cacheName)
            .then((cache) => {
                // これはURLのリストを取り、 該当のファイルをサーバーから取得して応答をキャッシュに追加します。
                // cache.addAll() は最小単位であるため、ファイルのうち1つでも取得できないものがあると、キャッシュのステップそのものが失敗に終わります。
                return cache.addAll(filesToCache);
            })
    );
});

// fetch
// self.addEventListener('fetch', event => {
//     console.log('fetch');
//     event.respondWith(
//         caches
//             .match(event.request)
//             .then(response => {
//                     // キャッシュがあったのでそのレスポンスを返す
//                     if (response) return response;
//                     return fetch(event.request);
//                 }
//             )
//     );
// });

// fetch(キャッシュを返す)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches
      .match(event.request)
      .then(response => {
        // キャッシュがあったのでレスポンスを返す
        console.log('response確認    ' + response);
        if (response) return response;

        // 重要：リクエストを clone する。リクエストは Stream なので
        // 一度しか処理できない。ここではキャッシュ用、fetch 用と2回
        // 必要なので、リクエストは clone しないといけない
        let fetchRequest = event.request.clone();
        console.log('fetchRequest確認     ' + fetchRequest);

        return fetch(fetchRequest)
          .then(response => {
            // レスポンスが正しいかをチェック
            if(!response || response.status !== 200 || response.type !== 'basic') {
                return response;
            }

            // 重要：レスポンスを clone する。レスポンスは Stream で
            // ブラウザ用とキャッシュ用の2回必要。なので clone して
            // 2つの Stream があるようにする
            let responseToCache = response.clone();

            caches
              .open(cacheName)
              .then(cache =>  { cache.put(event.request, responseToCache);});

            return response;
          }
        );
      })
    );
});

/**
 * activete 更新
 * Service Workerがクライアントを制御したり、pushやsyncなどの機能イベントを処理したりできるようになると、activateイベントを取得します。
 * ただし、.register() を呼び出したページが制御されるという意味ではありません。
 */
self.addEventListener('activate', event => {

  let cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1'];
  event.waitUntil(
    caches
      .keys()
      .then(cacheNames => {
        return Promise.all(cacheNames.map(cacheName => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
    })
  );
});
