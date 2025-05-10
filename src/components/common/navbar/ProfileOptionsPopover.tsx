"use client";
import React, { useEffect, useRef, useState } from "react";
import RoundedImage from "@/components/common/ui/images/RoundedImage";
import clickOutsideHandler from "@/helpers/ClickOutsideHandler";
import { Link } from "@/navigation";
import { AuthService } from "@/services/AuthService";
import { useTranslations } from "next-intl";
import useUser from "@/hooks/UserHook";

const ProfileOptionsPopover = () => {
  const [openPopProfile, setOpenPopProfile] = useState<boolean>(false);
  const ref: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  useEffect(() => {
    clickOutsideHandler(ref, setOpenPopProfile);
  }, []);
  const { role, user } = useUser();

  const t = useTranslations("nav");
  return (
    <div
      ref={ref}
      className={openPopProfile ? "relative" : "relative overflow-clip"}
    >
      <div
        onClick={() => setOpenPopProfile((prevState) => !prevState)}
        className={
          openPopProfile
            ? "h-7 w-7 rounded-full border-2 border-blue-500"
            : "h-7 w-7"
        }
      >
        <RoundedImage src={"/user.png"} alt={"user-profile"} />
      </div>

      <div
        className={
          openPopProfile
            ? "transition-x-0 absolute end-0 top-10 z-10 mt-2 w-[200px] divide-y divide-gray-100 rounded-2xl bg-white opacity-100 duration-500 ease-in-out"
            : "transition-x-[-200px] absolute opacity-0 duration-500 ease-in-out"
        }
        role="menu"
        style={{
          boxShadow:
            " 0px 5px 5px -3px rgba(145, 158, 171, 0.2)" +
            ", 0px 8px 10px 1px rgba(145, 158, 171, 0.14)" +
            ", 0px 3px 14px 2px rgba(145, 158, 171, 0.12)",
        }}
      >
        <div className="my-3 px-4">
          <div className="text-sm">{user?.full_name}</div>
          <div className="overflow-hidden whitespace-nowrap">
            <div className="inline-block animate-marquee pl-[100%] opacity-[0.6]">
              {user?.phone}
            </div>
          </div>
        </div>

        <Link
          onClick={() => setOpenPopProfile(false)}
          suppressHydrationWarning
          href={`/${role}/user-details`}
          className="w-full opacity-[0.8]"
        >
          <button className="w-full cursor-pointer px-4 py-1 text-start hover:bg-blue-200">
            {t("profile")}
          </button>
        </Link>
        <div className="w-full cursor-pointer rounded-b-2xl px-4 py-3 text-red-600 hover:bg-red-200 hover:text-white">
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
