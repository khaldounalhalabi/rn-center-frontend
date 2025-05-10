"use client";
import React from "react";
import MenuIcon from "@/components/icons/MenuIcon";
import NotificationsPopover from "@/components/common/Navbar/NotificationsPopover";
import LanguagePopover from "@/components/common/Navbar/languagePopover";
import { useRouter } from "next/navigation";
import { usePathname } from "@/navigation";
import ArrowLeft from "@/components/icons/ArrowLeft";
import ProfileOptionsPopover from "@/components/common/Navbar/ProfileOptionsPopover";

const Navbar = ({
  openNavBar,
  setOpenNavBar,
}: {
  openNavBar: {
    sm: boolean;
    md: boolean;
  };
  setOpenNavBar: React.Dispatch<{
    sm: boolean;
    md: boolean;
  }>;
}) => {
  const rout = useRouter();
  const path = usePathname();
  return (
    <nav
      className={`w-full h-16 relative bg-white shadow-md flex justify-between max-h-20 px-2 items-center py-4 col-span-4 lg:col-span-3`}
    >
      <div className={`flex w-[inherit] justify-start gap-3 items-center`}>
        <MenuIcon
          className={`h-6 w-6 cursor-pointer lg:hidden`}
          onClick={() => setOpenNavBar({ sm: !openNavBar.sm, md: false })}
        />
        <button
          type="button"
          disabled={path === "/admin" || path === "/doctor"}
          className={`p-2 hidden  ${path == "/admin" || path == "/doctor" ? "hidden" : "lg:block"} h-full rounded-full hover:bg-gray-300 cursor-pointer`}
          onClick={() => rout.back()}
        >
          <ArrowLeft className={"w-5 h-5"} />
        </button>
      </div>
      <div className={`flex justify-between items-center gap-2 `}>
        <LanguagePopover />
        <NotificationsPopover />
        <ProfileOptionsPopover />
      </div>
    </nav>
  );
};

export default Navbar;
