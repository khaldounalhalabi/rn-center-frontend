"use client";
import React, { useEffect, useRef, useState } from "react";
import NotificationsIcon from "@/components/icons/NotificationsIcon";
import Link from "next/link";
import OpenAndClose from "@/hooks/OpenAndClose";
import HandleClickOutSide from "@/hooks/HandleClickOutSide";

const NotificationsPopover = () => {
  const [openPopNot, setOpenPopNot] = useState<boolean>(false);

  const ref: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  useEffect(() => {
    HandleClickOutSide(ref, setOpenPopNot);
  }, []);

  return (
    <div
      ref={ref}
      className={openPopNot ? " relative" : "overflow-clip relative"}
    >
      <NotificationsIcon
        onClick={() => OpenAndClose(openPopNot, setOpenPopNot)}
        className={
          openPopNot
            ? `h-6 w-6 cursor-pointer text-[#909CA6] fill-blue-500`
            : "h-6 w-6 cursor-pointer text-[#909CA6] fill-[#909CA6]"
        }
      />

      <div
        className={
          openPopNot
            ? "absolute end-0 w-[360px] z-10 mt-2 top-10 divide-y divide-gray-100 rounded-2xl bg-white opacity-100  transition-x-0 ease-in-out  duration-500 "
            : "absolute transition-x-[-200px] opacity-0 ease-in-out duration-500 "
        }
        role="menu"
        style={{
          boxShadow:
            " 0px 5px 5px -3px rgba(145, 158, 171, 0.2)" +
            ", 0px 8px 10px 1px rgba(145, 158, 171, 0.14)" +
            ", 0px 3px 14px 2px rgba(145, 158, 171, 0.12)",
        }}
      >
        <div className="px-5 py-4">
          <h2>Notifications</h2>
          <p className="opacity-[0.6]">You have 0 unread messages</p>
        </div>
        <div className="">
          <div>
            <h3 className="px-5 py-2 opacity-[0.6] text-xs">NEW</h3>
            <div className="px-[20px] py-3"></div>
          </div>
          <div>
            <h3 className="px-5 py-2 opacity-[0.6] text-xs">BEFORE THAT</h3>
            <div className="px-5 py-3"></div>
          </div>
        </div>
        <div className="px-8 py-6 text-center">
          <Link href="/" className="text-[#1978f2] font-bold text-[0.875rem]">
            View All
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPopover;
