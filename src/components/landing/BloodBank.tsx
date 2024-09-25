import BloodLandingIcon from "@/components/icons/BloodLandingIcon";
import AuthSubmitButton from "@/components/common/Auth/Customer/AuthSubmitButton";
import React from "react";

const BloodBank = () => {
  return (
    <>
      <div className={"flex flex-col md:flex-row my-6 px-6"}>
        <div className={"md:w-1/2 w-full flex justify-center items-center"}>
          <BloodLandingIcon />
        </div>
        <div
          className={
            "md:w-1/2 w-full flex flex-col justify-center items-center"
          }
        >
          <div className={"flex gap-4 flex-col md:items-start items-center"}>
            <h2 className={"text-[35px] font-bold"}>Blood Bank</h2>
            <div className={" text-[15px] opacity-80 font-extralight"}>
              <p>Lorem ipsum dolor sit amet consectetur</p>
              <p>adipisicing elit. Expedita fugiat,</p>
              <p>impedit ad saepe sit fuga iste tempora</p>
            </div>
            <div className={" text-[15px] opacity-80 font-extralight"}>
              <p>Lorem ipsum dolor sit amet consectetur</p>
              <p>adipisicing elit. Expedita fugiat,</p>
              <p>impedit ad saepe sit fuga iste tempora</p>
            </div>
            <AuthSubmitButton className={"w-1/2 px-10 py-2"}>
              Explore
            </AuthSubmitButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default BloodBank;
