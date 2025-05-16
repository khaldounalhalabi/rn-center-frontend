"use client";
import firebaseApp from "@/helpers/Firebase";
import {
  NotificationPayload,
  NotificationPayloadData,
} from "@/models/NotificationPayload";
import { getMessaging, onMessage } from "firebase/messaging";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";
import { Navigate } from "@/actions/Navigate";
import { useTranslations } from "next-intl";

export const NotificationsHandlersContext = createContext<Dispatch<
  SetStateAction<Handler[]>
> | null>(null);

export interface Handler {
  fn: (payload: NotificationPayload) => void;
  key?: string;
  is_active: boolean;
  is_permenant: boolean;
}

const NotificationProvider = ({
  children,
  handle = undefined,
}: {
  handle?: (payload: NotificationPayload) => void;
  children?: ReactNode;
}) => {
  const [handlers, setHandlers] = useState<Handler[]>([]);
  const t = useTranslations("components")

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      const messaging = getMessaging(firebaseApp);
      const unsubscribe = onMessage(messaging, (payload) => {
        const notification = new NotificationPayload(
          payload.collapseKey,
          payload?.data as NotificationPayloadData | undefined,
          payload.from,
          payload.messageId,
        );

        handlers.forEach((handler) => {
          handler.fn(notification);
        });
        if (notification.isNotification()) {
          toast(t("new_notification"), {
            description: notification?.data?.message,
            action: {
              label: t("show"),
              onClick: () => {
                Navigate(notification.getUrl());
              },
            },
          });
        }

        if (handle) {
          handle(notification);
        }
      });
      return () => {
        unsubscribe(); // Unsubscribe from the onMessage event
      };
    }
  }, [handlers]);

  return (
    <NotificationsHandlersContext.Provider value={setHandlers}>
      {children}
    </NotificationsHandlersContext.Provider>
  );
};

export default NotificationProvider;
