"use client";
import React, { useEffect, useState } from "react";
import LogoHoverIcon from "@/components/icons/LogoHoverIcon";

export const HomeTitle = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    document
      .getElementById("home-title")
      ?.addEventListener("mouseover", function (e) {
        setShow(true);
      });

    document
      .getElementById("home-title")
      ?.addEventListener("mouseOut", function (e) {
        setShow(false);
      });
  }, []);
  return (
    <div
      className={
        "text-[#013567] text-[30px] lg:text-[30px] font-bold md:text-[25px] 2xl:text-[35px]  group"
      }
      id={"home-title"}
    >
      <h2>Get complete control</h2>
      <h2>over your clinic in just a few steps</h2>
      <h2 className={""}>
        with{" "}
        <span className={"text-[#1FB8B9] relative"}>
          Planet of Medicine
          <span className={"absolute top-0 -right-5 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"}>
            <LogoHoverIcon />
          </span>
        </span>
      </h2>
    </div>
  );
};
