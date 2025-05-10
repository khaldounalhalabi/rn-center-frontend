"use client";
import React, { useEffect, useRef, useState } from "react";
import RoundedImage from "@/components/common/ui/images/RoundedImage";
import OpenAndClose from "@/hooks/OpenAndClose";
import useClickOutside from "@/hooks/UseClickOutside";
import { Link } from "@/navigation";
import { AuthService } from "@/services/AuthService";
import { useTranslations } from "next-intl";
import useUser from "@/hooks/UserHook";

const ProfileOptionsPopover = () => {
  const [openPopProfile, setOpenPopProfile] = useState<boolean>(false);
  const ref: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  useEffect(() => {
    useClickOutside(ref, setOpenPopProfile);
  }, []);
  const { role, user } = useUser();

  const t = useTranslations("nav");
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
          <div className="text-sm ">{user?.full_name}</div>
          <div className="overflow-hidden whitespace-nowrap">
            <div className="opacity-[0.6]  inline-block animate-marquee pl-[100%]">
              {user?.phone}
            </div>
          </div>
        </div>

        <Link
          onClick={() => setOpenPopProfile(false)}
          suppressHydrationWarning
          href={`/${role}/user-details`}
          className="opacity-[0.8] w-full"
        >
          <button className="text-start px-4 w-full py-1 cursor-pointer hover:bg-blue-200">
            {t("profile")}
          </button>
        </Link>
        <div className="py-3 w-full px-4 text-red-600 rounded-b-2xl cursor-pointer hover:bg-red-200 hover:text-white">
          <button
            className={"w-full text-start"}
            onClick={() => {
              AuthService.make<AuthService>(role).logout();
            }}
          >
            {t("logout")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileOptionsPopover;
