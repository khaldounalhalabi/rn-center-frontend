import React from "react";
import Providers from "@/app/[locale]/providers";
import NotificationHandler from "@/components/common/NotificationHandler";
import Navbar from "@/components/customer/nav/Navbar";
import Footer from "@/components/customer/footer/Footer";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
        <main
            className={` min-h-screen kodchasan w-full  `}
        >
            <Providers>
                <div
                    className={`col-start-1 col-span-4 md:col-start-2 md:col-span-4`}
                >
                    <NotificationHandler />
                    <Navbar />
                     {children}
                    <Footer />
                </div>
            </Providers>
        </main>
    </div>
  );
};

export default Layout;