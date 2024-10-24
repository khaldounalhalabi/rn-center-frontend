"use client";
import { useQuery } from "@tanstack/react-query";
import { ClinicsService } from "@/services/ClinicsService";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import LandingLinIcon from "@/components/icons/LandinLinIcon";
import React from "react";

const Clinics = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["getClinic"],
    queryFn: async () => {
      return await ClinicsService.make<ClinicsService>(
        "public",
      ).indexWithPagination(undefined, undefined, undefined, undefined, 4);
    },
  });
  const res = data?.data ? data?.data : [];
  console.log(data);
  return (
    <div className={"w-full relative"}>
      <div className={"w-full flex flex-col justify-center items-center"}>
          <LandingLinIcon className={"w-full absolute top-10 left-0"} />
        <div className={"w-full flex justify-center my-4 z-10"}>
          <h2 className={"text-[35px]"}>Popular Clinics</h2>
        </div>
        <div className={"w-full flex justify-around flex-wrap z-10"}>
          {isLoading ? (
            <>
              <div className={"skeleton w-[22%] h-[300px]  rounded-xl"}></div>
              <div className={"skeleton w-[22%] h-[300px]  rounded-xl"}></div>
              <div className={"skeleton w-[22%] h-[300px]  rounded-xl"}></div>
              <div className={"skeleton w-[22%] h-[300px]  rounded-xl "}></div>
            </>
          ) : (
            res?.map((e, index) => {
              return (
                <div
                  key={index}
                  style={{ boxShadow: "5px 7.5px 11.5px -5.5px #dddddd" }}
                  className={
                    "md:w-[22%] md:min-w-[190px] md:h-[300px] w-1/3 h-[190px]  hover:p-2 cursor-pointer rounded-xl "
                  }
                >
                    <div className={"w-full h-[70%] "}>
                      <img
                        className={"w-full h-full rounded-t-xl object-cover"}
                        src={
                          e?.user?.image?.[0]
                            ? e?.user?.image[0]?.file_url
                            : "/no-clinic-image.png"
                        }
                        alt={".."}
                      />
                    </div>
                    <div
                      className={
                        "w-full h-[30%] gap-2 flex flex-col justify-center items-center"
                      }
                    >
                      <h2
                        className={
                          "text-[#151D48] text-center text-xs md:text-sm"
                        }
                      >
                        {TranslateClient(e.name)}
                      </h2>
                      <p
                        className={
                          "text-[#737791] text-center text-xs md:text-sm"
                        }
                      >
                        {TranslateClient(e.user?.full_name)} Doctor
                      </p>
                    </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Clinics