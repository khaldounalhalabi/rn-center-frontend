import AllProviders from "@/components/providers/AllProviders";
import { ThemeProvider } from "@/components/theme-provider";
import React from "react";

const Layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main>
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
            <div className="flex flex-1 flex-col">
              <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </AllProviders>
      </ThemeProvider>
    </main>
  );
};

export default Layout;
