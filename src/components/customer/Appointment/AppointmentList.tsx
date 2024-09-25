"use client";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import LoadingSpin from "@/components/icons/LoadingSpin";
import React, { useState } from "react";
import ListCards from "@/components/customer/ListCards";
import dayjs from "dayjs";
import { AppointmentService } from "@/services/AppointmentService";
import { getMedia } from "@/Models/Media";
import RoundedImage from "@/components/common/RoundedImage";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import AppointmentStatusValue from "@/components/customer/Appointment/AppointmentStatusValue";

const AppointmentList = () => {
  const [params, setParams] = useState<object | undefined>({
    date: [
      dayjs().format("YYYY-MM-DD"),
      dayjs().add(1, "year").format("YYYY-MM-DD"),
    ],
  });

  const { data, isPending, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["next_appointments_list", params],
      queryFn: async ({ pageParam }) =>
        await AppointmentService.make<AppointmentService>(
          "customer",
        ).indexWithPagination(
          pageParam,
          undefined,
          undefined,
          undefined,
          6,
          params,
        ),
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
      className={`py-5 px-1 max-h-screen md:p-10 overflow-y-scroll`}
      onScroll={(e: any) => {
        const { scrollTop, clientHeight, scrollHeight } = e.target;
        if (scrollHeight - scrollTop === clientHeight && hasNextPage) {
          fetchNextPage();
        }
      }}
    >
      <div className={`flex items-center justify-between w-full`}>
        <h1
          className={`text-lg md:text-2xl text-title flex items-center justify-between gap-4`}
        >
          Next appointments
        </h1>
        <button
          className={`text-lg md:text-2xl text-title font-bold hover:underline`}
          onClick={() => {
            setParams((prev) =>
              prev
                ? undefined
                : {
                    date: [
                      dayjs().format("YYYY-MM-DD"),
                      dayjs().add(1, "year").format("YYYY-MM-DD"),
                    ],
                  },
            );
          }}
        >
          {params ? "History" : "Upcoming"}
        </button>
      </div>

      <div className={"w-full my-10"}>
        {isPending ? (
          <div className={"w-full h-[300px] flex justify-center items-center"}>
            <LoadingSpin className={"w-12 h-12"} />
          </div>
        ) : (
          data?.pages.map((page) =>
            page?.data?.map((appointment) => {
              return (
                <ListCards
                  key={appointment.id}
                  image={
                    <RoundedImage
                      src={getMedia(appointment?.clinic?.user?.image?.[0])}
                      alt={"clinic image"}
                    />
                  }
                  url={`/customer/appointments/${appointment.id}`}
                  info={
                    <label className="text-xs md:text-lg">
                      sequence :
                      <span className={`text-brand-primary`}>
                        {appointment.appointment_sequence}
                      </span>
                    </label>
                  }
                >
                  <div
                    className={
                      "flex flex-col items-start justify-center text-sm md:text-lg"
                    }
                  >
                    <h1 className={`md:text-lg text-title`}>
                      Dr.{" "}
                      {TranslateClient(appointment?.clinic?.user?.full_name)}
                    </h1>
                    <p className={"text-title text-xs md:text-md"}>
                      {TranslateClient(appointment.clinic?.name)}
                    </p>
                    <p className={`text-lg text-brand-primary`}>
                      {appointment.date}
                    </p>
                    <p>
                      <AppointmentStatusValue status={appointment.status} />
                    </p>
                  </div>
                </ListCards>
              );
            }),
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

export default AppointmentList;
