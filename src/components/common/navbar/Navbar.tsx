"use client";
import React from "react";
import MenuIcon from "@/components/icons/MenuIcon";
import NotificationsPopover from "@/components/common/navbar/NotificationsPopover";
import LanguagePopover from "@/components/common/navbar/languagePopover";
import { useRouter } from "next/navigation";
import { usePathname } from "@/navigation";
import ArrowLeft from "@/components/icons/ArrowLeft";
import ProfileOptionsPopover from "@/components/common/navbar/ProfileOptionsPopover";

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
      className={`relative col-span-4 flex h-16 max-h-20 w-full items-center justify-between bg-white px-2 py-4 shadow-md lg:col-span-3`}
    >
      <div className={`flex w-[inherit] items-center justify-start gap-3`}>
        <MenuIcon
          className={`h-6 w-6 cursor-pointer lg:hidden`}
          onClick={() => setOpenNavBar({ sm: !openNavBar.sm, md: false })}
        />
        <button
          type="button"
          disabled={path === "/admin" || path === "/doctor"}
          className={`hidden p-2 ${path == "/admin" || path == "/doctor" ? "hidden" : "lg:block"} h-full cursor-pointer rounded-full hover:bg-gray-300`}
          onClick={() => rout.back()}
        >
          <ArrowLeft className={"h-5 w-5"} />
        </button>
      </div>
      <div className={`flex items-center justify-between gap-2`}>
        <LanguagePopover />
        <NotificationsPopover />
        <ProfileOptionsPopover />
      </div>
    </nav>
  );
};

export default Navbar;
