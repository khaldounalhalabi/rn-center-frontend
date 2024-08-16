"use client";
import RoundedImage from "@/components/common/RoundedImage";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import { Link } from "@/navigation";
import BackIcon from "@/components/icons/backIcon";
import React from "react";
import { User } from "@/Models/User";
import HandleGetUserData from "@/hooks/HandleGetUserAndClinic";
import { Statistics } from "@/Models/Statistics";
import LoadingSpin from "@/components/icons/LoadingSpin";

const UserDataDoctor = ({
  statisticsRes,
  isFetching,
  isLoading,
}: {
  statisticsRes: Statistics | undefined;
  isFetching: boolean;
  isLoading: boolean;
}) => {
  const user: User = HandleGetUserData();
  const thisMonth = Number(statisticsRes?.total_income_current_month ?? 0);
  const lastMonth = Number(statisticsRes?.total_income_prev_month ?? 0);

  function calculatePercentageChange(
    incomeLastMonth: number,
    incomeThisMonth: number,
  ) {
    if (incomeLastMonth === 0 && incomeThisMonth === 0) {
      return 0;
    } else if (incomeThisMonth === 0) {
      return -100;
    } else if (incomeLastMonth === 0) {
      return 100;
    } else {
      return (
        ((Number(incomeThisMonth) - Number(incomeLastMonth)) /
          Number(incomeLastMonth)) *
        100
      );
    }
  }

  const calc = calculatePercentageChange(
    Number(lastMonth ?? 0),
    Number(thisMonth ?? 0),
  );
  return (
    <>
      <div className="w-full min-h-[230px] flex flex-col rounded-2xl relative">
        <div className="h-1/2 bg-[#1fb8b9] text-white p-4 rounded-t-xl">
          <h2 className="text-lg md:text-xl font-semibold">Welcome Back !</h2>
          <p className="text-sm md:text-base mb-4">DashBoard</p>
        </div>

        <div className="h-1/2 flex flex-col xl:flex-row justify-between items-center xl:items-end bg-white rounded-b-xl">
          <div className="p-4">
            <div className="relative z-10 p-1 bg-white w-16 h-16 rounded-full -top-[40px] left-[10%]">
              <RoundedImage
                src={user.image?.[0]?.file_url ?? "/user.png"}
                alt={"user-profile"}
                className="w-full h-full"
              />
            </div>
            <h2 className="text-lg lg:text-xl md:text-lg font-semibold">
              {TranslateClient(user.first_name)}{" "}
              {TranslateClient(user.middle_name)}{" "}
              {TranslateClient(user.last_name)}
            </h2>
            <p className="text-sm md:text-base">{user.email}</p>
          </div>

          <div className="p-4 text-center">
            <h2 className=" font-semibold">Edit Profile</h2>
            <Link
              href={"/doctor/clinic-details/edit"}
              className="flex rounded-xl mt-2 bg-[#1fb8b9] hover:bg-[#1aa0a1] p-2 text-white"
            >
              Profile <BackIcon className="w-8 h-5 ml-1 mt-1 rotate-180" />
            </Link>
          </div>
        </div>
      </div>
      <div className="my-6 h-[140px] card bg-base-100 p-4">
        <div className="flex justify-between h-full">
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-lg md:text-xl font-semibold">
                Monthly Earning !
              </h2>
              <p className="text-sm md:text-base">This Month</p>
            </div>
            <h2 className="text-lg md:text-xl font-semibold">
              {isLoading || isFetching ? (
                <LoadingSpin />
              ) : (
                statisticsRes?.total_income_current_month
                  .toFixed(1)
                  .toLocaleUpperCase()
              )}
            </h2>
          </div>

          <div className="flex flex-col justify-end">
            {isLoading || isFetching ? (
              <LoadingSpin />
            ) : (
              <>
                {" "}
                {calc < 0 ? (
                  <span className="text-error flex items-center">
                    {calc}% <BackIcon className="w-4 h-6 -rotate-90" />
                  </span>
                ) : calc > 0 ? (
                  <span className="flex items-center text-green-500">
                    {calc}% <BackIcon className="w-4 h-6 rotate-90" />
                  </span>
                ) : (
                  <span>{calc}%</span>
                )}
              </>
            )}
            <p className="text-sm md:text-base">From Previous Month</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDataDoctor;
