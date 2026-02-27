// sw.js
const CACHE_NAME = 'rasgram-offline-cache-v1';
const urlsToCache = [
  './', // রুট ইউআরএল
  './chat_indivisual.html', // আপনার মেইন HTML ফাইল (নামটা হুবহু মেলাবেন)
  './script.js',
  './firebase-messaging-sw.js',
  './webrtc_core.js', // আপনার WebRTC ফাইল
  'https://cdn.tailwindcss.com', // Tailwind CSS
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css', // FontAwesome
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap', // Google Fonts
  // নিচে আপনার অ্যাপে ব্যবহৃত কিছু ডিফল্ট ছবি বা সাউন্ড যোগ করা হলো
  'https://ui-avatars.com/api/?name=RasGram&background=8696a0&color=fff&bold=true',
  'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg',
  'https://assets.mixkit.co/active_storage/sfx/2854/2854-preview.mp3',
  'https://assets.mixkit.co/active_storage/sfx/2803/2803-preview.mp3'
];

// ১. Install Event: ফাইলগুলো ক্যাশ করা
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache and caching files');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
         console.error('Failed to cache files during install:', error);
      })
  );
  // Service Worker সাথে সাথে কাজ শুরু করার জন্য
  self.skipWaiting(); 
});

// ২. Activate Event: পুরোনো ক্যাশ মুছে ফেলা
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

// ৩. Fetch Event: অফলাইনে ক্যাশ থেকে ডেটা দেখানো
self.addEventListener('fetch', (event) => {
  // ফায়ারবেস বা অন্যান্য API কলগুলো ক্যাশ করব না
  if (event.request.url.includes('firestore.googleapis.com') || 
      event.request.url.includes('identitytoolkit.googleapis.com') ||
      event.request.url.includes('api.cloudinary.com')) {
    return; // এগুলো নেটওয়ার্ক থেকেই লোড হবে
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // ক্যাশে থাকলে সেটা রিটার্ন করো, না হলে নেটওয়ার্ক থেকে আনো
        return response || fetch(event.request).then((fetchResponse) => {
            // ডায়নামিক ক্যাশিং (ইচ্ছে করলে চালু করতে পারেন)
            // return caches.open(CACHE_NAME).then((cache) => {
            //    cache.put(event.request, fetchResponse.clone());
            //    return fetchResponse;
            // });
            return fetchResponse;
        });
      })
      .catch(() => {
          // অফলাইনে থাকলে এবং ক্যাশে না পেলে যা দেখাবে (যেমন অফলাইন পেজ)
          // return caches.match('./offline.html');
      })
  );
});