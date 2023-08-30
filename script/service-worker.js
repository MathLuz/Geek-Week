// Este é o service worker para a página "Offline"

// Importa a biblioteca Workbox para funcionalidades de service worker
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

// Define o nome do cache
const CACHE = "Paginas-em-Cache";

// Array de arquivos a serem salvos
const urlsToCache = [
  '/index.html',
  '/cronograma.html',
  '/mundo-geek.html'
];

// Array de pastas a seresm salvas
const foldersToCache = [
  '/css/',
  '/script/',
  '/atividades/',
  '/img/',
  '/fonts/'
];

// Define o nome do arquivo HTML de fallback offline
const offlineFallbackPage = "ToDo-replace-this-name.html";

// Escuta mensagens enviadas pelos clientes
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    // Se a mensagem for do tipo "SKIP_WAITING", chama self.skipWaiting()
    self.skipWaiting();
  }
});

self.addEventListener('install', async (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => {
        // Percorre a lista de URLs e adiciona cada um ao cache
        return cache.addAll(urlsToCache, foldersToCache);
      })
  );
});

// Habilita o pré-carregamento de navegação se suportado pelo Workbox
if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

// Escuta o evento 'fetch'
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        // Tenta obter a resposta de pré-carregamento
        const preloadResp = await event.preloadResponse;

        if (preloadResp) {
          // Se houver resposta de pré-carregamento, retorna ela
          return preloadResp;
        }

        // Se não houver resposta de pré-carregamento, busca a resposta da rede
        const networkResp = await fetch(event.request);
        return networkResp;
      } catch (error) {
        // Se ocorrer um erro, obtém a página de fallback offline do cache e a retorna
        const cache = await caches.open(CACHE);
        const cachedResp = await cache.match(offlineFallbackPage);
        return cachedResp;
      }
    })());
  }
});
