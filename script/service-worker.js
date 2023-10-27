// Define o nome do cache
const CACHE = "Paginas-em-Cache";

// Lista de arquivos a serem salvos
const urlsToCache = [
  '/',
  '/index.html',
  '/cronograma.html',
  '/mundo-geek.html',
  '/desenvolvedores.html',
  '/css/style.css',
  '/css/reset.css',
  '/script/script-cronograma.js',
  '/script/scriptGoBack.js',
  '/script/script-animation.js',
  '/fonts/x-man.ttf',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
