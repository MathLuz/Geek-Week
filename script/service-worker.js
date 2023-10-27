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
  //'/img/image1.jpg',
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
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js', { scope: '/' })
    .then(registration => {
      console.log('Service Worker registrado com sucesso:', registration);
    })
    .catch(error => {
      console.error('Erro ao registrar o Service Worker:', error);
    });
}
