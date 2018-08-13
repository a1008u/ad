// Copyright 2016 Google Inc.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

let dataCacheName = 'weatherData-v1';
let cacheName = 'weatherPWA-step-8-1';
let filesToCache = [
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

/**
 * 【Service Worker】のインストール
 * 1.キャッシュを開く
 * 2.ファイルをキャッシュさせる
 * 3.必要なアセットがすべてキャッシュされたかを確認する
 */
self.addEventListener('install', e => {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log('[ServiceWorker] Caching app shell');
        return cache.addAll(filesToCache);
      })
  );
});

/**
 * 更新の手順
 * 1.Service WorkerのJavaScriptファイルを更新します。
 * 　ユーザーがあなたのサイトに移動してきた時、ブラウザはService Workerを定義するJavaScriptファイルを再度ダウンロードしようとします。
 * 　現在ブラウザが保持しているファイルとダウンロードしようとするファイルにバイト差異がある場合、それは「新しいもの」と認識されます
 * 2.新しいService Worker がスタートし、installイベントが発火します
 * 3.この時点では、まだ古いService Workerが現在のページをコントロールしているため、新しいService Workerはwaiting状態になります
 * 4.開かれているページが閉じられたら、古いService Workerは終了され、新しいService Workerがページをコントロール可能になります
 * 5.新しいService Workerがページをコントロール可能になったら、activateイベントが発火します
 */
self.addEventListener('activate', e => {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches
      .keys()
      .then((keyList) => {
        return Promise.all(keyList.map( key => {
          if (key !== cacheName && key !== dataCacheName) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        }));
    })
  );

  /*
   * Fixes a corner case in which the app wasn't returning the latest data.
   * You can reproduce the corner case by commenting out the line below and
   * then doing the following steps: 1) load app for first time so that the
   * initial New York City data is shown 2) press the refresh button on the
   * app 3) go offline 4) reload the app. You expect to see the newer NYC
   * data, but you actually see the initial data. This happens because the
   * service worker is not yet activated. The code below essentially lets
   * you activate the service worker faster.
   */
  return self.clients.claim();
});

/**
 * Service Workerがインストールされた状態で、
 * 他のページヘ移動したりページを更新したりすると、
 * Service Workerはfetchイベントを受け取ります。
 */
self.addEventListener('fetch', e => {
  console.log('[Service Worker] Fetch ', e.request.url);
  let dataUrl = 'https://query.yahooapis.com/v1/public/yql';

  // code choose the "Cache then network" strategy or "Cache, falling back to the network" offline strategy
  if (e.request.url.indexOf(dataUrl) > -1) {
    /*
     * When the request URL contains dataUrl, the app is asking for fresh
     * weather data. In this case, the service worker always goes to the
     * network and then caches the response. This is called the "Cache then
     * network" strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-then-network
     */
    e.respondWith(
      caches
        .open(dataCacheName)
        .then((cache) => {
          return fetch(e.request)
              .then(response => {
                cache.put(e.request.url, response.clone());
                return response;
              });
      })
    );
  } else {
    /*
     * The app is asking for app shell files. In this scenario the app uses the
     * "Cache, falling back to the network" offline strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
     */
    e.respondWith(
      caches
        .match(e.request)
        .then(response => {
          return response || fetch(e.request);
        })
    );
  }
});
