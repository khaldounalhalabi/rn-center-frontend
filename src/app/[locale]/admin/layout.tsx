import React from "react";
import { Header } from "@/components/common/Header";
import Providers from "@/app/[locale]/providers";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header />
      <main  style={{
          background:
              "linear-gradient(to bottom, rgba(249, 250, 251, 0.9), rgba(249, 250, 251, 0.9)), url(https://dc621.4shared.com/img/GqP7JQWBjq/s24/18e1e7686a0/overlay_4?async&rand=0.9085352286261172)",
      }}
          className={`grid grid-cols-4 min-h-[calc(100vh-4rem)]`} >
        <Providers>
          <div
            className={`col-start-1 col-span-4 md:col-start-2 md:col-span-4`}
          >
            {children}
          </div>
        </Providers>
      </main>
    </>
  );
};

export default Layout;
