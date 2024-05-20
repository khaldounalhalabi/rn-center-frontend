// File: firebase-messaging-sw.js
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

// Set Firebase configuration, once available
self.addEventListener('fetch', () => {
    try {
        const urlParams = new URLSearchParams(location.search);
        self.firebaseConfig = Object.fromEntries(urlParams);
    } catch (err) {
        console.error('Failed to add event listener', err);
    }
});

// "Default" Firebase configuration (prevents errors)
const defaultConfig = {
    apiKey: true,
    projectId: true,
    messagingSenderId: true,
    appId: true,
};

// Initialize Firebase app
// eslint-disable-next-line no-undef
firebase.initializeApp(self.firebaseConfig || defaultConfig);
let messaging;
try {
    // eslint-disable-next-line no-undef
    messaging = firebase.messaging.isSupported() ? firebase.messaging() : null
} catch (err) {
    console.error('Failed to initialize Firebase Messaging');
}

// To dispaly background notifications
if (messaging) {
    try {
        messaging.onBackgroundMessage((payload) => {
            const notificationTitle = payload?.data?.title ?? "New Notification";
            const notificationOptions = {
                body: payload?.data?.message ?? "New Notification",
                icon: "/next.svg"
            };

            return self.registration.showNotification(notificationTitle,
                notificationOptions);
        });
    } catch (err) {
        console.log(err);
    }
}