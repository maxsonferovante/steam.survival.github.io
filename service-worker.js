var cacheName = 'steamsurvival-v1';
var filesToCache = [  
  'index.html',
  'empresa.html',
  'ofertas.html',
  'scripts/app.js',
  'styles/style.css',
  'img/dont_starve.jpg',
  'img/logo_2.png',
  'img/logo.png',
  'img/oxygen_not_included.jpg',
  'img/rime.jpg',
  'img/rust.jpg',
  'img/the_forest.jpg'
];

self.addEventListener('install', function(event) {
  // perform install steps
  event.waitUntil(
    caches.open(cacheName)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(filesToCache);
      })
  );
});

self.addEventListener('fetch',function(e)
{
  e.respondWith(
    caches.match(e.request)
    .then(function(responde){
      if(responde){
        return responde;
      }
      return fetch(e.request);
    })
  );
})
