const CACHE_NAME = 'ferramentas-360-v4';
const ASSETS = ['./','./index.html','./logo-360.png','./icon-192.png','./icon-512.png','./favicon.ico','./favicon-16.png','./favicon-32.png','./manifest.json'];
self.addEventListener('install', event => { event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', event => { if (event.request.method !== 'GET' || new URL(event.request.url).origin !== location.origin) return; event.respondWith(fetch(event.request).catch(() => caches.match(event.request))); });
