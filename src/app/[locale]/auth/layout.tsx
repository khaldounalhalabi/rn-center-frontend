import { getUser } from "@/actions/HelperActions";
import { Navigate } from "@/actions/Navigate";
import "@/app/[locale]/global.css";
import AllProviders from "@/components/providers/AllProviders";
import UserProvider from "@/components/providers/UserProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthService } from "@/services/AuthService";
import React from "react";

const Layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const user = await getUser();
  if (user) {
    const res = await AuthService.make().me();
    if (res.ok()) {
      await Navigate(`/${res.data.role}`);
    }
  }
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
