import React from "react";
import AllProviders from "@/components/providers/AllProviders";
import { AppSidebar } from "@/components/ui/shadcn/app-sidebar";
import { SiteHeader } from "@/components/ui/shadcn/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/shadcn/sidebar";
import { ThemeProvider } from "@/components/theme-provider";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <main
        style={{
          background:
            "linear-gradient(to bottom, rgba(249, 250, 251, 0.9), rgba(249, 250, 251, 0.9)), url(https://dc621.4shared.com/img/GqP7JQWBjq/s24/18e1e7686a0/overlay_4?async&rand=0.9085352286261172)",
        }}
        className={`h-fit min-h-[calc(100vh-4rem)] w-full`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AllProviders>
            <div
              className={`col-span-4 col-start-1 h-screen w-full overflow-y-scroll md:col-span-4 md:col-start-2`}
            >
              <SidebarProvider>
                <AppSidebar variant="inset" />
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
    </div>
  );
};

export default Layout;
