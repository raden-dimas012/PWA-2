importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

var urlToCache = [
    { url: "/", revision: "1" },
    { url: "/nav.html", revision: "1" },
    { url: "/index.html", revision: "1" },
    { url: "/manifest.json", revision: "1" },
    { url: "/push.js", revision: "1" },
    { url: "/package.json", revision: "1" },
    { url: "/package-lock.json", revision: "1" },
    { url: "/pages/home.html", revision: "1" },
    { url: "/pages/teams.html", revision: "1" },
    { url: "/pages/savedTeams.html", revision: "1" },
    { url: "/css/materialize.min.css", revision: "1" },
    { url: "/js/materialize.min.js", revision: "1" },
    { url: "/js/nav.js", revision: "1" },
    { url: "/js/api.js", revision: "1" },
    { url: "/js/idb.js", revision: "1" },
    { url: "/js/db.js", revision: "1" },
    { url: "/js/home.js", revision: "1" },
    { url: "/js/teams.js", revision: "1" },
    { url: "/js/savedTeams.js", revision: "1" },
    { url: "/js/register.js", revision: "1" },
    { url: "/icons/icon-512.png", revision: "1" },
    { url: "/icons/icon-256.png", revision: "1" },
    { url: "/icons/icon-128.png", revision: "1" },
    { url: "/icons/icon-64.png", revision: "1" },
    { url: "/icons/icon-32.png", revision: "1" },
]

workbox.precaching.precacheAndRoute(
    urlToCache
    , {
        ignoreUrlParametersMatching: [/.*/]
    })

if (workbox) {
    console.log('Workbox berhasil dimuat');
    workbox.precaching.precacheAndRoute(urlToCache)

    workbox.routing.registerRoute(
        /.*(?:png|gif|jpg|jpeg|svg)$/,
        workbox.strategies.cacheFirst({
            cacheName: 'images',
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200]
                }),
                new workbox.expiration.Plugin({
                    maxentries: 100,
                    maxAgeSeconds: 30 * 24 * 60 * 60
                })
            ]
        })
    )
    workbox.routing.registerRoute(
        new RegExp("https://api.football-data.org/v2/"),
        workbox.strategies.staleWhileRevalidate()
    )
    workbox.routing.registerRoute(
        /.*(?:googleapis|gstatic)\.com/,
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'google-fonts'
        })
    )
} else {
    console.log("Workbox gagal dimuat")
}

self.addEventListener('push', function (event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = "Push Message No Payload";
    }
    var options = {
        body: body,
        vibrate: [100, 50, 100],
        data: {
            dateArrival: Date.now(),
            primaryKey: 1
        }
    }
    event.waitUntil(
        self.registration.showNotification("Push Notification", options)
    )
})