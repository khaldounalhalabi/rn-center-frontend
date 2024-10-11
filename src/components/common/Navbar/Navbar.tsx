"use client";
import React, { useState } from "react";
import SearchIcon from "@/components/icons/SearchIcon";
import MenuIcon from "@/components/icons/MenuIcon";
import Searchbar from "@/components/common/Navbar/Searchbar";
import NotificationsPopover from "@/components/common/Navbar/NotificationsPopover";
import LanguagePopover from "@/components/common/Navbar/languagePopover";
import OpenAndClose from "@/hooks/OpenAndClose";
import ArrowRight from "@/components/icons/ArrowRight";
import { useRouter } from "next/navigation";
import { usePathname } from "@/navigation";
import dynamic from "next/dynamic";

const ProfileOptionsPopover = dynamic(
  () => import("@/components/common/Navbar/ProfileOptionsPopover"),
  {
    ssr: false,
  },
);

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
  const [showSearchForm, setShowSearchForm] = useState<boolean>(false);
  const rout = useRouter();
  const path = usePathname();
  return (
    <nav
      className={`w-full h-16 relative bg-white shadow-md flex justify-between max-h-20 px-2 items-center py-4 col-span-4 lg:col-span-3`}
    >
      <div
        className={
          showSearchForm
            ? "w-full h-16 lg:w-full md:right-0 lg:left-auto left-0  absolute z-30 top-0 translate-y-0 ease-in-out duration-200"
            : "w-full h-0 absolute overflow-clip translate-y-[-200px] ease-in-out duration-300"
        }
      >
        <Searchbar setShowSearchForm={setShowSearchForm} />
      </div>
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
          <ArrowRight className={"w-8 h-8"} />
        </button>

        <SearchIcon
          className={`h-6 w-6 cursor-pointer hidden`}
          onClick={() => {
            OpenAndClose(showSearchForm, setShowSearchForm);
          }}
        />
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
