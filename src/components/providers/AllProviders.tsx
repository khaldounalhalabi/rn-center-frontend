"use client";
import LoadingScreen from "@/components/common/ui/LoadingScreen";
import NotificationProvider from "@/components/providers/NotificationProvider";
import { Toaster } from "@/components/ui/shadcn/sonner";
import useFcmToken from "@/hooks/FirebaseNotificationHook";
import useUser from "@/hooks/UserHook";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useLocale } from "next-intl";
import React from "react";

const AllProviders = ({ children }: { children: React.ReactNode }) => {
  useFcmToken();
  const { role } = useUser();
  const [queryClient] = React.useState(() => new QueryClient());
  dayjs.extend(duration);

  const locale = useLocale();
  return !role ? (
    <LoadingScreen />
  ) : (
    <QueryClientProvider client={queryClient}>
      <Toaster
        dir={locale == "ar" ? "rtl" : "ltr"}
        position={locale == "ar" ? "bottom-left" : "bottom-right"}
      />
      <NotificationProvider>
        <div className={` ${locale == "ar" ? "Cairo" : "kodchasan"}`}>
          {children}
        </div>
      </NotificationProvider>
    </QueryClientProvider>
  );
};
export default AllProviders;
