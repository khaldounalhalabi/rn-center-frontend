"use client";
import React, { useState } from "react";
import SearchIcon from "@/components/icons/SearchIcon";
import XMark from "@/components/icons/XMark";

const Navbar = () => {
  const [showSearchForm, setShowSearchForm] = useState<boolean>(false);

  return (
    <>
      <div
        className={
          showSearchForm
            ? "w-[100vw] h-full  left-0  absolute z-30 top-0 bg-white  translate-y-0 ease-in-out duration-500"
            : "w-full h-0 absolute overflow-clip translate-y-[-200px] ease-in-out duration-500"
        }
      >
        <div className={"w-full flex flex-col items-end"}>
          <XMark
            className={"w-8 h-8 mt-6 mr-6 cursor-pointer"}
            onClick={() => {
              setShowSearchForm(false);
            }}
          />
          <div className={"w-full flex justify-center  relative"}>
            <div
              className={"absolute flex gap-2  top-0 items-center left-[5%] "}
            >
              <SearchIcon className={"w-7 h-7  opacity-60"} />
              <h2
                className={
                  "font-light text-[#013567] text-[16px] md:text-[25px]"
                }
              >
                Search
              </h2>
            </div>
            <input
              type={"text"}
              className="block  w-[95%] focus:mt-5 kodchasan py-2.5 px-0  bg-transparent border-0 border-b-2
                    border-[#c1d5df] appearance-none  focus:outline-none focus:ring-0 focus:border-[#1FB8B9]"
            />
          </div>
        </div>
      </div>
      <div className="navbar bg-base-100 max-h-[98px]">
        <div className=" flex-1 h-full md:mx-16 mx-4 ">
          <h1 className={"font-medium text-xl md:hidden block"}>
            Hey, Mustafa 👋
          </h1>
          <img
            src={"/pom.png"}
            alt={".."}
            className={"w-[5%] h-[5%] md:block hidden"}
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
    </>
  );
};

export default Navbar;
