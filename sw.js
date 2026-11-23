// 한 번 열면 인터넷 없이도 열리도록 파일을 저장해 두는 서비스 워커
const CACHE = 'eng-bird-v3';
const CACHE_PREFIX = 'eng-bird-';
const FILES = [
  './', 'index.html', 'manifest.json', 'css/style.css', 'fonts/Jua.woff2', 'libs/confetti.js',
  'js/app.config.js', 'js/data.js', 'js/scenes.js', 'js/core.js', 'js/games1.js', 'js/games2.js',
  'js/games3.js', 'js/stickers.js', 'js/parent.js', 'js/start.js', 'js/app.js', 'js/single.js', 'sounds/correct.mp3',
  'sounds/pop.mp3', 'sounds/sparkle.mp3', 'sounds/tap.mp3', 'sounds/try-again.mp3', 'sounds/win.mp3', 'icons/icon-192.png',
  'icons/icon-512.png', 'images/bg/beach.webp', 'images/bg/farm.webp', 'images/bg/forest.webp', 'images/bg/night.webp', 'images/bg/savanna.webp',
  'images/ant.webp', 'images/bee.webp',
  'images/bird.webp', 'images/butterfly.webp',
  'images/cow.webp',
  'images/dragon.webp',
  'images/duck.webp', 'images/eagle.webp', 'images/elephant.webp', 'images/flamingo.webp',
  'images/giraffe.webp', 'images/girl.webp',
  'images/hummingbird.webp',
  'images/ladybug.webp',
  'images/lion.webp',
  'images/octopus.webp', 'images/ostrich.webp', 'images/owl.webp',
  'images/parrot.webp', 'images/peacock.webp', 'images/pelican.webp',
  'images/pig.webp', 'images/pigeon.webp', 'images/rabbit.webp',
  'images/rooster.webp', 'images/seagull.webp',
 
  'images/starfish.webp', 'images/stego.webp',
  'images/stork.webp', 'images/swan.webp', 'images/toucan.webp', 'images/trex.webp',
  'images/turtle.webp', 'images/unicorn.webp', 'images/whale.webp',
  'images/woodpecker.webp', 'images/zebra.webp', 'images/scenes/bird.webp', 'images/scenes/bug.webp',
  'images/scenes/dino.webp', 'images/scenes/farm.webp', 'images/scenes/sea.webp', 'images/scenes/wild.webp',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith(CACHE_PREFIX) && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  // 인터넷이 되면 최신 파일, 안 되면 저장해 둔 파일을 쓴다
  e.respondWith(fetch(e.request, { cache: 'no-cache' }).then(res => {   // 브라우저가 저장해 둔 옛 파일 대신 늘 새 파일을 확인한다
    if (res.ok && new URL(e.request.url).origin === location.origin) {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
    }
    return res;
  }).catch(() => caches.match(e.request)));
});
