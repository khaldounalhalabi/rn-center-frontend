"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import useFcmToken from "@/hooks/FirebaseNotificationHook";
import NotificationProvider from "@/components/common/NotificationProvider";

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

  return (
    <ReFetchPhoto.Provider value={{ reFetch, setReFetch }}>
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ToastContainer />
          <NotificationProvider>{children}</NotificationProvider>
        </LocalizationProvider>
      </QueryClientProvider>
    </ReFetchPhoto.Provider>
  );
};
export default Providers;