"use client";
import React, { useState } from "react";
import Searchbar from "@/components/common/Navbar/Searchbar";
import SearchIcon from "@/components/icons/SearchIcon";

const Navbar = () => {
  const [showSearchForm, setShowSearchForm] = useState<boolean>(false);

  return (
    <div className="navbar relative bg-base-100 max-h-[98px]">
      <div
        className={
          showSearchForm
            ? "w-full h-full md:w-full md:right-0 md:left-auto left-0  absolute z-30 top-0   translate-y-0 ease-in-out duration-200"
            : "w-full h-0 absolute overflow-clip translate-y-[-200px] ease-in-out duration-300"
        }
      >
        <Searchbar setShowSearchForm={setShowSearchForm} />
      </div>
      <div className=" flex-1 h-full md:mx-16 mx-4 ">
        <h1 className={"font-medium text-xl md:hidden block"}>
          Hey, Mustafa 👋
        </h1>
        <img
          src={"/pom.png"}
          alt={".."}
          className={"w-[64px] h-[64px] md:block hidden"}
        ></img>
      </div>
      <div className="flex-none md:mx-10 mx-6">
        <div className={"p-2 border-[1px] rounded-2xl mx-4"}>
          <SearchIcon
            className={`h-7 w-7 cursor-pointer  `}
            onClick={() => {
              setShowSearchForm(!showSearchForm);
            }}
          />
        </div>
        <img src={"/user2.png"} alt={".."} className={"w-10 h-10"} />
      </div>
    </div>
  );
};

export default Navbar;