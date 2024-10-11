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
              <Link href={"/"}>About</Link>
            </li>
            <li>
              <Link href={"/"}>Services</Link>
            </li>
            <li>
              <Link href={"/"}>Blood Bank</Link>
            </li>
            <li>
              <Link href={"/"}>Contact</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end pr-6">
          <UserIcon className={"w-6 h-6 fill-[#013567] mx-2"} />
          <MenuIcon
            className={"w-8 h-8 md:hidden"}
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
          <div className="navbar-start pl-8">
            <UserIcon className={"w-6 h-6 fill-[#013567] mx-2"} />
          </div>

          <div className="navbar-end pr-6">
            <Close
              className={"w-8 h-8"}
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
    </>
  );
};

export default Nav;
