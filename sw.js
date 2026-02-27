const CACHE_NAME = 'rasgram-offline-v4';

// এখানে ফাইলের নামগুলো একদম হুবহু আপনার GitHub এর নামের মতো দিয়েছি
const urlsToCache = [
  './',
  './chat_indivisual.html', 
  './script.js',
  './webrtc_core.js', 
  './manifest.json',
  './developer.jpg',
  'https://unpkg.com/dexie/dist/dexie.js',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      // একটি একটি করে ফাইল ক্যাশ করবে, যাতে কোনো একটি ফেইল করলেও পুরো প্রসেস ক্র্যাশ না করে
      for (let url of urlsToCache) {
        try {
          await cache.add(url);
          console.log('Successfully cached:', url);
        } catch (e) {
          console.error('Failed to cache:', url, e);
        }
      }
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // ফায়ারবেস বা ক্লাউডিনারি এপিআই ক্যাশ করবো না
  if (event.request.url.includes('firestore.googleapis.com') || 
      event.request.url.includes('identitytoolkit.googleapis.com') ||
      event.request.url.includes('api.cloudinary.com')) {
    return; 
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    }).catch(() => {
      console.log('Offline and resource not found in cache:', event.request.url);
    })
  );
});
