"use client";
import { Link } from "@/navigation";
import ListCards from "@/components/customer/ListCards";
import BloodBankIcon from "@/components/icons/BloodBankIcon";
import { BloodDonationService } from "@/services/BloodDonationService";
import { useInfiniteQuery } from "@tanstack/react-query";
import LoadingSpin from "@/components/icons/LoadingSpin";
import React from "react";

const BloodDonationsList = () => {
  const { data, isPending, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["bloodBank"],
      queryFn: async ({ pageParam }) => {
        return await BloodDonationService.make<BloodDonationService>().getAvailable(
          pageParam,
          undefined,
          undefined,
          undefined,
          6
        );
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        return !lastPage.paginate?.is_last
          ? lastPage.paginate?.current_page
            ? lastPage.paginate?.current_page + 1
            : null
          : null;
      },
    });

  return (
    <div
      className={"p-5 md:p-10 max-h-screen  overflow-y-scroll"}
      onScroll={(e: any) => {
        const { scrollTop, clientHeight, scrollHeight } = e.target;
        if (scrollHeight - scrollTop >= clientHeight - 50 && hasNextPage) {
          fetchNextPage();
        }
      }}
    >
      <Link href={"/"} className={"card-title text-[#1FB8B9] underline"}>
        Get donor
      </Link>
      <div className={"w-full h-full my-10"}>
        {isPending ? (
          <div className={"w-full h-[300px] flex justify-center items-center"}>
            <LoadingSpin className={"w-12 h-12"} />
          </div>
        ) : (
          data?.pages?.map((page) =>
            page.data?.map((donationRequest, index) => {
              return (
                <div key={index}>
                  <ListCards
                    image={<BloodBankIcon />}
                    info={
                      <div
                        className={
                          "w-full h-full flex flex-col items-center justify-start pt-4"
                        }
                      >
                        <p
                          className={"font-semibold text-[16px] text-[#013567]"}
                        >
                          {donationRequest.blood_group}
                        </p>
                      </div>
                    }
                  >
                    <div
                      className={
                        "w-full h-full flex flex-col justify-center gap-1"
                      }
                    >
                      <h2 className={"text-[#013567] text-[16px]"}>
                        {donationRequest.full_name}
                      </h2>
                      <p className={"text-[#1FB8B9] text-[14px]"}>
                        {donationRequest.contact_phone}
                      </p>
                      <p className={"text-[#013567] text-[14px]"}>
                        {donationRequest.nearest_hospital}
                      </p>
                    </div>
                  </ListCards>
                </div>
              );
            })
          )
        )}
        {isFetchingNextPage && (
          <div className={`flex items-center justify-center`}>
            <LoadingSpin className={`w-12 h-12`} />
          </div>
        )}
      </div>
    </div>
  );
};
export default BloodDonationsList;
