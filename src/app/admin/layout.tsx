import React from "react";
import { Header } from "@/components/common/Header";
import Providers from "@/app/providers";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header />
      <main className={`grid grid-cols-4`}>
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
