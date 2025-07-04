"use client";
import { RoleEnum } from "@/enums/RoleEnum";
import firebaseApp from "@/helpers/Firebase";
import useFcmToken from "@/hooks/FirebaseNotificationHook";
import useUser from "@/hooks/UserHook";
import { NotificationPayload } from "@/models/NotificationPayload";
import { Link, useRouter } from "@/navigation";
import { getMessaging, onMessage } from "firebase/messaging";
import { Bell } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";
import LoadingScreen from "../common/ui/LoadingScreen";

export const NotificationsHandlersContext = createContext<Dispatch<
  SetStateAction<Handler[]>
> | null>(null);

export interface Handler {
  fn: (payload: NotificationPayload) => void;
  key?: string;
  is_active: boolean;
  is_permenant: boolean;
}

const NotificationProvider = ({ children }: { children?: ReactNode }) => {
  const { fcmToken } = useFcmToken();
  const router = useRouter();

  const [handlers, setHandlers] = useState<Handler[]>([]);
  const t = useTranslations("components");
  const { role, user } = useUser();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      user != undefined
    ) {
      const messaging = getMessaging(firebaseApp);
      const unsubscribe = onMessage(messaging, (payload) => {
        console.log(payload);
        const notification = new NotificationPayload(payload?.data ?? {});
        console.log("Calling handlers ........");
        
        handlers.forEach((handler) => {
          try {
            console.log("Calling handler : " , handler);
            handler.fn(notification);
            console.log("End Calling handler : " , handler);
          } catch (error) {
            console.error("Error while calling notification handler");
            console.error(error);
          }
        });
        if (notification.isNotification()) {
          toast(
            <Link
              href={notification.getUrl(
                role ?? RoleEnum.PUBLIC,
                user?.permissions ?? [],
              )}
            >
              {t("new_notification")}
            </Link>,
            {
              description: notification?.message,
              action: {
                label: t("show"),
                onClick: () => {
                  router.replace(
                    notification.getUrl(
                      role ?? RoleEnum.PUBLIC,
                      user?.permissions ?? [],
                    ),
                  );
                },
              },
              icon: <Bell />,
            },
          );
        }
      });
      return () => {
        unsubscribe(); // Unsubscribe from the onMessage event
      };
    }
  }, [handlers, fcmToken]);

  return (
    <NotificationsHandlersContext.Provider value={setHandlers}>
      {children}
    </NotificationsHandlersContext.Provider>
  );
};

export default NotificationProvider;

export const NotificationInitializer = ({
  children,
}: {
  children?: ReactNode;
}) => {
  const setHandlers = useContext(NotificationsHandlersContext);

  if (!setHandlers) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
};
