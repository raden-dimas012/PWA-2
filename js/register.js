if ("serviceWorker" in navigator) {
    registerServiceWorker();
    requestPermission();

} else {
    console.log("not supported on this platform");
}

function registerServiceWorker() {
    window.addEventListener('load', function () {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .then(function (registration) {
                console.log("service worker berhasil di registrasi");
                return registration;
            })
            .catch(function (err) {
                console.log("service worker gagal di registrasi", err);
            })
    })
}

function requestPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(res => {
            if (res === "denied") {
                console.log("Permission denied");
                return;
            } else if (res === "default") {
                console.log("User closed dialog");
                return;
            }
        })
    }
}

navigator.serviceWorker.ready.then(() => {
    if (('PushManager' in window)) {

        navigator.serviceWorker.getRegistration().then(registration => {
            registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array("BAyzUYrJfGOum9LtalPiDm-VuNKb_vbKSx9FBUfaxBRo5FApaU-l8d9ZvdLnhk7I-54sr7mCNKL2S-nKkQDO0zI")
            }).then(subscribe => {
                console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint)
                console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                    null, new Uint8Array(subscribe.getKey('p256dh')))))
                console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                    null, new Uint8Array(subscribe.getKey('auth')))))
            }).catch(err => console.log(err))
        })
    }
})

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/')
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}