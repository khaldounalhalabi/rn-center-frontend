"use client";
import React, { useEffect, useRef, useState } from "react";
import LanguageIcon from "@/components/icons/LanguageIcon";
import OpenAndClose from "@/hooks/OpenAndClose";
import HandleClickOutSide from "@/hooks/HandleClickOutSide";

const LanguagePopover = () => {
  const [openPopLang, setOpenPopLang] = useState<boolean>(false);
  const ref: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  useEffect(() => {
    HandleClickOutSide(ref, setOpenPopLang);
  }, []);

  return (
    <div
      ref={ref}
      className={openPopLang ? " relative" : "overflow-clip relative"}
    >
      <LanguageIcon
        className={`h-6 w-6 cursor-pointer`}
        onClick={() => OpenAndClose(openPopLang, setOpenPopLang)}
      />
      <div
        className={
          openPopLang
            ? "absolute end-0 w-[180px] z-10 mt-2 top-10 divide-y divide-gray-100 rounded-2xl bg-white opacity-100  transition-x-0 ease-in-out  duration-500 "
            : "absolute transition-x-[-200px] opacity-0 ease-in-out duration-500 "
        }
        style={{
          boxShadow:
            " 0px 5px 5px -3px rgba(145, 158, 171, 0.2)" +
            ", 0px 8px 10px 1px rgba(145, 158, 171, 0.14)" +
            ", 0px 3px 14px 2px rgba(145, 158, 171, 0.12)",
        }}
        role="menu"
      >
        <div>
          <div className="flex px-4 py-2 rounded-xl  cursor-pointer hover:bg-blue-200">
            <img
              className="w-7 h-7 mr-4"
              src="https://img.icons8.com/color/48/usa.png"
              alt="usa"
            />
            <h3>English</h3>
          </div>
          <div className="flex px-4 py-2 rounded-xl  cursor-pointer hover:bg-blue-200">
            <img
              className="w-7 h-7 mr-4"
              src="https://img.icons8.com/fluency/48/saudi-arabia.png"
              alt="saudi-arabia"
            />
            <h3>Arabic</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguagePopover;
