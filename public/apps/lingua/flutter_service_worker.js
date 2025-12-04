'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "fae8d4fb937ae29a49c347531ce69aac",
"version.json": "8fa9934be3e54d529b81885777a77806",
"index.html": "3552bf7709c3bae432468ff9a64ea511",
"/": "3552bf7709c3bae432468ff9a64ea511",
"main.dart.js": "010e3e7c69b0a89a4af42ff2f2721f7f",
"flutter.js": "888483df48293866f9f41d3d9274a779",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "313e102dfb7d82af21f0c4da2b7ba332",
"assets/AssetManifest.json": "1c861219b5fe4a5aa74dda039a60caee",
"assets/NOTICES": "1e7191e5ce47ad220350695753684ce4",
"assets/FontManifest.json": "474d9e3d00e40db9a6bbcbf6e458219a",
"assets/AssetManifest.bin.json": "608493095eef0ea80690d3d99a2afc53",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "33b7d9392238c04c131b6ce224e13711",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "2422c4cdbc84039cf8ee25aa4ca8d0ce",
"assets/fonts/Poppins-Medium.ttf": "f61a4eb27371b7453bf5b12ab3648b9e",
"assets/fonts/MaterialIcons-Regular.otf": "328a1079c1f8ee83d7f172a422d668e8",
"assets/assets/letters/k.png": "b0c435888d156629af25d42ae88d4f2c",
"assets/assets/letters/j.png": "28cc6e7bbaa0f37f55e7efeb0fe17810",
"assets/assets/letters/h.png": "1e3b793287b18e181795d8b4453d887f",
"assets/assets/letters/i.png": "b244ceaaff7c62a8f24c9b5165136b83",
"assets/assets/letters/z.png": "ae8668b54c7f939fb389317a055551d9",
"assets/assets/letters/m.png": "bcf46c75f62bc968e98aa33a7243ba8b",
"assets/assets/letters/l.png": "a3d8ce531490a7e1ba6af9bd72a5a9ac",
"assets/assets/letters/y.png": "82bfdded1f57d5a6df500da94e99cf29",
"assets/assets/letters/n.png": "d921166df8ff1cd4ec23f22c8a779ffa",
"assets/assets/letters/o.png": "6c05a93d4c483e42adbfd4a4fe2ebe0f",
"assets/assets/letters/x.png": "7a457b4f1294b53a5816d3b9052a6198",
"assets/assets/letters/u.png": "36365a2893d49afac65ec63a89924b65",
"assets/assets/letters/b.png": "f3cc92910b119ec6b351b4ac27e58211",
"assets/assets/letters/c.png": "318f055133a66bdd343f4111719e9f61",
"assets/assets/letters/t.png": "255b7287be8df243ff5ef991379fb114",
"assets/assets/letters/v.png": "665db27155f764d60564f090e11c21fb",
"assets/assets/letters/a.png": "afbe25e29035e8f973cfc0f20a134b8f",
"assets/assets/letters/w.png": "0465b5817b1f8ec0e0dd1d18ea6276f1",
"assets/assets/letters/d.png": "ccd1880e82354f090d5d081e806bf339",
"assets/assets/letters/s.png": "349b2c386c49562a7548222a7a8cdfee",
"assets/assets/letters/r.png": "26f65a98bcb0d2d33284a7c8d677105e",
"assets/assets/letters/e.png": "d0afa2e19d2ac2de88409aaac727befa",
"assets/assets/letters/g.png": "e64130ff39e4b2323eb084e5f93708c2",
"assets/assets/letters/p.png": "a7489e51fcad0222c00dba06a4c03f00",
"assets/assets/letters/q.png": "79f38c2aec80f6615445e97f28404552",
"assets/assets/letters/f.png": "5bfe0d6fafc6b6eb014556596b8718b4",
"assets/assets/data/letters.json": "92ab132d07e2cf4f5b928ebc92ff83d1",
"canvaskit/skwasm.js": "1ef3ea3a0fec4569e5d531da25f34095",
"canvaskit/skwasm_heavy.js": "413f5b2b2d9345f37de148e2544f584f",
"canvaskit/skwasm.js.symbols": "0088242d10d7e7d6d2649d1fe1bda7c1",
"canvaskit/canvaskit.js.symbols": "58832fbed59e00d2190aa295c4d70360",
"canvaskit/skwasm_heavy.js.symbols": "3c01ec03b5de6d62c34e17014d1decd3",
"canvaskit/skwasm.wasm": "264db41426307cfc7fa44b95a7772109",
"canvaskit/chromium/canvaskit.js.symbols": "193deaca1a1424049326d4a91ad1d88d",
"canvaskit/chromium/canvaskit.js": "5e27aae346eee469027c80af0751d53d",
"canvaskit/chromium/canvaskit.wasm": "24c77e750a7fa6d474198905249ff506",
"canvaskit/canvaskit.js": "140ccb7d34d0a55065fbd422b843add6",
"canvaskit/canvaskit.wasm": "07b9f5853202304d3b0749d9306573cc",
"canvaskit/skwasm_heavy.wasm": "8034ad26ba2485dab2fd49bdd786837b"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
