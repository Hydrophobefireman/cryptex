const { assets } = serviceWorkerOption;
const CACHE_NAME = `CACHE-V${new Date().getTime()}`;
const assetsToCache = [...assets, "/"];
self.addEventListener("install", event => {
  self.skipWaiting();
  console.log("[SW] Installed");
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => cache.addAll(assetsToCache))
      .catch(console.error)
  );
  event;
});
self.addEventListener("activate", event => {
  console.log("[SW]Activated");
  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames
            .filter(cacheName => cacheName !== CACHE_NAME)
            .map(cacheName => caches.delete(cacheName))
        )
      )
  );
});
