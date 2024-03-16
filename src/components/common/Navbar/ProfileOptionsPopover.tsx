"use client";
import React, { useEffect, useRef, useState } from "react";
import RoundedImage from "@/components/common/RoundedImage";
import OpenAndClose from "@/hooks/OpenAndClose";
import HandleClickOutSide from "@/hooks/HandleClickOutSide";
import { POST } from "@/Http/QueryFetch";

const ProfileOptionsPopover = () => {
  const [openPopProfile, setOpenPopProfile] = useState<boolean>(false);
  const ref: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  useEffect(() => {
    HandleClickOutSide(ref, setOpenPopProfile);
  }, []);

  const handleLogout = async () => {
    const res = await POST('/admin/logout' , {});
  }
  return (
    <div
      ref={ref}
      className={openPopProfile ? " relative" : "overflow-clip relative"}
    >
      <div
        onClick={() => OpenAndClose(openPopProfile, setOpenPopProfile)}
        className={
          openPopProfile
            ? "rounded-full w-7 h-7 border-2 border-blue-500 "
            : " w-7 h-7"
        }
      >
        <RoundedImage src={"/user.png"} alt={"user-profile"} />
      </div>

      <div
        className={
          openPopProfile
            ? "absolute end-0 w-[200px] z-10 mt-2 top-10 divide-y divide-gray-100 rounded-2xl bg-white opacity-100  transition-x-0 ease-in-out  duration-500 "
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
        <div className="px-4 my-3">
          <h2>Jaydon Frankie</h2>
          <p className="opacity-[0.6]">demo@minimals.cc</p>
        </div>
        <div className="opacity-[0.8]">
          <div className="text-start px-4 py-1 cursor-pointer hover:bg-blue-200">
            <h3>Home</h3>
          </div>
          <div className="text-start px-4 py-1 cursor-pointer hover:bg-blue-200">
            <h3>Profile</h3>
          </div>
          <div className="text-start px-4 py-1 cursor-pointer hover:bg-blue-200">
            <h3>Setting</h3>
          </div>
        </div>
        <hr className="my-2"></hr>
        <div className="py-3 px-4 text-red-600 cursor-pointer hover:bg-red-200 hover:text-white" onClick={handleLogout}>
          <h3>Logout</h3>
        </div>
      </div>
    </div>
  );
};

export default ProfileOptionsPopover;
