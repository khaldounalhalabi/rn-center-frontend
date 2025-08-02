import firebaseApp from "@/helpers/Firebase";
import { POST } from "@/http/Http";
import { getMessaging, getToken } from "firebase/messaging";
import { useEffect, useState } from "react";

const useFcmToken = () => {
  const [token, setToken] = useState("");
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const retrieveToken = async () => {
      try {
        if (typeof window !== "undefined" && "serviceWorker" in navigator) {
          const messaging = getMessaging(firebaseApp);

          const permission = await Notification.requestPermission();
          setNotificationPermissionStatus(permission);

          if (permission === "granted") {
            const currentToken = await getToken(messaging, {
              vapidKey:
                "BD2c5K6PVxOSeD9FmGOMVqHPoabzLcufGuxBZ3vA3FwedztLLgQHb-M61iwl11ULTj-xUojLW7OZ3kViqxDxNFg",
            });

            await POST(`/fcm/store-token`, {
              fcm_token: currentToken,
            });
            setToken(currentToken);
          }
        }
      } catch (error) {
        console.log("An error occurred while retrieving token:", error);
      }
    };

    retrieveToken();
  }, []);

  return { fcmToken: token, notificationPermissionStatus };
};

export default useFcmToken;
