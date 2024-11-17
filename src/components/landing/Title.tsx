import AuthSubmitButton from "@/components/common/Auth/Customer/AuthSubmitButton";
import React from "react";
import { StatisticService } from "@/services/StatisticService";
import { StatisticsPublic } from "@/Models/Statistics";
import Link  from "next/link";

const Title = async () => {
  const data = await StatisticService.make<StatisticService>().getStatistics();

  const res: StatisticsPublic | undefined = data?.data;
  return (
    <>
      <div id={'home'} className={"flex flex-col gap-6"}>
        <div
          className={
            "text-[#013567] text-[30px] lg:text-[30px] font-bold md:text-[25px] 2xl:text-[35px]"
          }
        >
          <h2>Get complete control</h2>
          <h2>over your clinic in just a few steps</h2>
          <h2>
            with <span className={"text-[#1FB8B9]"}>Planet of Medicine</span>
          </h2>
        </div>
        <div
          className={`opacity-60 text-[20px] lg:text-[20px] md:text-[15px] 2xl:text-[20px]`}
        >
          <p>Planet of Medicine gives you full control over</p>
          <p>your clinic’s operations. Streamline everything</p>
          <p>from appointments to invoicing, all in one place</p>
          <p>Start a free trial and see</p>
          <p>how easy clinic management can be</p>
        </div>
        <Link href={"/#start"}>
          <AuthSubmitButton
            className={
              "w-1/2 px-6 py-2 text-[13px] lg:text-[16px] md:text-[14px] 2xl:text-[20px]"
            }
          >
            Get Started
          </AuthSubmitButton>
        </Link>
      </div>
      <div className={"w-full flex justify-around items-center "}>
        <div
          className={
            "max-w-[180px] w-[25%] h-[125px] rounded-2xl py-5 bg-gradient-to-r from-[#ddfafa] to-[#d5f4f5] flex flex-col justify-center items-center"
          }
        >
          <h2 className={"font-bold lg:text-[35px] md:text-[30px] text-[25px]"}>
            {/* {res?.clinics_count} */}
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
            {/* {res?.success_appointments_count}% */}
            32.2K
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
            99%
          </h2>
          <h2 className={"lg:text-[15px] md:text-[12px] text-[8px] "}>
            Ratings
          </h2>
        </div>
      </div>
    </>
  );
};

export default Title;