import "@/app/[locale]/global.css";
import AllProviders from "@/components/providers/AllProviders";
import UserProvider from "@/components/providers/UserProvider";
import { ThemeProvider } from "@/components/theme-provider";
import React from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <UserProvider>
        <AllProviders>{children}</AllProviders>
      </UserProvider>
    </ThemeProvider>
  );
};

export default Layout;
