const V = 'daily-reset-v6';
const CORE = ['/app/', '/app/index.html', '/app/vi.html', '/app/manifest.webmanifest', '/app/icon-192.png', '/app/icon-512.png', '/css/fonts.css', '/css/style.css', '/img/herofinal-mobile.webp'];
self.addEventListener('install', e => { e.waitUntil(caches.open(V).then(c => Promise.all(CORE.map(u => c.add(u).catch(() => null)))).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const r = e.request; if (r.method !== 'GET') return;
  const u = new URL(r.url); if (u.origin !== location.origin) return;
  const p = u.pathname;
  if (!(p.startsWith('/app/') || p.startsWith('/css/') || p.startsWith('/fonts/') || p === '/img/herofinal-mobile.webp')) return;
  e.respondWith(fetch(r).then(res => { if (res && res.ok) { const cp = res.clone(); caches.open(V).then(c => c.put(r, cp)); } return res; })
    .catch(() => caches.match(r, {ignoreSearch: true}).then(m => m || caches.match('/app/index.html'))));
});
