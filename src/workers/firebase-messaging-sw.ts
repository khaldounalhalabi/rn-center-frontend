/// <reference lib="webworker" />

import { USER_KEY } from "@/components/providers/UserProvider";
import { NotificationPayload } from "@/models/NotificationPayload";
import { User } from "@/models/User";
import firebase from "firebase/compat/app";
import "firebase/compat/messaging";

declare const self: ServiceWorkerGlobalScope;

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APP_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notification = new NotificationPayload(payload?.data ?? {});
  const notificationTitle = notification.title;

  const notificationOptions: NotificationOptions = {
    body: notification.messageEn ?? "New Notification",
    icon: "/app-icon.png",
  };

  if (notification.isRealTimeEvent()) {
    return;
  }

  let url = `${APP_URL}/en`;

  const userData = window.localStorage.getItem(USER_KEY);
  if (userData) {
    let user;
    try {
      user = JSON.parse(userData) as User;
    } catch (error) {
      console.log(
        `Failed to parse user data [${userData}] from local storage within firebase service worker`,
      );
    }

    if (user) {
      url = notification.getUrl(user.role, user.permissions ?? []);
    }
  }

  self.registration.showNotification(notificationTitle, notificationOptions);

  self.addEventListener("notificationclick", (event) => {
    event.waitUntil(
      self.clients
        .matchAll({ type: "window", includeUncontrolled: true })
        .then((clientList) => {
          for (const client of clientList) {
            if ("focus" in client) {
              return client.focus();
            }
          }

          if (self.clients.openWindow) {
            return self.clients.openWindow(url);
          }
        }),
    );
  });
});
