import "@/app/[locale]/global.css";
import React from "react";
import AllProviders from "@/components/providers/AllProviders";
import { ThemeProvider } from "@/components/theme-provider";

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
      <AllProviders>{children}</AllProviders>
    </ThemeProvider>
  );
};

export default Layout;
