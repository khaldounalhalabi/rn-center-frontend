"use client";
import React, { useEffect, useState } from "react";
import { Link } from "@/navigation";
import UserIcon from "@/components/icons/UserIcon";
import MenuIcon from "@/components/icons/MenuIcon";
import Close from "@/components/icons/Close";
import { getCookieClient } from "@/Actions/clientCookies";
import { Navigate } from "@/Actions/navigate";

const Nav = () => {
  const [openNav, setOpenNav] = useState(false);
  const [user,setUser] = useState(false)
  const actor = getCookieClient("role");
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(display-mode: standalone)").matches
    ) {
      if (actor === "admin") {
        Navigate("/admin");
      } else if (actor === "doctor") {
        Navigate("/doctor");
      } else if (actor === "customer") {
        Navigate("/customer");
      }
    } else {
      console.log("Running in the browser");
    }
  }, []);
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
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/"}>Specialities</Link>
            </li>
            <li>
              <Link href={"/"}>Features</Link>
            </li>
            <li>
              <Link href={"/"}>Pricing</Link>
            </li>
            <li>
              <Link href={"/"}>Get Started</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end pr-6">
          <UserIcon className={"w-6 h-6 fill-[#013567] mx-2 cursor-pointer"} onClick={()=>setUser(!user)}/>
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
            <h2 className={"text-[15px] font-semibold"}>Home</h2>
            <h2 className={"text-[15px] font-semibold"}>About</h2>
            <h2 className={"text-[15px] font-semibold"}>Services</h2>
            <h2 className={"text-[15px] font-semibold"}>Blood Bank</h2>
            <h2 className={"text-[15px] font-semibold"}>Contact</h2>
          </div>
        </div>
      </div>
      <div className={`absolute h-auto top-20 w-fit bg-white shadow-xl border-y-2 border-pom duration-500 transform z-[500] ${user ? "right-0 h-full" : "-right-[100%]"}`}>
        <div className={"flex flex-col gap-6 p-6"}>
          <Link href={'/auth/doctor/login'} className={'w-full'}><h2 className={'w-full hover:bg-[#013567] hover:text-pom p-2 rounded-2xl text-center cursor-pointer'}>Doctor</h2></Link>
          <Link href={'/auth/customer/login'}  className={'w-full'}><h2 className={'w-full hover:bg-[#013567] hover:text-pom p-2 rounded-2xl text-center cursor-pointer'}>Customer</h2></Link>

        </div>
      </div>
    </>
  );
};

export default Nav;