/// <reference lib="webworker" />
export {}; // ensures this file is treated as a module

declare const self: ServiceWorkerGlobalScope;

import { getNestedPropertyValue } from "@/helpers/ObjectHelpers";
// You can now import real firebase packages (matches your package.json version)
// instead of the CDN importScripts calls.
import firebase from "firebase/compat/app";
import "firebase/compat/messaging";

const defaultConfig = {
  apiKey: true,
  projectId: true,
  messagingSenderId: true,
  appId: true,
};

self.addEventListener("fetch", () => {
  try {
    const urlParams = new URLSearchParams(location.search);
    (self as any).firebaseConfig = Object.fromEntries(urlParams);
  } catch (err) {
    console.error("Failed to add event listener", err);
  }
});

firebase.initializeApp((self as any).firebaseConfig ?? defaultConfig);

let messaging: firebase.messaging.Messaging | null = null;
try {
  messaging = firebase.messaging.isSupported() ? firebase.messaging() : null;
} catch (err) {
  console.error("Failed to initialize Firebase Messaging", err);
}

function getFromData(data: string | undefined, key: string) {
  return getNestedPropertyValue(JSON.parse(data ?? "{}"), key);
}

// This is a build-time constant — see the esbuild `define` step below.
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

if (messaging) {
  messaging.onBackgroundMessage((payload) => {
    const notificationTitle = payload?.data?.title ?? "New Notification";
    const notificationOptions: NotificationOptions = {
      body: payload?.data?.message_en ?? "New Notification",
      icon: "/next.svg",
    };

    if (payload.data?.type?.includes("RealTime")) {
      return;
    }

    self.addEventListener("notificationclick", (event) => {
      let url = `${APP_URL}/en`;

      if (payload?.data?.type === "Clinic\\NewOnlineAppointmentNotification") {
        url = `${APP_URL}/en/doctor/appointment/${getFromData(payload?.data?.data, "appointment_id")}`;
      } else if (
        payload?.data?.type.includes(
          "Customer\\AppointmentRemainingTimeNotification",
        ) ||
        payload?.data?.type.includes(
          "Customer\\CustomerAppointmentChangedNotification",
        )
      ) {
        url = `${APP_URL}/en/customer/appointments/${getFromData(payload?.data?.data, "appointment_id")}`;
      }

      event.waitUntil(
        self.clients.matchAll({ type: "window" }).then((clientList) => {
          for (const client of clientList) {
            if (client.url === url && "focus" in client) return client.focus();
          }
          if (self.clients.openWindow) return self.clients.openWindow(url);
        }),
      );
    });

    return self.registration.showNotification(
      notificationTitle,
      notificationOptions,
    );
  });
}
