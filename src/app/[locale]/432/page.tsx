"use client";
import React from "react";
import { Link } from "@/navigation";
import AuthSubmitButton from "@/components/common/Auth/Customer/AuthSubmitButton";

const page = () => {
  return (
    <div
      className={"min-h-screen max-w-screen w-full overflow-hidden relative"}
    >
      <div className={"absolute top-0 left-0 py-6 md:px-10 px-6"}>
        <img
          src={"/pom.png"}
          alt={".."}
          className={"md:w-20 md:h-20 w-10 h-10"}
        />
      </div>
      <div
        className={
          "md:w-[23%] w-[28%] md:h-[30vh] h-[23vh] bg-[#1FB8B9] absolute top-0 right-0"
        }
        style={{
          boxShadow: "0 0 12.5px 1px #1fb8b9",
          borderRadius: "100% 0% 0% 100% / 0% 0% 25% 100%",
        }}
      ></div>
      <div
        className={
          "md:w-[23%] w-[28%] md:h-[35vh] h-[23vh] bg-[#1FB8B9] absolute bottom-0 left-0"
        }
        style={{
          boxShadow: "0 0 12.5px 1px #1fb8b9",
          borderRadius: "0% 100% 100% 0% / 50% 100% 0% 50%",
        }}
      ></div>
      <div
        className={
          "absolute top-1/2 right-1/2 md:w-[43%] w-[80%]  h-fit transform translate-x-1/2 md:-translate-y-[80%] -translate-y-[100%] "
        }
      >
        {/*<ExpiredIcon className={'w-full h-full'}/>*/}
      </div>
      <div
        className={
          "flex flex-col items-center absolute top-1/2 left-1/2 md:w-[43%] w-[80%] h-fit kodchasan transform -translate-x-1/2 md:translate-y-[60%] translate-y-0"
        }
      >
        <h3 className={"font-bold text-[30px] text-[#013567]  text-center"}>
          Sorry!
        </h3>
        <h3 className={"font-bold text-[30px] text-[#013567]  text-center"}>
          Your subscription has expired
        </h3>
        <h3 className={"font-light text-[20px] text-[#013567] text-center"}>
          Contact us: <span className={"text-[#1FB8B9]"}>07700000000</span>
        </h3>
        <Link
          href={"auth/doctor/login"}
          className={
            "md:w-56 block md:h-16 w-36 h-10 mt-8 relative group hover:border-2 border-[#1FB8B9]  rounded-[30px]"
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
  );
};

export default page;
