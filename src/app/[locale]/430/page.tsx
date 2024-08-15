"use client";
import AuthSubmitButton from "@/components/common/Auth/Customer/AuthSubmitButton";
import { Link } from "@/navigation";
import React from "react";

const page = () => {
  return (
    <div className={"w-screen h-screen relative"}>
      <div
        className={"w-screen h-screen  bg-[#1FB8B9] "}
        style={{ borderRadius: "0% 25% 100% 0% / 25% 0% 100% 25%" }}
      ></div>
      <div
        className={
          "w-screen h-screen bg-[#8AFEFF]  absolute top-0 flex justify-center items-center"
        }
        style={{ borderRadius: "100% 0% 100% 0% / 100% 0% 0% 0%" }}
      >
        <div className={"flex flex-col justify-center items-center"}>
          <h1
            className={
              "kodchasan text-error md:text-[40px] text-[23px] font-semibold "
            }
          >
            Sorry !!
          </h1>
          <h1
            className={
              "kodchasan text-error md:text-[40px] text-[23px] font-semibold "
            }
          >
            Your Account Has Been Blocked
          </h1>
          <Link
            href={"auth/doctor/login"}
            className={
              "w-52 h-16 mt-8 relative group hover:border-2 border-[#1FB8B9]  rounded-[30px]"
            }
          >
            <AuthSubmitButton className={"w-full h-full group-hover:hidden"} />
            <p
              className={
                "absolute tracking-5 top-1/2 right-1/2 group-hover:text-black -translate-y-1/2 translate-x-1/2 font-bold kodchasan text-[16px] text-white"
              }
            >
              Log In
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
