import AuthSubmitButton from "@/components/common/Auth/Customer/AuthSubmitButton";
import React from "react";

const Title = () => {
  return (
    <>
      <div className={"flex flex-col gap-6"}>
        <div
          className={
            "text-[#013567] text-[30px] lg:text-[30px] font-bold md:text-[25px] 2xl:text-[35px]"
          }
        >
          <h2>Book & manage</h2>
          <h2>your medical appointments</h2>
          <h2>and more ...</h2>
          <h2>
            with <span className={"text-[#1FB8B9]"}>Planet of Medicine</span>
          </h2>
        </div>
        <div
          className={`opacity-60 text-[20px] lg:text-[20px] md:text-[15px] 2xl:text-[25px]`}
        >
          <p>Lorem ipsum dolor sit amet consectetur</p>
          <p>adipisicing elit. Expedita fugiat,</p>
          <p>impedit ad saepe sit fuga iste tempora</p>
        </div>
        <AuthSubmitButton
          className={
            "w-1/2 px-6 py-2 text-[13px] lg:text-[16px] md:text-[14px] 2xl:text-[20px]"
          }
        >
          Explore Clinics
        </AuthSubmitButton>
      </div>
      <div className={"w-full flex justify-around items-center "}>
        <div
          className={
            "max-w-[180px] w-[25%] h-[125px] rounded-2xl py-5 bg-gradient-to-r from-[#ddfafa] to-[#d5f4f5] flex flex-col justify-center items-center"
          }
        >
          <h2 className={"font-bold lg:text-[35px] md:text-[30px] text-[25px]"}>
            5K
          </h2>
          <h2 className={"lg:text-[15px] md:text-[12px] text-[8px] "}>
            Clinic
          </h2>
        </div>
        <div
          className={
            "max-w-[180px] w-[25%] h-[125px]  rounded-2xl py-5 bg-gradient-to-r from-[#ddfafa] to-[#d5f4f5] flex flex-col justify-center items-center"
          }
        >
          <h2 className={"font-bold lg:text-[35px] md:text-[30px] text-[25px]"}>
            96%
          </h2>
          <h2 className={"lg:text-[15px] md:text-[12px] text-[8px] "}>
            Success
          </h2>
          <h2 className={"lg:text-[15px] md:text-[12px] text-[8px] "}>
            Appointments
          </h2>
        </div>
        <div
          className={
            "max-w-[180px] w-[25%] h-[125px]  rounded-2xl py-5 bg-gradient-to-r from-[#ddfafa] to-[#d5f4f5] flex flex-col justify-center items-center"
          }
        >
          <h2 className={"font-bold lg:text-[35px] md:text-[30px] text-[25px]"}>
            3.5K
          </h2>
          <h2 className={"lg:text-[15px] md:text-[12px] text-[8px] "}>
            Clinic
          </h2>
        </div>
      </div>
    </>
  );
};

export default Title;
