"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { NextIntlClientProvider } from "next-intl";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotificationHandler from "@/components/common/NotificationHandler";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ToastContainer />
        <NotificationHandler />
        {children}
      </LocalizationProvider>
    </QueryClientProvider>
  );
};
export default Providers;

export function MyCustomNextIntlClientProvider({
  locale,
  messages,
  children,
}: {
  locale: string;
  messages: any;
  children: any;
}) {
  return (
    <NextIntlClientProvider
      // Define non-serializable props here
      defaultTranslationValues={{
        i: (text) => <i>{text}</i>,
      }}
      // Make sure to forward these props to avoid markup mismatches
      locale={locale}
      messages={messages}
    >
      {children}
    </NextIntlClientProvider>
  );
}
