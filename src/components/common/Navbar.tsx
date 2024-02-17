import React from "react";
import SearchIcon from "@/components/icons/SearchIcon";
import LanguageIcon from "@/components/icons/LanguageIcon";
import NotificationsIcon from "@/components/icons/NotificationsIcon";
import RoundedImage from "@/components/common/RoundedImage";

const Navbar = () => {
  return (
    <nav
      className={`w-full bg-transparent opacity-50 shadow-md flex justify-between max-h-20 items-center px-10 py-4 col-span-3`}
    >
      <SearchIcon className={`h-6 w-6 cursor-pointer`} />
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
