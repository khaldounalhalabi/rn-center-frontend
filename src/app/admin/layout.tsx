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
      <main className={`grid grid-cols-4`}>
        <div className={`col-start-1 md:col-start-2 col-end-5`}>{children}</div>
      </main>
    </>
  );
};

export default Layout;
