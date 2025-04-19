import { useEffect, useState } from "react";
import { getMessaging, getToken } from "firebase/messaging";
import firebaseApp from "@/Helpers/Firebase";
import { GET, POST } from "@/Http/Http";
import useUser from "@/hooks/UserHook";

const useFcmToken = () => {
  const [token, setToken] = useState("");
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState("");
  const [isClient, setIsClient] = useState(false);
  const { role } = useUser();

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
                "BIutuhaOvqImTR8RpGVoDLHDSzeJay1fAXWes5wWtLmLLBKkyOxUebJA2fQu3hfiwhHq51BKfzDT-tni6ndtVcM",
            });

            let prevToken = await GET<{ fcm_token: string }>(
              `${role}/fcm/get-token`,
            ).then((res) => {
              return res?.data?.fcm_token;
            });
            if (currentToken != prevToken) {
              await POST(`${role}/fcm/store-token`, {
                fcm_token: currentToken,
              });
              setToken(currentToken);
            } else {
              setToken(currentToken);
            }
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
