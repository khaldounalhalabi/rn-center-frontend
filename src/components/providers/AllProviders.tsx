"use client";
import NotificationProvider from "@/components/providers/NotificationProvider";
import { Toaster } from "@/components/ui/shadcn/sonner";
import useFcmToken from "@/hooks/FirebaseNotificationHook";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import isBetween from "dayjs/plugin/isBetween";
import { useLocale } from "next-intl";
import React from "react";
import PermissionProvider from "./PermissionProvider";
import UserInitializerProvider from "./UserInitializerProvider";
import UserProvider from "./UserProvider";

const AllProviders = ({ children }: { children: React.ReactNode }) => {
  useFcmToken();
  const [queryClient] = React.useState(() => new QueryClient());
  dayjs.extend(duration);
  dayjs.extend(isBetween);
  const locale = useLocale();

  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster
          dir={locale == "ar" ? "rtl" : "ltr"}
          position={locale == "ar" ? "bottom-left" : "bottom-right"}
        />
        <NotificationProvider>
          <PermissionProvider>
            <UserInitializerProvider>
              <div className={` ${locale == "ar" ? "Cairo" : "kodchasan"}`}>
                {children}
              </div>
            </UserInitializerProvider>
          </PermissionProvider>
        </NotificationProvider>
      </QueryClientProvider>
    </UserProvider>
  );
};
export default AllProviders;
