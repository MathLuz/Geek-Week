const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
  '/index.html',
  '/cronograma.html',
  '/mundo-geek.html'
];

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
        return cacheFilesInFolders(cache, foldersToCache);
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

function cacheFilesInFolders(cache, folders) {
  const filePromises = folders.map(folder => {
    return fetch(folder) // Faz uma requisição para a pasta
      .then(response => response.text())
      .then(text => {
        const files = text.match(/href="([^"]+)"/g); // Obtém os links dos arquivos
        if (files) {
          const filePaths = files.map(file => file.substring(6, file.length - 1));
          return cache.addAll(filePaths); // Adiciona cada arquivo ao cache
        }
      });
  });

  return Promise.all(filePromises);
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registrado com sucesso:', registration);
      })
      .catch(error => {
        console.error('Falha ao registrar o Service Worker:', error);
      });
  });
}
