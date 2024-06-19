"use client";
import SidebarAdmin from "@/components/common/Sidebar/admin/SidebarAdmin";
import React, { useState } from "react";
import Navbar from "@/components/common/Navbar/Navbar";
import SidebarDoctor from "@/components/common/Sidebar/doctor/SidebarDoctor";
import { usePathname } from "@/navigation";
import { getCookieClient } from "@/Actions/clientCookies";

const NavProvider = ({ children }: { children: React.ReactNode }) => {
  const [openNavBar, setOpenNavBar] = useState<{
    sm: boolean;
    md: boolean;
  }>({
    sm: false,
    md: false,
  });
  const path = usePathname();
  const actor = getCookieClient("user-type");
  return (
    <div className="flex flex-row w-[100vw]">
      {path.includes("admin") && actor == "admin" ? (
        <SidebarAdmin openNavBar={openNavBar} setOpenNavBar={setOpenNavBar} />
      ) : path.includes("doctor") && actor == "doctor" ? (
        <SidebarDoctor openNavBar={openNavBar} setOpenNavBar={setOpenNavBar} />
      ) : (
        ""
      )}

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