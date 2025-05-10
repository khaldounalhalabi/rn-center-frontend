import React from "react";
import AllProviders from "@/components/providers/AllProviders";
import LayoutProvider from "@/components/providers/LayoutProvider";

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
        <AllProviders>
          <div
            className={`col-span-4 col-start-1 h-screen overflow-y-scroll md:col-span-4 md:col-start-2`}
          >
            <LayoutProvider> {children}</LayoutProvider>
          </div>
        </AllProviders>
      </main>
    </div>
  );
};

export default Layout;
