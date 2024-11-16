"use client";
import { Link } from "@/navigation";
import Form from "@/components/common/ui/Form";
import InputLoginCustomer from "@/components/common/ui/Inputs/InputLoginCustomer";
import AuthSubmitButton from "@/components/common/Auth/Customer/AuthSubmitButton";
import React from "react";
import Grid from "@/components/common/ui/Grid";

import SelectorLanding from "@/components/common/ui/Selects/SelectorLanding";
import {JoinRequestService} from "@/services/JoinRequestService";
import FacebookIcon from "@/components/icons/FacebookIcon";
import InstagramIcon from "@/components/icons/instaIcon";
import TwitterIcon from "@/components/icons/TwitarIcon";

const Footer = () => {

  const handleSubmit = async (data:any) => {
    return await JoinRequestService.make<JoinRequestService>("public").store(data).then((res)=>{
      console.log(res)
      return res
    })
  };
  return (
    <div className={"md:max-h-[530px]"}>
      <div className={"flex md:flex-row flex-col-reverse justify-around md:gap-0 gap-4 items-start md:ml-0 ml-4 md:items-center h-full"}>
        <div
          className={
            "w-full md:w-1/3 flex flex-col justify-center items-center p-6 h-full"
          }
        >
         <h2 className={'text-[20px] lg:text-[20px] md:text-[15px] 2xl:text-[20px] font-bold'}>Planet of Medicine</h2>
          <p>All rights reserved.</p>
          <div className={'flex gap-3 my-6'}>
            <FacebookIcon/>
            <InstagramIcon/>
            <TwitterIcon />
          </div>
        </div>
        <div className={"md:w-[25%] w-full h-full flex flex-col justify-center items-center"}>
          <div className={"flex flex-col gap-6"}>
            <h2 className={"card-title"}>Quick links</h2>
            <div className={'grid md:grid-cols-1 grid-cols-2 gap-6'}>
              <p className={'hover:text-[#1FB8B9] cursor-pointer'}>
                <Link href={"/"}>Services</Link>
              </p>
              <p className={'hover:text-[#1FB8B9] cursor-pointer'}>
                <Link href={"/"}>About</Link>
              </p>
              <p className={'hover:text-[#1FB8B9] cursor-pointer'}>
                <Link href={"/"}>Hospitals</Link>
              </p>
              <p className={'hover:text-[#1FB8B9] cursor-pointer'}>
                <Link href={"/"}>Blood bank</Link>
              </p>
            </div>
          </div>
        </div>
        <div
          className={
            "md:w-[30%] w-full flex md:pt-10 p-4 flex-col justify-center md:items-start items-center"
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
            <h2 className={"card-title"}>Contact Us</h2>
            <div className={'relative z-50 flex flex-col gap-4'}>
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
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Footer;