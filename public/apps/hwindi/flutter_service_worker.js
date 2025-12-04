'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "3a821c66ad81fcf8c0196788cd4ce396",
"version.json": "e1cdcd52790606d75182aef4a14fbe39",
"index.html": "c8fbae443193f327768375703c35f9ff",
"/": "c8fbae443193f327768375703c35f9ff",
"main.dart.js": "7fdfe6ff4b0041e33b28f4fe4ca9d9ad",
"flutter.js": "888483df48293866f9f41d3d9274a779",
"favicon.png": "7a26ea9d4e61122fc023b84e5acdb148",
"icons/Icon-192.png": "12d05db1c0b26d429b54e3f8c946a496",
"icons/favicon.png": "7a26ea9d4e61122fc023b84e5acdb148",
"icons/Icon-512.png": "aabba36693aba0ec8d954adf297d3125",
"manifest.json": "77d294fd48a0fa47a4d409193253ffe3",
"assets/AssetManifest.json": "1b4d78c0aea33a6cb634269d3c20bb06",
"assets/NOTICES": "3f2d59ddc5e0f537eff6fbb985beccf7",
"assets/FontManifest.json": "3e1e9bd4e6aba4512fb919ed423009a1",
"assets/AssetManifest.bin.json": "63ab4486ae9bf8efdf4038b9a4a019c4",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "7e8aca251ac57a5f7ef237591b045585",
"assets/packages/fluttertoast/assets/toastify.js": "56e2c9cedd97f10e7e5f1cebd85d53e3",
"assets/packages/fluttertoast/assets/toastify.css": "a85675050054f179444bc5ad70ffc635",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "c473a74ab2ea49305ea3d2e4a52df03d",
"assets/fonts/Inter-Medium.ttf": "16580ed788273749548eb27b9a9b674f",
"assets/fonts/Inter-Light.ttf": "60c8f64064078554b6469eeda25944eb",
"assets/fonts/Inter-Bold.ttf": "d17c0274915408cee0308d5476df9f45",
"assets/fonts/Inter-Regular.ttf": "a4a7379505cd554ea9523594b7c28b2a",
"assets/fonts/Inter-ExtraBold.ttf": "e771faf703386b0c5863cc3df1e26ba1",
"assets/fonts/Inter-Black.ttf": "10215142a203211d9292c62ae0503a97",
"assets/fonts/MaterialIcons-Regular.otf": "93b140a467540e5b9939f3a6b98d8fd2",
"assets/fonts/Inter-SemiBold.ttf": "1753a05196abeef95c32f10246bd6473",
"assets/assets/images/me.png": "66c8ef1c26aa14d9f04c3c78c007aa5a",
"assets/assets/images/car-white.png": "d2dd5ad3ee1d4df4a62b6e3a9679e133",
"assets/assets/images/logo.png": "7347fe01902797c0fd47d1a4e71ecd7f",
"assets/assets/images/car.jpg": "e9166e34f8ea8a1a8d9ff906229020fe",
"assets/assets/icons/trips.png": "21493b1561a159e4257e5a3941e52fc0",
"assets/assets/icons/settings.png": "ed6c78123468217b9c079c88d40fa2af",
"assets/assets/icons/destination.png": "54ad7323abb9127f86a37e4e101bb57f",
"assets/assets/icons/home.png": "37a27e82a0bab1c70f19e54f485326a4",
"assets/assets/icons/account.png": "80351afcfa69653be79b823429b0c29b",
"assets/assets/icons/distance.png": "c5bb4707450880215783b7720c95c546",
"assets/assets/icons/search.png": "6d418e916041b16e401fefc3eac1b5f7",
"assets/assets/icons/menu.png": "7842bd52f144b7b306bdd639aa698eb6",
"assets/assets/icons/bookmark.png": "3f8b659c3603bcc2d12a261b9c40bf9a",
"assets/assets/icons/location.png": "fbf7520828e336dc69c1be0f432fb708",
"assets/assets/icons/messages.png": "b15ebbc5460d8bc060111a2cfb3b42c4",
"assets/assets/lottie/searching-connection.json": "a66bce31a0573a13ec01963efa941fd8",
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
