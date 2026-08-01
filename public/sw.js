self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  // A simple pass-through fetch handler.
  // This is the minimum requirement to pass the Chrome PWA installation criteria.
  event.respondWith(fetch(event.request));
});
