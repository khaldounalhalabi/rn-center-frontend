"use client";
import { Inter } from "next/font/google";
import "@/app/global.css";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: any }) {
  const queryClient = React.useRef(new QueryClient());

  return (
    <html lang="en" dir="ltr">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient.current}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
