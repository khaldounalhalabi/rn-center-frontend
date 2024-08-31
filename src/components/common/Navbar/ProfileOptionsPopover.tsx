"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import RoundedImage from "@/components/common/RoundedImage";
import OpenAndClose from "@/hooks/OpenAndClose";
import HandleClickOutSide from "@/hooks/HandleClickOutSide";
import { User } from "@/Models/User";
import { deleteCookieClient, getCookieClient } from "@/Actions/clientCookies";
import { Navigate } from "@/Actions/navigate";
import { useQuery } from "@tanstack/react-query";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import { Link } from "@/navigation";
import { AuthService } from "@/services/AuthService";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { ReFetchPhoto } from "@/app/[locale]/providers";
import {useTranslations} from "next-intl";

const ProfileOptionsPopover = () => {
  const [openPopProfile, setOpenPopProfile] = useState<boolean>(false);
  const ref: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  useEffect(() => {
    HandleClickOutSide(ref, setOpenPopProfile);
  }, []);
  const actor = getCookieClient("user-type");
  const { reFetch } = useContext(ReFetchPhoto);

  const { data, isLoading } = useQuery({
    queryKey: ["user", reFetch],
    queryFn: async () => {
      // @ts-ignore
      return await AuthService.make<AuthService>(actor).GetUserDetails();
    },
  });
  const t = useTranslations("nav")
  const res: User | undefined = data?.data;
  const imageUrl = data?.data?.image?.[0]?.file_url;
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
        {!isLoading ? (
          <RoundedImage src={imageUrl ?? "/user.png"} alt={"user-profile"} />
        ) : (
          <LoadingSpin className={"w-5 h-5"} />
        )}
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
          <h2 className="text-sm ">
            {TranslateClient(res?.first_name)}{" "}
            {TranslateClient(res?.middle_name)}{" "}
            {TranslateClient(res?.last_name)}
          </h2>
          <div className="overflow-hidden whitespace-nowrap">
            <h1 className="opacity-[0.6]  inline-block animate-marquee pl-[100%]">
              {res?.email}
            </h1>
          </div>
        </div>

        <Link
          onClick={() => setOpenPopProfile(false)}
          suppressHydrationWarning
          href={`/${actor}/user-details`}
          className="opacity-[0.8]"
        >
          <div className="text-start px-4 py-1 cursor-pointer hover:bg-blue-200">
            <h3>{t("profile")}</h3>
          </div>
        </Link>
        {actor == "doctor" ? (
          <Link
            suppressHydrationWarning
            onClick={() => setOpenPopProfile(false)}
            href={`/doctor/clinic-details`}
            className="opacity-[0.8]"
          >
            <div className="text-start px-4 py-1 cursor-pointer hover:bg-blue-200">
              <h3>{t("clinicProfile")}</h3>
            </div>
          </Link>
        ) : (
          ""
        )}
        <div className="py-3 px-4 text-red-600 rounded-b-2xl cursor-pointer hover:bg-red-200 hover:text-white">
          <h3
            onClick={() => {
              deleteCookieClient("token");
              deleteCookieClient("user-type");
              deleteCookieClient("refresh_token");
              deleteCookieClient("role");
              deleteCookieClient("permissions");
              return Navigate("/");
            }}
          >
            {t("logout")}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ProfileOptionsPopover;