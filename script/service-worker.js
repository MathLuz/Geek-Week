const CACHE_NAME = 'my-pwa-cache-v1';
  // Pastas e arquivos salvos no cache em work server
const urlsToCache = [
  // Arquivos na raiz
  '/index.html',
  '/cronograma.html',
  '/desenvolvedores.html',
  '/mundo-geek.html',

  // Tudo das pastas
  '/css/',
  '/script/',
  '/atividades/',
  '/img/',
  '/fonts/',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('scrip/service-worker.js')
      .then(registration => {
        console.log('Service Worker registrado com sucesso:', registration);
      })
      .catch(error => {
        console.error('Falha ao registrar o Service Worker:', error);
      });
  });
}
