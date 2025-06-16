import React from "react";
import AllProviders from "@/components/providers/AllProviders";
import { AppSidebar } from "@/components/ui/shadcn/app-sidebar";
import { SiteHeader } from "@/components/ui/shadcn/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/shadcn/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { getLocale } from "next-intl/server";

const Layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const locale = await getLocale();
  return (
    <main className="h-screen overflow-y-hidden">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <AllProviders>
          <div
            className={`col-span-4 col-start-1 h-full w-full overflow-y-scroll md:col-span-4 md:col-start-2`}
          >
            <SidebarProvider>
              <AppSidebar
                variant="inset"
                side={locale == "en" ? "left" : "right"}
              />
              <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col">
                  <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                      {children}
                    </div>
                  </div>
                </div>
              </SidebarInset>
            </SidebarProvider>
          </div>
        </AllProviders>
      </ThemeProvider>
    </main>
  );
};

export default Layout;
