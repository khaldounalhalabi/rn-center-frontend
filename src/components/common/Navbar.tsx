"use client";
import React, { useContext } from "react";
import SearchIcon from "@/components/icons/SearchIcon";
import LanguageIcon from "@/components/icons/LanguageIcon";
import NotificationsIcon from "@/components/icons/NotificationsIcon";
import RoundedImage from "@/components/common/RoundedImage";
import MenuIcon from "@/components/icons/MenuIcon";
import { OpenMenuContext } from "@/components/common/Header";

const Navbar = () => {
  const { setOpenMenu } = useContext(OpenMenuContext);

  function handleMenuClick() {
    setOpenMenu((prevState: boolean) => !prevState);
  }

  return (
    <nav
      className={`w-full bg-transparent opacity-50 shadow-md flex justify-between max-h-20 items-center px-10 py-4 col-span-4 md:col-span-3`}
    >
      <div className={`flex justify-between gap-3 items-center`}>
        <MenuIcon className={`h-6 w-6 md:hidden`} onClick={handleMenuClick} />
        <SearchIcon className={`h-6 w-6 cursor-pointer`} />
      </div>
      <div className={`flex justify-between items-center gap-2`}>
        <LanguageIcon className={`h-6 w-6 cursor-pointer`} />
        <NotificationsIcon
          className={`h-6 w-6 cursor-pointer text-[#909CA6] fill-[#909CA6]`}
        />
        <RoundedImage src={"/user.png"} alt={"user-profile"} />
      </div>
    </nav>
  );
};

export default Navbar;
