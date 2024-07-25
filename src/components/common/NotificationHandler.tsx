"use client";

import { Navigate } from "@/Actions/navigate";
import firebaseApp from "@/Helpers/Firebase";
import {
  NotificationPayload,
  NotificationPayloadData,
} from "@/Models/NotificationPayload";
import useFcmToken from "@/hooks/FirebaseNotificationHook";
import { getMessaging, onMessage } from "firebase/messaging";
import { ReactNode, useEffect } from "react";
import { toast } from "react-toastify";

const NotificationHandler = ({
  children,
  handle = undefined,
}: {
  handle?: (payload: NotificationPayload) => void;
  children?: ReactNode;
}) => {
  const { fcmToken } = useFcmToken();
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
        console.log(notification.getNotificationType(), notification);

        if (notification.isNotification()) {
          toast.success(notification.data?.message, {
            onClick: () => {
              Navigate(notification.getUrl());
            },
            bodyClassName: "cursor-pointer",
          });
          if (handle) {
            handle(notification);
          }
        } else if (handle) {
          handle(notification);
        }
      });
      return () => {
        unsubscribe(); // Unsubscribe from the onMessage event
      };
    }
  }, []);

  return <>{children}</>;
};

export default NotificationHandler;
