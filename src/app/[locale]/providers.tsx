"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import useFcmToken from "@/hooks/FirebaseNotificationHook";
import NotificationProvider from "@/components/common/NotificationProvider";
import HandleGetUserData from "@/hooks/HandleGetUserAndClinic";
import { useRouter } from "next/navigation";
import {getCookieClient} from "@/Actions/clientCookies";

interface ReFetchPhotoContextType {
  reFetch: boolean;
  setReFetch: Dispatch<SetStateAction<boolean>>;
}

const defaultReFetchPhotoValue: ReFetchPhotoContextType = {
  reFetch: false,
  setReFetch: () => {},
};
export const ReFetchPhoto = createContext(defaultReFetchPhotoValue);
const Providers = ({ children }: { children: React.ReactNode }) => {
  const { fcmToken } = useFcmToken();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 0,
        refetchOnReconnect: true,
        retry: true,
        retryDelay: 1,
      },
    },
  });
  const [reFetch, setReFetch] = useState(false);
  const locale = getCookieClient('NEXT_LOCALE')
  return (
    <ReFetchPhoto.Provider value={{ reFetch, setReFetch }}>
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ToastContainer />
          <NotificationProvider>
            <div className={` ${locale == "ar" ? "Cairo" : "kodchasan"}`}>
              {children}
            </div>
          </NotificationProvider>
        </LocalizationProvider>
      </QueryClientProvider>
    </ReFetchPhoto.Provider>
  );
};
export default Providers;