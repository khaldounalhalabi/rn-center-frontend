"use client";
import React, { useState } from "react";
import SearchIcon from "@/components/icons/SearchIcon";
import MenuIcon from "@/components/icons/MenuIcon";
import Searchbar from "@/components/common/Navbar/Searchbar";
import NotificationsPopover from "@/components/common/Navbar/NotificationsPopover";
import ProfileOptionsPopover from "@/components/common/Navbar/ProfileOptionsPopover";
import LanguagePopover from "@/components/common/Navbar/languagePopover";
import OpenAndClose from "@/hooks/OpenAndClose";
import BackIcon from "@/components/icons/backIcon";
import { useRouter } from "next/navigation";

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
  return (
    <nav
      className={`w-full h-16 relative bg-white shadow-md flex justify-between max-h-20 items-center pl-2 pr-10 py-4 col-span-4 lg:col-span-3`}
    >
      <div
        className={
          showSearchForm
            ? "w-full h-16 lg:w-full md:right-0 lg:left-auto left-0  absolute z-30 top-0   translate-y-0 ease-in-out duration-200"
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
        <div
          className={
            "p-2 hidden lg:block  h-full rounded-full hover:bg-gray-300 cursor-pointer"
          }
          onClick={() => rout.back()}
        >
          <BackIcon className={"w-8 h-8"} />
        </div>

        <SearchIcon
          className={`h-6 w-6 cursor-pointer`}
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