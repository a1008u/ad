// service worker用のjs

var cacheName = 'weatherPWA-step-6-1';

// app shellに必要なファイルのリスト
var filesToCache = [
  '/',
  '/index.html',
  '/scripts/app.js',
  '/styles/inline.css',
  '/images/clear.png',
  '/images/cloudy-scattered-showers.png',
  '/images/cloudy.png',
  '/images/fog.png',
  '/images/ic_add_white_24px.svg',
  '/images/ic_refresh_white_24px.svg',
  '/images/partly-cloudy.png',
  '/images/rain.png',
  '/images/scattered-showers.png',
  '/images/sleet.png',
  '/images/snow.png',
  '/images/thunderstorm.png',
  '/images/wind.png'
];

// Service Workerを登録すると、
// ユーザーがページに初めてアクセスしたときにインストールイベントが呼び出されます。
// このイベントハンドラで、アプリケーションに必要なすべてのアセットをキャッシュします。
self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
      // caches.open()を使用してキャッシュを開き、キャッシュに名前を付けます。
      // キャッシュに名前を付けることでファイルのバージョン管理が可能になります。
      // また、データと App Shell を切り離し、お互いに影響を与えることなく個別に更新できるように なります。
    caches
      .open(cacheName)
      .then((cache) => {
        console.log('[ServiceWorker] Caching app shell');

        // これはURLのリストを取り、 該当のファイルをサーバーから取得して応答をキャッシュに追加します。
        // cache.addAll() は最小単位であるため、ファイルのうち1つでも取得できないものがあると、キャッシュのステップそのものが失敗に終わります。
        return cache.addAll(filesToCache);
      })
  );
});

// Service Worker に変更を加えるときには必ずcacheNameを変更し、キャッシュから最新版のファイルが取得されるようにします。
// 使わないコンテンツやデータのキャッシュは 定期的に削除することが重要です。
// activeは「すべてのキャッシュキー の取得と使われていないキャッシュキーの削除を行う」
self.addEventListener('activate', (e) => {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches
      .keys()
      .then((keyList) => {
        return Promise
          .all(keyList.map((key) => {
            if (key !== cacheName) {
              console.log('[ServiceWorker] Removing old cache', key);
              return caches.delete(key);
            }
          }));
      })
  );
  return self.clients.claim();
});

// リクエストの処理方法を決め、キャッシュした応答を配信する。
self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches
      .match(e.request)
      .then((response) => {
        // 内側から外側に向かって説明すると、まず caches.match() を使用して、fetch イベントを呼び出したウェブリクエストを評価し、
        // キャッシュからのデータが利用可能かどうかを確認します。
        // 次に、キャッシュデータで応答するか、fetchを使用してネットワークからコピーを取得します。
        return response || fetch(e.request);
      })
  );
});
