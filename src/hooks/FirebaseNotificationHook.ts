import { useEffect, useState } from "react";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import firebaseApp from "@/Helpers/Firebase";
import { GET, POST } from "@/Http/Http";

const useFcmToken = () => {
  const [token, setToken] = useState("");
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState("");

  useEffect(() => {
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
              "admin/fcm/get-token"
            ).then((res) => {
              return res?.data?.fcm_token;
            });
            if (currentToken != prevToken) {
              await POST("admin/fcm/store-token", {
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
