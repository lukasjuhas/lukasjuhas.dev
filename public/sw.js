var CACHE_NAME = 'itsluk.as-v1';
var urlsToCache = [
  '/',
  '/styles/core.min.css',
  '/styles/app.min.css',
  '/scripts/app.min.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});
