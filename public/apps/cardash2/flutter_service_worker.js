'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "b62974bd3f9c5cf7db00e5bd536352e9",
"version.json": "0baedb02fa07dca10072bf77b6d4bfe0",
"index.html": "f42a9cc76a8c31245235cc22e1995548",
"/": "f42a9cc76a8c31245235cc22e1995548",
"main.dart.js": "bada1785904b2b9d3e62216ffba9059a",
"flutter.js": "888483df48293866f9f41d3d9274a779",
"favicon.png": "7a26ea9d4e61122fc023b84e5acdb148",
"icons/Icon-192.png": "12d05db1c0b26d429b54e3f8c946a496",
"icons/favicon.png": "7a26ea9d4e61122fc023b84e5acdb148",
"icons/Icon-512.png": "aabba36693aba0ec8d954adf297d3125",
"manifest.json": "b9d68d6e4310c4c0a2b372d2c8da5756",
"assets/AssetManifest.json": "13fbe04dc0854938137fb2d6747f5b5d",
"assets/NOTICES": "380841d6cd007593eaabe7e40528514a",
"assets/FontManifest.json": "3e1e9bd4e6aba4512fb919ed423009a1",
"assets/AssetManifest.bin.json": "27899b4f6fc7c90d62ac8a025b93de98",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6cbf91a60b00ec0b6d54de9f68ab7b50",
"assets/packages/flutter_map/lib/assets/flutter_map_logo.png": "208d63cc917af9713fc9572bd5c09362",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "cce96d86c67ea8a480b45569eccff58a",
"assets/fonts/Inter-Medium.ttf": "16580ed788273749548eb27b9a9b674f",
"assets/fonts/Inter-Light.ttf": "60c8f64064078554b6469eeda25944eb",
"assets/fonts/Inter-Bold.ttf": "d17c0274915408cee0308d5476df9f45",
"assets/fonts/Inter-Regular.ttf": "a4a7379505cd554ea9523594b7c28b2a",
"assets/fonts/Inter-ExtraBold.ttf": "e771faf703386b0c5863cc3df1e26ba1",
"assets/fonts/Inter-Black.ttf": "10215142a203211d9292c62ae0503a97",
"assets/fonts/MaterialIcons-Regular.otf": "1ad4d3ae916ffc61d4b443956a45e3fa",
"assets/fonts/Inter-SemiBold.ttf": "1753a05196abeef95c32f10246bd6473",
"assets/assets/images/spotify.png": "30734286739accec0facebf124553219",
"assets/assets/images/face.png": "d807a51bd0238435f5271afb98266400",
"assets/assets/images/honda.png": "5c9b53de043891beaea3dc5c8ad9845b",
"assets/assets/images/cloud.jpg": "543530cd22e898bea69116e024e470b2",
"assets/assets/images/mai-linda.jpg": "4298c24e12c91463ba4c18ba3341a995",
"assets/assets/icons/car-handbrake.png": "39bf86868f8641416871a76cc29f4f96",
"assets/assets/icons/bluetooth.png": "06effac3c5da24124e78c84af03b10f9",
"assets/assets/icons/car-wiper.png": "7b147cd36ca98d4959d5b3533867787c",
"assets/assets/icons/battery.png": "bec2693dafdd1291f5ce6e20cb57561d",
"assets/assets/icons/car-belt.png": "4cccc155f96f0b50ed961a3f58d97f5c",
"assets/assets/icons/car-temp.png": "da7d6062f08fcfd7571818c175308057",
"assets/assets/icons/home.png": "e6b4e12064a68b93f5b4320d690854fc",
"assets/assets/icons/car-abs.png": "eb994cf122cc326c24f725bcf781214d",
"assets/assets/icons/repeat.png": "9553b7b61ae5584767c5c1b52efc6979",
"assets/assets/icons/mic-record.png": "8b938076874325e11e8fc0fa93fec0d2",
"assets/assets/icons/car-high-beam.png": "c65842962d702b6b15ac0024d486af6e",
"assets/assets/icons/shuffle.png": "f7e459e9666cabb5ba04fd4bd5239420",
"assets/assets/icons/pause.png": "9d6973f591ea4a0e7cf181c48642a192",
"assets/assets/icons/car.png": "95048f57c63ad2540bb44df1ea923800",
"assets/assets/icons/location.png": "2ae4d56cbe19cc6d7a21ae541b8d8407",
"assets/assets/icons/next.png": "7075abd40d37bd20540dee711a938ce3",
"assets/assets/icons/location-alt.png": "5fc2d7faaf8cf30bf35c065894eb79c3",
"assets/assets/icons/car-low-beam.png": "a8e8428e56f1aa6bb3abb561047eb06d",
"assets/assets/icons/network.png": "04ec86a6a7466abe3d6dff24e971d7a1",
"assets/assets/icons/more.png": "05bed0fc652b71aeb2d72b49c248f313",
"assets/assets/icons/send.png": "dd2947fd516050c236d9d3039f0461da",
"assets/assets/icons/car-battery.png": "9f2fa5cfe1f5baf2ac657b8b2d709ba5",
"assets/assets/icons/previous.png": "1ec37690d6d6a8d9dda12452b4c56bda",
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
