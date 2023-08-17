const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
  '/index.html',
  '/cronograma.html',
  '/desenvolvedores.html',
  '/mundo-geek.html'
];

// Pode adicionar mais pastas e arquivos aqui
const foldersToCache = [
  '/css/',
  '/script/',
  '/atividades/',
  '/img/',
  '/fonts/'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        cache.addAll(urlsToCache);
        // Percorre as pastas e adiciona os arquivos ao cache
        foldersToCache.forEach(folder => {
          cacheFilesInFolder(cache, folder);
        });
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

function cacheFilesInFolder(cache, folder) {
  fetch(folder) // Faz uma requisição para a pasta
    .then(response => response.text())
    .then(text => {
      const files = text.match(/href="([^"]+)"/g); // Obtém os links dos arquivos
      if (files) {
        files.forEach(file => {
          const filePath = file.substring(6, file.length - 1);
          cache.add(filePath); // Adiciona cada arquivo ao cache
        });
      }
    });
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/scrip/service-worker.js')
      .then(registration => {
        console.log('Service Worker registrado com sucesso:', registration);
      })
      .catch(error => {
        console.error('Falha ao registrar o Service Worker:', error);
      });
  });
}
