const CSSFILES = [
  "https://fonts.pycode.tk/open-sans.css",
  "https://fonts.pycode.tk/@/open-sans/open-sans-v16-latin-ext_latin-600.woff2",
  "https://fonts.pycode.tk/@/open-sans/open-sans-v16-latin-ext_latin-regular.woff2"
];
const files = (self.__precacheManifest || [])
  .map(x => x.url)
  .concat("/", CSSFILES);
const CACHE_VERSION = +new Date();
const CURRENT_CACHES = {
  prefetch: `prefetch-cache-v${CACHE_VERSION}`
};

async function cacheURLS() {
  const keys = await caches.keys();
  await Promise.all(
    keys.map(key => {
      if (!CURRENT_CACHES[key]) {
        return caches.delete(key);
      }
    })
  );
  const cache = await caches.open(CURRENT_CACHES.prefetch);
  await Promise.all(
    files.map(async url => {
      const req = new Request(new URL(url, location.href));
      if (await cache.match(req)) return console.log("Already cached");
      return fetch(req).then(response => {
        // simultaneous
        if (response.status >= 400) return;
        cache.put(url, response);
      });
    })
  );
  console.log("Pre-fetching complete.");
}

self.addEventListener("install", e => {
  e.waitUntil(
    (async () => {
      if ("skipWaiting" in self) {
        await self.skipWaiting();
      }
      return cacheURLS();
    })()
  );
});

function catchFetch(req) {
  try {
    return fetch(req);
  } catch (e) {
    throw new Error("[SW]Fetch Failed");
  }
}

/**
 *
 * @param {FetchEvent} e
 */
async function fetchListener(e) {
  const url = e.request.url;
  if (url.includes("/download")) {
    const u = new URLSearchParams(new URL(url).search);
    const id = u.get("id");
    const fn = u.get("fn");
    const resp = streamDownloader.responses.get(id);
    if (resp) {
      streamDownloader.responses.delete(id);
      return new Response(resp, {
        headers: new Headers({
          "content-type": "application/octet-stream",
          "content-disposition": `attachment;filename=${JSON.stringify(fn)}`
        })
      });
    } else {
      return new Response("Not Found", { status: 404 });
    }
  }
  if (["/encrypt", "/decrypt"].some(x => url.includes(x)))
    return (await caches.match("/")) || catchFetch("/");
  if (url.includes("/check-sw")) return catchFetch(e.request);
  const response = await caches.match(e.request);
  return response || (await catchFetch(e.request));
}
self.addEventListener("fetch", e => e.respondWith(fetchListener(e)));

if (self.clients && typeof self.clients.claim === "function") {
  self.addEventListener("activate", e => {
    e.waitUntil(self.clients.claim());
  });
} else {
  console.log("self.clients.claim() is not supported.");
}

/**
 *
 * @param {MessageEvent} e
 */
async function swOnMessage(e) {
  const { data, ports } = e;
  if (data.type === "update-shell") {
    const req = new Request(new URL("/", location.href));
    const resp = await catchFetch(req);
    const cache = await caches.open(CURRENT_CACHES.prefetch);
    await cache.put(req, resp);
    return ports[0].postMessage({ type: "updated-shell" });
  }
  if (data.type === "data-channel") {
    self.__port = ports[0];
    self.__port.postMessage({ type: "start" });
    streamDownloader.port = self.__port;
  }
}
self.addEventListener("message", swOnMessage);
