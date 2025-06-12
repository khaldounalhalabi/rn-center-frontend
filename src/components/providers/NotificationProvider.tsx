"use client";
import { Navigate } from "@/actions/Navigate";
import { RoleEnum } from "@/enums/RoleEnum";
import firebaseApp from "@/helpers/Firebase";
import useUser from "@/hooks/UserHook";
import { NotificationPayload } from "@/models/NotificationPayload";
import { Link } from "@/navigation";
import { getMessaging, onMessage } from "firebase/messaging";
import { Bell } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

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
  const t = useTranslations("components");
  const { role } = useUser();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      const messaging = getMessaging(firebaseApp);
      const unsubscribe = onMessage(messaging, (payload) => {
        console.log(payload);
        const notification = new NotificationPayload(payload?.data ?? {});

        handlers.forEach((handler) => {
          handler.fn(notification);
        });
        if (notification.isNotification()) {
          toast(
            <Link href={notification.getUrl(role ?? RoleEnum.PUBLIC)}>
              {t("new_notification")}
            </Link>,
            {
              description: notification?.message,
              action: {
                label: t("show"),
                onClick: () => {
                  Navigate(notification.getUrl(role ?? RoleEnum.PUBLIC));
                },
              },
              icon: <Bell />,
            },
          );
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
