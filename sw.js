const V='purple3d-v13',CORE=['./','index.html','app.html','static/css/style.css','static/js/purple3d.js','manifest.webmanifest','static/assets/purple.svg','static/assets/icon-192.png','static/assets/icon-512.png','static/fonts/inter-latin.woff2','static/fonts/inter-latin-ext.woff2','static/fonts/instrument-serif-italic-latin.woff2','static/js/modules/registry.json'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(async c=>{await c.addAll(CORE);
try{const ms=await (await fetch('static/js/modules/registry.json')).json();await c.addAll(ms.map(m=>'static/js/modules/'+m.id+'.js').concat(ms.map(m=>'app.html?m='+m.id)))}catch(x){}}).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
e.respondWith(caches.match(e.request).then(h=>{const f=fetch(e.request).then(r=>{if(r&&(r.ok||r.type==='opaque')){const cp=r.clone();caches.open(V).then(c=>c.put(e.request,cp))}return r}).catch(()=>h);return h||f}))});
