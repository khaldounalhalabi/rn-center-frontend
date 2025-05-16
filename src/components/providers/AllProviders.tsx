"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import useFcmToken from "@/hooks/FirebaseNotificationHook";
import NotificationProvider from "@/components/providers/NotificationProvider";
import { useLocale } from "next-intl";
import useUser from "@/hooks/UserHook";
import LoadingScreen from "@/components/common/ui/LoadingScreen";
import React from "react";
import { Toaster } from "@/components/ui/shadcn/sonner";

const AllProviders = ({ children }: { children: React.ReactNode }) => {
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
        <Toaster dir={locale == "ar" ? "rtl" : "ltr"} />
        <NotificationProvider>
          <div className={` ${locale == "ar" ? "Cairo" : "kodchasan"}`}>
            {children}
          </div>
        </NotificationProvider>
      </LocalizationProvider>
    </QueryClientProvider>
  );
};
export default AllProviders;
