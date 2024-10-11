import en from "./../../messages/ar.json";

type Messages = typeof en;

declare namespace firebase {
  namespace messaging {
    interface Messaging {
      useServiceWorker(registration: ServiceWorkerRegistration): void;

      requestPermission(): Promise<void>;

      getToken(): Promise<string>;

      onMessage(callback: (payload: any) => void): void;
    }
  }
}

declare global {
  interface IntlMessages extends Messages {}
}
