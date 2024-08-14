// File: firebase-messaging-sw.js
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js",
);

// Set Firebase configuration, once available
self.addEventListener("fetch", () => {
  try {
    const urlParams = new URLSearchParams(location.search);
    self.firebaseConfig = Object.fromEntries(urlParams);
  } catch (err) {
    console.error("Failed to add event listener", err);
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
  messaging = firebase.messaging.isSupported() ? firebase.messaging() : null;
} catch (err) {
  console.error("Failed to initialize Firebase Messaging");
}

// To dispaly background notifications
if (messaging) {
  try {
    messaging.onBackgroundMessage((payload) => {
      const notificationTitle = payload?.data?.title ?? "New Notification";
      const notificationOptions = {
        body: payload?.data?.message ?? "New Notification" + currentLocale,
        icon: "/next.svg",
      };

      if (payload.data.type.includes("RealTime")) {
        return;
      }

      self.addEventListener("notificationclick", function (event) {
        let url = "http://localhost:3000/en";
        if (payload.data.type === "Clinic\\NewOnlineAppointmentNotification") {
          url = "http://localhost:3000/en/doctor/appointment";
        }

        event.waitUntil(
          clients
            .matchAll({
              type: "window",
            })
            .then((clientList) => {
              for (const client of clientList) {
                if (client.url === url && "focus" in client)
                  return client.focus();
              }
              if (clients.openWindow) return clients.openWindow(url);
            }),
        );
      });

      return self.registration.showNotification(
        notificationTitle,
        notificationOptions,
      );
    });
  } catch (err) {
    console.log(err);
  }
}
