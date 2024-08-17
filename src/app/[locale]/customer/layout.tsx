import React from "react";
import Providers from "@/app/[locale]/providers";
import NotificationHandler from "@/components/common/NotificationHandler";
import Navbar from "@/components/customer/nav/Navbar";
import Footer from "@/components/customer/footer/Footer";
import "./../customer.css";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main
      className={` min-h-screen kodchasan w-full max-w-screen overflow-x-auto-hidden`}
    >
      <Providers>
        <div className={`min-h-screen col-start-1 col-span-4 md:col-start-2 md:col-span-4`}>
          <NotificationHandler />
          <Navbar />
          {children}
          <Footer />
        </div>
      </Providers>
    </main>
  );
};

export default Layout;