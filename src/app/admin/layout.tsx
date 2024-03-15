import React from "react";
import { Header } from "@/components/common/Header";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header />
      <main className={`grid grid-cols-4 `}>
        <div className={`col-start-1  col-span-4 md:col-start-2 md:col-span-4`}>
          {children}
        </div>
      </main>
    </>
  );
};

export default Layout;
