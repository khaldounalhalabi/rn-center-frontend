"use client";
import React, {  useState } from "react";
import Link  from "next/link";
import MenuIcon from "@/components/icons/MenuIcon";
import Close from "@/components/icons/Close";
import CheckUserImg from "@/components/landing/CheckUserImg";

const Nav = () => {
  const [openNav, setOpenNav] = useState(false);
  const HandleClose = ()=>{
    setOpenNav(false)
  }
  return (
    <>
      <div className="navbar bg-base-100 justify-around">
        <div className="navbar-start pl-8">
          <div className="dropdown">
            <img
              src={"/pom.png"}
              alt={".."}
              className={"md:w-16 md:h-16 w-10 h-10"}
            />
          </div>
        </div>
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal px-1 font-semibold text-[15px]">
            <li>
              <Link href={"#home"}>Home</Link>
            </li>
            <li>
              <Link href={"#specialities"}>Specialities</Link>
            </li>
            <li>
              <Link href={"#features"}>Features</Link>
            </li>
            <li>
              <Link href={"#pricing"}>Pricing</Link>
            </li>
            <li>
              <Link href={"#start"}>Get Started</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end pr-6">
          <CheckUserImg />
          <MenuIcon
            className={"w-8 h-8 md:hidden cursor-pointer"}
            onClick={() => {
              setOpenNav(!openNav);
            }}
          />
        </div>
      </div>
      <div
        className={`absolute  right-0 w-full  min-h-screen bg-white duration-500 transform ${openNav ? "top-0 h-full" : "-top-[100vh]"} z-[1000] md:hidden`}
      >
        <div className="navbar bg-base-100 justify-around">
          <div className="w-full place-content-end pr-6">
            <Close
              className={"w-8 h-8 cursor-pointer"}
              onClick={() => {
                setOpenNav(!openNav);
              }}
            />
          </div>
        </div>
        <div className={"pt-6 flex justify-center"}>
          <div className={"flex flex-col gap-8 justify-center items-center"}>
            <Link href={"#home"} onClick={HandleClose} className={"text-[15px] font-semibold"}>Home</Link>
            <Link href={"#specialities"}  onClick={HandleClose} className={"text-[15px] font-semibold"}>Specialities</Link>
            <Link href={"#features"}  onClick={HandleClose}  className={"text-[15px] font-semibold"}>Features</Link>
            <Link href={"#pricing"}  onClick={HandleClose} className={"text-[15px] font-semibold"}>Pricing</Link>
            <Link href={"#start"}  onClick={HandleClose} className={"text-[15px] font-semibold"}>Get Started</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;