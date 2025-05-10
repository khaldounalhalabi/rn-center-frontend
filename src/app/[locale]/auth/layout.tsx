import "@/app/[locale]/global.css";
import React from "react";
import AllProviders from "@/components/providers/AllProviders";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div
      style={{
        background:
          "linear-gradient(to bottom, rgba(249, 250, 251, 0.9), rgba(249, 250, 251, 0.9)), url(https://dc621.4shared.com/img/GqP7JQWBjq/s24/18e1e7686a0/overlay_4?async&rand=0.9085352286261172)",
      }}
    >
      <AllProviders>{children}</AllProviders>
    </div>
  );
};

export default Layout;
