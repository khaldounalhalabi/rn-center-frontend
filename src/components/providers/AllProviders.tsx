"use client";
import { Toaster } from "@/components/ui/shadcn/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import isBetween from "dayjs/plugin/isBetween";
import { useLocale } from "next-intl";
import React from "react";

const AllProviders = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: true,
          },
        },
      }),
  );
  dayjs.extend(duration);
  dayjs.extend(isBetween);
  const locale = useLocale();

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        dir={locale == "ar" ? "rtl" : "ltr"}
        position={locale == "ar" ? "bottom-left" : "bottom-right"}
      />

      <div className={` ${locale == "ar" ? "Cairo" : "kodchasan"}`}>
        {children}
      </div>
    </QueryClientProvider>
  );
};
export default AllProviders;
