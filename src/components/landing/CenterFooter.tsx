import AppointmentLandingIcon from "@/components/icons/AppointmentLandingIcon";
import TrackLandingIcon from "@/components/icons/TrackLandingIcon";
import TimeLandingIcon from "@/components/icons/TimeLandingIcon";
import React from "react";

const CenterFooter = () => {
  return (
    <div
      className={
        "w-full h-[180px] md:h-[380px] lg:h-[420px] flex flex-col items-center  bg-gradient-to-r from-[#e3f4f4] to-[#e0eff0]"
      }
    >
      <div
        className={
          "flex flex-col items-center h-1/2 bg-[#ebfcfc] md:bg-gradient-to-r from-[#e3f4f4] to-[#e0eff0] w-full pt-6"
        }
      >
        <h2 className={"md:text-[35px] text-[22px] font-bold "}>
          Features & Services
        </h2>
        <div
          className={
            "text-center text-[20px] opacity-80 font-extralight md:block hidden"
          }
        >
          <p>Lorem ipsum dolor sit amet consectetur</p>
          <p>adipisicing elit. Expedita fugiat,</p>
        </div>
      </div>
      {/*---------------------------*/}
      <div
        className={"h-2/3 md:hidden flex justify-center items-center  gap-4 "}
      >
        <AppointmentLandingIcon />
        <div>
          <h2 className={"text-[14px] font-bold"}>Online Appoint ment</h2>
          <div className={" text-[12px] opacity-80 font-extralight"}>
            <p>Lorem ipsum dolor sit amet consectetur</p>
            <p>adipisicing elit. Expedita fugiat,</p>
          </div>
        </div>
      </div>
      {/*---------------------*/}
      <div
        className={
          "justify-around items-center h-1/2 mx-8 w-full hidden md:flex pb-6"
        }
      >
        <div className={"flex flex-col items-center"}>
          <AppointmentLandingIcon />
          <h2 className={"text-[20px] font-bold"}>Online Appoint ment</h2>
          <div className={"text-center text-[15px] opacity-80 font-extralight"}>
            <p>Lorem ipsum dolor sit amet consectetur</p>
            <p>adipisicing elit. Expedita fugiat,</p>
          </div>
        </div>
        <div className={"flex flex-col items-center"}>
          <TrackLandingIcon />
          <h2 className={"text-[20px] font-bold"}>Track your Appointment</h2>
          <div className={"text-center text-[15px] opacity-80 font-extralight"}>
            <p>Lorem ipsum dolor sit amet consectetur</p>
            <p>adipisicing elit. Expedita fugiat,</p>
          </div>
        </div>
        <div className={"flex flex-col items-center"}>
          <TimeLandingIcon />
          <h2 className={"text-[20px] font-bold"}>
            Reduce Clinic Waiting Time
          </h2>
          <div className={"text-center text-[15px] opacity-80 font-extralight"}>
            <p>Lorem ipsum dolor sit amet consectetur</p>
            <p>adipisicing elit. Expedita fugiat,</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CenterFooter;
