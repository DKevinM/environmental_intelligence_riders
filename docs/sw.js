// Intentionally does no caching. This report must always show live data,
// so the only job of this file is to satisfy Chrome/Android's PWA
// installability check (which requires a registered service worker with a
// fetch handler) - every request just falls through to the network.
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", () => {
  // No respondWith() call - the browser handles the request normally.
});
