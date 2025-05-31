"use client";
import LoadingScreen from "@/components/common/ui/LoadingScreen";
import NotificationProvider from "@/components/providers/NotificationProvider";
import { Toaster } from "@/components/ui/shadcn/sonner";
import useFcmToken from "@/hooks/FirebaseNotificationHook";
import useUser from "@/hooks/UserHook";
import { useRouter } from "@/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import React, { useEffect, useState } from "react";

const AllProviders = ({ children }: { children: React.ReactNode }) => {
  useFcmToken();
  const { role } = useUser();
  const router = useRouter();
  const [queryClient, setQueryClient] = useState(() => new QueryClient());

  useEffect(() => {
    setQueryClient(new QueryClient());
  }, [router]);

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
