"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createContext, Dispatch, SetStateAction } from "react";
import useFcmToken from "@/hooks/FirebaseNotificationHook";
import NotificationProvider from "@/components/providers/NotificationProvider";
import { useLocale } from "next-intl";
import useUser from "@/hooks/UserHook";
import LoadingScreen from "@/components/common/ui/LoadingScreen";

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
  useFcmToken();
  const { role } = useUser();
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
  const locale = useLocale();
  return !role ? (
    <LoadingScreen />
  ) : (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ToastContainer rtl={locale == "ar"} />
        <NotificationProvider>
          <div className={` ${locale == "ar" ? "Cairo" : "kodchasan"}`}>
            {children}
          </div>
        </NotificationProvider>
      </LocalizationProvider>
    </QueryClientProvider>
  );
};
export default Providers;
