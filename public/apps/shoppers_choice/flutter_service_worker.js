'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "0e22033c47f81dc9bd704e7f5677c865",
"version.json": "6d361bd5bf522df286fa7597b9ae0971",
"splash/splash.js": "123c400b58bea74c1305ca3ac966748d",
"splash/style.css": "2e6df68c18efc965e0beb1b72c5b4ae9",
"index.html": "b26cbb11b3b304aa80f0660d9037a075",
"/": "b26cbb11b3b304aa80f0660d9037a075",
"main.dart.js": "ed5272b251ac43a1bb9d00e2799bd284",
"flutter.js": "888483df48293866f9f41d3d9274a779",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "a3d361c406b625f5e321b63071dcedaa",
"assets/AssetManifest.json": "0426b6bbc30fb3131773711a8c2b41c1",
"assets/NOTICES": "4470e1c4a08f76bc379d25d57c2bb357",
"assets/FontManifest.json": "7163cec1a6d9ea6cad6c319b15423f92",
"assets/AssetManifest.bin.json": "8006165400ac83273fd1f79785c0a383",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "5f72d664707e4d711a1c0c240912cd50",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "e56db89e149db5deab99d120e86c5ad9",
"assets/fonts/Netflix/NetflixSans-Regular.otf": "d82776d71100f53b46b4279a4cf1ce9e",
"assets/fonts/Netflix/NetflixSans-Medium.otf": "031c5ae8c3d3527dc5185dbc3db2ce90",
"assets/fonts/Netflix/NetflixSans-Light.otf": "326c9933d5f0796e6993ced11128ae24",
"assets/fonts/Netflix/NetflixSans-Bold.otf": "aa2fa7644f8fad04be6b4849c62f9b76",
"assets/fonts/MaterialIcons-Regular.otf": "fa11df26580cbf1489860b69656823c8",
"assets/fonts/Poppins/Poppins-ExtraLight.ttf": "6f8391bbdaeaa540388796c858dfd8ca",
"assets/fonts/Poppins/Poppins-Light.ttf": "fcc40ae9a542d001971e53eaed948410",
"assets/fonts/Poppins/Poppins-Medium.ttf": "bf59c687bc6d3a70204d3944082c5cc0",
"assets/fonts/Poppins/Poppins-ExtraBold.ttf": "d45bdbc2d4a98c1ecb17821a1dbbd3a4",
"assets/fonts/Poppins/Poppins-Regular.ttf": "093ee89be9ede30383f39a899c485a82",
"assets/fonts/Poppins/Poppins-Bold.ttf": "08c20a487911694291bd8c5de41315ad",
"assets/fonts/Poppins/Poppins-Black.ttf": "14d00dab1f6802e787183ecab5cce85e",
"assets/fonts/Poppins/Poppins-Thin.ttf": "9ec263601ee3fcd71763941207c9ad0d",
"assets/fonts/Poppins/Poppins-SemiBold.ttf": "6f1520d107205975713ba09df778f93f",
"assets/assets/images/ok.png": "0366fe2cddc7555d421bc169ee573bfd",
"assets/assets/images/banner_1.png": "bab24f2b11e2bab5442448a9ee667050",
"assets/assets/images/shoppers_choice_logo_white.png": "7c9a1ec38bda197874b151d57bee235c",
"assets/assets/images/shoppers_choice_logo.png": "aa454755e861f0be314f6fd64a476bb3",
"assets/assets/images/banner_2.png": "e3be4e8ee0cc9a2bb2bcfa927f6ac48b",
"assets/assets/images/banner_3.png": "4f7a79b97470e8f18d1218d1f7588c55",
"assets/assets/images/contitouch-logo-white.png": "4ddfcaa7bfec692377baf839eb50f990",
"assets/assets/images/splash.png": "3414132e139ea237138c331480375d94",
"assets/assets/images/shoppers_choice_logo_splashed.png": "c70a1b79c513de3e396d72eb6a992fe5",
"assets/assets/images/bon_marche.png": "8b4ce8d18a666b2cc161e55d9256ab92",
"assets/assets/images/woman.png": "5971d57c7d56eb7c0da95102adce99c7",
"assets/assets/images/shoppers_choice_logo_gray.png": "d37efa730e4a5408209d8b89906a8d66",
"assets/assets/images/okmart.png": "58d8ed8582a550818c2a97f62c0d9866",
"assets/assets/images/okmart.jpg": "0edd3e57815529261e34d9a72d2cb57a",
"assets/assets/icons/horse.png": "131b67f66f78eaa18cf627ed5fae2887",
"assets/assets/icons/calendar%2520w.png": "4c60c054411fc359009bdb9865aa638a",
"assets/assets/icons/horse%2520w.png": "dfb93f5a292ae974b81493c4b0ab7b7b",
"assets/assets/icons/tokenization%2520w.png": "06f7d8567c6688c0880488bc2ef66e95",
"assets/assets/icons/terms_and_conditions_white.png": "216d95da8e9759240a8f9bb7b2c6823e",
"assets/assets/icons/tokenization.png": "78800f58b7614d5b84f9807f3eb535c0",
"assets/assets/icons/win-win.png": "14b71fd6d2a5b10bd5a8c256e28f9bda",
"assets/assets/icons/calendar.png": "edab7be30f3ced42fe849453567acf8d",
"assets/assets/icons/success.png": "e11cc06313598f1a3afae97394946865",
"assets/assets/icons/faq%2520w.png": "488d33a884160b6bb4a24b9e27d09e8b",
"assets/assets/icons/faq.png": "b42c7de51b466c4e58821884ad26d2da",
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
