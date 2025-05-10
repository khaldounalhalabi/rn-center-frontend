"use client";
import React, { useState } from "react";
import Navbar from "@/components/common/navbar/Navbar";
import Sidebar from "@/components/common/sidebar/Sidebar";

const NavProvider = ({ children }: { children: React.ReactNode }) => {
  const [openNavBar, setOpenNavBar] = useState<{
    sm: boolean;
    md: boolean;
  }>({
    sm: false,
    md: false,
  });

  return (
    <div className="flex flex-row ">
      <Sidebar openNavBar={openNavBar} setOpenNavBar={setOpenNavBar} />
      <div className={`flex-grow transition-all duration-300 w-[75%] h-full`}>
        <Navbar openNavBar={openNavBar} setOpenNavBar={setOpenNavBar} />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default NavProvider;
