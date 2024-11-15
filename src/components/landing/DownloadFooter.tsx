"use client";
import React, { useEffect, useState } from "react";
import {JoinRequestService} from "@/services/JoinRequestService";
import Form from "@/components/common/ui/Form";
import AuthSubmitButton from "@/components/common/Auth/Customer/AuthSubmitButton";
import Grid from "@/components/common/ui/Grid";
import InputLoginCustomer from "@/components/common/ui/Inputs/InputLoginCustomer";
import SelectorLanding from "@/components/common/ui/Selects/SelectorLanding";

const DownloadFooter: React.FC = () => {
  const handleSubmit = async (data:any) => {
    return await JoinRequestService.make<JoinRequestService>("public").store(data).then((res)=>{
      console.log(res)
      return res
    })
  };
  return (
    <div
      className={
        "my-4 flex gap-4 md:gap-2 lg:gap-6 flex-col md:flex-row justify-around items-center w-full max-h-fit md:h-[400px] bg-gradient-to-r from-[#d7eff6] to-[#e0efef]"
      }
    >
      <div className={" flex flex-col justify-center items-start gap-4 w-full md:w-1/3 p-4 md:p-0"}>
        <h2 className={"md:text-[30px] lg:text-[35px] font-bold"}>
          Join PoM Family
        </h2>
        <p className={'text-[12px] opacity-80 font-extralight'}>
          Unlock a new level of clinic management!
          Book a live demo with our team and experience the tools
          that make running a clinic smoother, faster, and more rewarding.
        </p>
      </div>
      <div className={"flex h-full w-full md:w-1/3 p-4 md:p-0"}>
        <div
            className={
              " w-full flex flex-col justify-center md:items-start items-center"
            }
        >
          <Form
              className={"w-full max-w-[650px]"}
              handleSubmit={handleSubmit}
              otherSubmitButton={(isSubmitting) => (
                  <AuthSubmitButton
                      isSubmitting={isSubmitting}
                      className={"py-2 px-8"}
                  >
                    Submit
                  </AuthSubmitButton>
              )}
              defaultButton={false}
          >
            <h2 className={"card-title"}>Join as a Doctor</h2>
            <Grid md={2} className={'relative z-50'}>
              <InputLoginCustomer
                  type={"text"}
                  name={"doctor_name"}
                  label={"Doctor name"}
              />
              <InputLoginCustomer
                  type={"text"}
                  name={"clinic_name"}
                  label={"Clinic name"}
              />
              <InputLoginCustomer
                  type={"text"}
                  name={"phone_number"}
                  label={"Phone number"}
              />
              <SelectorLanding name={'city_id'}/>
            </Grid>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default DownloadFooter;