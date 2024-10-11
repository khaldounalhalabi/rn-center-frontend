"use client";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { SpecialityService } from "@/services/SpecialityService";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { getMedia } from "@/Models/Media";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import React from "react";

const SpecialityList = () => {
  const { data, isPending, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["Clinic-customer"],
      queryFn: async ({ pageParam }) => {
        return await SpecialityService.make<SpecialityService>(
          "public",
        ).indexWithPagination(pageParam, undefined, undefined, undefined, 6);
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        return !lastPage.paginate?.is_last
          ? lastPage.paginate?.current_page
            ? lastPage.paginate?.current_page + 1
            : null
          : null;
      },
      placeholderData: keepPreviousData,
    });
  return (
    <div
      className={"p-5 md:p-10 max-h-screen  overflow-y-scroll"}
      onScroll={(e: any) => {
        const { scrollTop, clientHeight, scrollHeight } = e.target;
        if (scrollHeight - scrollTop === clientHeight && hasNextPage) {
          fetchNextPage();
        }
      }}
    >
      <div className={`flex items-center justify-between px-4 w-full`}>
        <h1
          className={`text-lg md:text-2xl  text-[#151D48] flex items-center justify-between gap-4`}
        >
          Speciality
        </h1>
      </div>
      <div className={"w-full my-10 flex flex-col sm:flex-row flex-wrap"}>
        {isPending ? (
          <div className={"w-full h-[300px] flex justify-center items-center"}>
            <LoadingSpin className={"w-12 h-12"} />
          </div>
        ) : (
          data?.pages.map((page) =>
            page?.data?.map((e, index) => {
              return (
                <div
                  className="h-[34vh] my-4  w-full sm:w-1/2 xl:w-1/3 "
                  key={index}
                >
                  <div className={"block h-full relative mx-4 "}>
                    <div className={"w-full h-[50%]"}>
                      <img
                        className={"w-full h-full rounded-t-xl"}
                        src={
                          e?.image?.[0]
                            ? getMedia(e?.image?.[0])
                            : "/no-clinic-image.png"
                        }
                        alt={".."}
                      />
                    </div>
                    <div
                      className={
                        "w-full h-[50%] flex shadowCard  rounded-b-2xl "
                      }
                    >
                      <div
                        className={
                          "w-[60%] pl-2 text-nowrap flex flex-col justify-around"
                        }
                      >
                        <h2
                          className={
                            "overflow-hidden h-[30%] text-[17px] text-[#151D48] w-full"
                          }
                        >
                          Name :{TranslateClient(e.name)}
                        </h2>
                        <h3
                          className={
                            "overflow-hidden h-[30%] text-[12px] text-[#737791] w-full"
                          }
                        >
                          Tags : {TranslateClient(e?.tags)}
                        </h3>
                        <strong
                          className={
                            "overflow-hidden h-[30%] text-[12px] text-[#737791] w-full"
                          }
                        >
                          Description : {TranslateClient(e?.description)}
                        </strong>
                      </div>
                    </div>
                    <div className="absolute flex text-[#30ACC2] gap-1 justify-center items-center w-[30%] h-10 bg-white rounded-2xl top-1/2 right-[20%] transform translate-x-1/2 -translate-y-1/2">
                      <h2 className={"text-[14px]"}>
                        Clinics : {Number(e?.clinics_count).toLocaleString()}
                      </h2>
                    </div>
                  </div>
                </div>
              );
            }),
          )
        )}
        {isFetchingNextPage && (
          <div className={`w-full flex items-center justify-center`}>
            <LoadingSpin className={`w-12 h-12`} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecialityList;
