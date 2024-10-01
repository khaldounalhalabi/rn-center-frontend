"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import RoundedImage from "@/components/common/RoundedImage";
import OpenAndClose from "@/hooks/OpenAndClose";
import HandleClickOutSide from "@/hooks/HandleClickOutSide";
import { User } from "@/Models/User";
import {
  deleteCookieClient,
  getCookieClient,
  setCookieClient,
} from "@/Actions/clientCookies";
import { useQuery } from "@tanstack/react-query";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import { Link, useRouter } from "@/navigation";
import { AuthService } from "@/services/AuthService";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { ReFetchPhoto } from "@/app/[locale]/providers";
import { useTranslations } from "next-intl";
import { Role } from "@/enum/Role";
import { RealTimeEvents } from "@/Models/NotificationPayload";
import { NotificationHandler } from "@/components/common/NotificationHandler";

const ProfileOptionsPopover = () => {
  const [openPopProfile, setOpenPopProfile] = useState<boolean>(false);
  const ref: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const router = useRouter();
  useEffect(() => {
    HandleClickOutSide(ref, setOpenPopProfile);
  }, []);
  const actor = getCookieClient("user-type");
  const { reFetch } = useContext(ReFetchPhoto);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["user", reFetch],
    queryFn: async () => {
      // @ts-ignore
      return await AuthService.make<AuthService>(actor)
        .GetUserDetails()
        .then((res) => {
          // @ts-ignore
          if (res?.data?.role[0]?.name == Role.CLINIC_EMPLOYEE) {
            const permissions = res?.data?.permissions ?? [""];
            setCookieClient("permissions", permissions?.toString());
          } else {
            setCookieClient("permissions", "dffds%2Cfdsf");
          }
          return res;
        });
    },
  });
  const t = useTranslations("nav");
  const res: User | undefined = data?.data;
  const imageUrl = data?.data?.image?.[0]?.file_url;
  return (
    <div
      ref={ref}
      className={openPopProfile ? " relative" : "overflow-clip relative"}
    >
      <NotificationHandler
        handle={(payload) => {
          if (
            payload.getNotificationType() == RealTimeEvents.PermissionChange
          ) {
            console.log("hiiiiiii");
            refetch().then(() => {
              window.document.location.reload();
            });
          }
        }}
        isPermenant={true}
      />
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
          <div className="text-sm ">
            {TranslateClient(res?.first_name)}{" "}
            {TranslateClient(res?.middle_name)}{" "}
            {TranslateClient(res?.last_name)}
          </div>
          <div className="overflow-hidden whitespace-nowrap">
            <div className="opacity-[0.6]  inline-block animate-marquee pl-[100%]">
              {res?.email}
            </div>
          </div>
        </div>

        <Link
          onClick={() => setOpenPopProfile(false)}
          suppressHydrationWarning
          href={`/${actor}/user-details`}
          className="opacity-[0.8]"
        >
          <button className="text-start px-4 py-1 cursor-pointer hover:bg-blue-200">
            {t("profile")}
          </button>
        </Link>
        {actor == "doctor" ? (
          <Link
            suppressHydrationWarning
            onClick={() => setOpenPopProfile(false)}
            href={`/doctor/clinic-details`}
            className="opacity-[0.8]"
          >
            <button className="text-start px-4 py-1 cursor-pointer hover:bg-blue-200">
              {t("clinicProfile")}
            </button>
          </Link>
        ) : (
          ""
        )}
        <div className="py-3 px-4 text-red-600 rounded-b-2xl cursor-pointer hover:bg-red-200 hover:text-white">
          <button
              type={'button'}
            onClick={() => {
              deleteCookieClient("token");
              deleteCookieClient("user-type");
              deleteCookieClient("refresh_token");
              deleteCookieClient("role");
              deleteCookieClient("permissions");
            }}
          >
            <Link href={`/auth/${actor}/login`}>
              {t("logout")}
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileOptionsPopover;