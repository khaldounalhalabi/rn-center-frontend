"use client";
import React, { useEffect, useRef, useState } from "react";
import RoundedImage from "@/components/common/RoundedImage";
import OpenAndClose from "@/hooks/OpenAndClose";
import HandleClickOutSide from "@/hooks/HandleClickOutSide";
import { POST } from "@/Http/Http";
import {AuthResponse, User} from "@/Models/User";
import {deleteCookieClient, getCookieClient} from "@/Actions/clientCookies";
import {swal} from "@/Helpers/UIHelpers";
import {Navigate} from "@/Actions/navigate";
import {useQuery} from "@tanstack/react-query";
import {TranslateClient} from "@/Helpers/TranslationsClient";
import {Link} from "@/navigation";
import {AuthService} from "@/services/AuthService";

const ProfileOptionsPopover = () => {
  const [openPopProfile, setOpenPopProfile] = useState<boolean>(false);
  const ref: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  useEffect(() => {
    HandleClickOutSide(ref, setOpenPopProfile);
  }, []);
  const actor = getCookieClient('user-type')
   const {data} = useQuery({
    queryKey:['user'],
    queryFn:async ()=>{
      // @ts-ignore
      return await AuthService.make<AuthService>(actor).GetUserDetails()
    }
  })
  const res :User | undefined = data?.data

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
          <h2 className='text-sm '>{TranslateClient(res?.first_name)}{" "}
            {TranslateClient(res?.middle_name)}{" "}
            {TranslateClient(res?.last_name)}
          </h2>
          <p className="opacity-[0.6] overflow-x-hidden">{res?.email}</p>
        </div>

        <Link onClick={()=>setOpenPopProfile(false)} href={`/${actor}/user_details`} className="opacity-[0.8]">
          <div className="text-start px-4 py-1 cursor-pointer hover:bg-blue-200">
            <h3>{actor == "doctor"?"User Profile":"Profile"}</h3>
          </div>
        </Link>
        {actor == "doctor"?
            <Link onClick={()=>setOpenPopProfile(false)} href={`/${actor}/clinic-details`} className="opacity-[0.8]">
              <div className="text-start px-4 py-1 cursor-pointer hover:bg-blue-200">
                <h3>Clinic Profile</h3>
              </div>
            </Link>:""}
        <div
          className="py-3 px-4 text-red-600 rounded-b-2xl cursor-pointer hover:bg-red-200 hover:text-white"
        >
          <h3 onClick={()=>{
            swal.fire({
              title: "Are you sure?",
              text: "You won't Logout!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes!"
            }).then((result) => {
              if (result.isConfirmed) {
                return POST<AuthResponse>(`${actor}/logout`,{}).then(()=>{
                  deleteCookieClient('token')
                  deleteCookieClient('user-type')
                  deleteCookieClient('refresh_token')
                  return Navigate('/')
                })
              }
            });
          }}>Logout</h3>

        </div>
      </div>
    </div>
  );
};

export default ProfileOptionsPopover;