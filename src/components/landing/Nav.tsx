"use client";
import React, { useState } from "react";
import Link from "next/link";
import MenuIcon from "@/components/icons/MenuIcon";
import Close from "@/components/icons/Close";
import CheckUserImg from "@/components/landing/CheckUserImg";
import { Link as TranslatableLink } from "@/navigation";
import LanguagePopover from "@/components/common/Navbar/languagePopover";

const Nav = ({ links }: { links: { title: string; link: string }[] }) => {
  const [openNav, setOpenNav] = useState(false);
  const HandleClose = () => {
    setOpenNav(false);
  };
  return (
    <>
      <div className="navbar bg-base-100 justify-around md:px-[10%]">
        <div className="navbar-start">
          <div className="dropdown">
            <img
              src={"/pom.png"}
              alt={".."}
              className={"md:h-auto w-10 h-10"}
            />
          </div>
        </div>
        <div className="navbar-center hidden md:flex">
          <ul className="flex w-full gap-5 justify-between px-1 font-semibold text-[12px] lg:text-[15px]">
            {links.map((item, key) =>
              item?.link != "/check-appointment" ? (
                <li key={key}>
                  <Link href={item.link} className="hover:text-[#1FB8B9]">
                    {item.title}
                  </Link>
                </li>
              ) : (
                <li key={key}>
                  <TranslatableLink
                    href={item.link}
                    className="hover:text-[#1FB8B9]"
                  >
                    {item.title}
                  </TranslatableLink>
                </li>
              ),
            )}
          </ul>
        </div>
        <div className="navbar-end md:pr-[5%]">
          <LanguagePopover />
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
            {links.map((item, key) =>
              item?.link != "/check-appointment" ? (
                <Link
                  key={key}
                  href={item.link}
                  onClick={HandleClose}
                  className={"text-[15px] hover:text-[#1FB8B9] font-semibold"}
                >
                  {item.title}
                </Link>
              ) : (
                <TranslatableLink
                  key={key}
                  href={item.link}
                  onClick={HandleClose}
                  className={"text-[15px] hover:text-[#1FB8B9] font-semibold"}
                >
                  {item.title}
                </TranslatableLink>
              ),
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
