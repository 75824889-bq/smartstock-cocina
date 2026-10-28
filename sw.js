/* Smart Stock - service worker. Cambie V en cada versión nueva. */
var V="smartstock-cocina-1.3";
var FILES=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","apple-touch-icon.png","logo-horizontal.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(V).then(function(c){return c.addAll(FILES)}));self.skipWaiting()});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!=V}).map(function(k){return caches.delete(k)}))}));self.clients.claim()});
self.addEventListener("fetch",function(e){if(e.request.method!="GET")return;
 e.respondWith(fetch(e.request).then(function(r){if(r&&r.ok){var c=r.clone();caches.open(V).then(function(x){x.put(e.request,c)})}return r}).catch(function(){return caches.match(e.request).then(function(r){return r||caches.match("index.html")})}))});
