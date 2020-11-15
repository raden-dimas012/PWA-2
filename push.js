var webPush = require("web-push");

const vapidKeys = {
    "publicKey": "BAyzUYrJfGOum9LtalPiDm-VuNKb_vbKSx9FBUfaxBRo5FApaU-l8d9ZvdLnhk7I-54sr7mCNKL2S-nKkQDO0zI",
    "privateKey": "lyIXgj1UcLRoralGrGXihIl_nvawtmIqI6mWZ0Y50hY",
}

webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/c5QPQ64F0zo:APA91bEm4zNaKcE3Hcb9MtKG_WHCpOvsj-0iPBs3NtFad_eAGLw7Aw6hCE5RU8ee8kVdSxZmr6T6S9A2E0eor3iNVd-v5VophVf4ag0pHKWfgHpCdfGaJ5eDpKCrfXAV_JvS-xw2dzUc",
    "keys": {
        "p256dh": "BEP0yV+9fjhm5b/GZb2Wy3t9iE1BhGzvT3DyEFq8I2t6CqU4BXF1wgHV4H4txvEGUyBV/B2Su/6vhKq/5o7VplM=",
        "auth": "g6VE5v1QvYhYFv0KCI6vjg=="
    }
}
var payload = "Hei Kamu Berhasil Push Notification"

var options = {
    gcmAPIKey: "280552238420",
    TTL: 60
}
webPush.sendNotification(
    pushSubscription,
    payload,
    options
)