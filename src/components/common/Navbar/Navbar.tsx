"use client";
import React, { useState } from "react";
import SearchIcon from "@/components/icons/SearchIcon";
import MenuIcon from "@/components/icons/MenuIcon";
import Searchbar from "@/components/common/Navbar/Searchbar";
import NotificationsPopover from "@/components/common/Navbar/NotificationsPopover";
import ProfileOptionsPopover from "@/components/common/Navbar/ProfileOptionsPopover";
import LanguagePopover from "@/components/common/Navbar/languagePopover";
import OpenAndClose from "@/hooks/OpenAndClose";

const Navbar = ({
  openNavBar,
  setOpenNavBar,
}: {
  openNavBar: boolean;
  setOpenNavBar: React.Dispatch<boolean>;
}) => {
  const [showSearchForm, setShowSearchForm] = useState<boolean>(false);

  return (
    <nav
      className={`w-full h-16 relative bg-white shadow-md flex justify-between max-h-20 items-center px-10 py-4 col-span-4 md:col-span-3`}
    >
      <div
        className={
          showSearchForm
            ? "w-full h-16 md:w-full md:right-0 md:left-auto left-0  absolute z-30 top-0   translate-y-0 ease-in-out duration-200"
            : "w-full h-0 absolute overflow-clip translate-y-[-200px] ease-in-out duration-300"
        }
      >
        <Searchbar setShowSearchForm={setShowSearchForm} />
      </div>
      <div className={`flex w-[inherit] justify-start gap-3 items-center`}>
        <MenuIcon
          className={`h-6 w-6 md:hidden`}
          onClick={() => OpenAndClose(openNavBar, setOpenNavBar)}
        />
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
