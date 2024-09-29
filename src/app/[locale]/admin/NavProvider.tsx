"use client";
import SidebarAdmin from "@/components/common/Sidebar/admin/SidebarAdmin";
import React, { useState } from "react";
import Navbar from "@/components/common/Navbar/Navbar";

const NavProvider = ({ children }: { children: React.ReactNode }) => {
  const [openNavBar, setOpenNavBar] = useState<{
    sm: boolean;
    md: boolean;
  }>({
    sm: false,
    md: false,
  });

  return (
    <div className="flex flex-row">
      <SidebarAdmin openNavBar={openNavBar} setOpenNavBar={setOpenNavBar} />

      <div
        className={`flex-grow transition-all duration-300 w-[75%] min-h-screen`}
      >
        <Navbar openNavBar={openNavBar} setOpenNavBar={setOpenNavBar} />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default NavProvider;
