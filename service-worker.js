// Copyright 2018 Maxson Almeida Ferovante.
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

var dataCacheName = 'steamSurvivalData-v1';
var cacheName = 'steamSurvivalPWA-final-1';

var filesToCache = [
  '/',
  '/index.html',
  '/manifest.json',

  '/scripts/app.js',
  '/styles/style.css',

  '/img/dont_starve.png',
  '/img/logo_2.png',
  '/img/logo.png',
  '/img/oxygen_not_inclided.jpg',
  '/img/rime.jpg',
  '/img/rust.jpg',
  '/img/the_forest.jpg'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName)
    .then(function(cache) {
      console.log('[ServiceWorker] open cache');
      return cache.addAll(filesToCache);
    })
  );
});
self.addEventListener('fetch',function(e)
{
  e.respondeWith(
    caches.match(e.request)
    .then(function(responde){
      if(response){
        return responde;
      }
      return fetch(e.request);
    })
  );
})
self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
});

