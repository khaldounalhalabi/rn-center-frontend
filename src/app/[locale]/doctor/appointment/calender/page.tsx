"use client";
import React, { Fragment, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayjs from "dayjs";
import PageCard from "@/components/common/ui/PageCard";
import { useQuery } from "@tanstack/react-query";
import { AppointmentService } from "@/services/AppointmentService";
import FilterIcon from "@/components/icons/FilterIcon";
import { Dialog, Transition } from "@headlessui/react";
import SelectFilter from "@/components/common/ui/Selects/SelectFilter";
import AppointmentStatuses from "@/enum/AppointmentStatus";
import DatepickerFilter from "@/components/common/ui/Date/DatePickerFilter";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { Link } from "@/navigation";
import { useLocale, useTranslations } from "next-intl";
import arLocale from "@fullcalendar/core/locales/ar";

const CalendarComponent = () => {
  const locale = useLocale();
  const calendarLocale = locale === "ar" ? "ar" : "en";
  const calendarRef = useRef(null);
  const [openFilter, setOpenFilter] = useState(false);
  const [startDate, setStartDate] = useState<string>(
    dayjs().startOf("month").format("YYYY-MM-DD"),
  );
  const [endDate, setEndDate] = useState<string>(dayjs().format("YYYY-MM-DD"));
  const statusData = AppointmentStatuses();
  const typeData = ["online", "manual", "all"];
  const [params, setParams] = useState({});
  const [startFilter, setStartFilter] = useState(0);
  const t = useTranslations("common.appointment.calender");
  const filter = (params: any, setParams: any) => {
    return (
      <>
        <div className="w-full grid grid-cols-1">
          <label className="label">
            {t("status")} :
            <SelectFilter
              data={[...statusData, "all"]}
              selected={""}
              onChange={(event: any) => {
                setParams({ ...params, status: event.target.value });
              }}
              translated={true}
            />
          </label>
          <label className="label">
            {t("type")} :
            <SelectFilter
              data={typeData}
              selected={params.type ?? "online"}
              onChange={(event: any) => {
                setParams({ ...params, type: event.target.value });
              }}
              translated={true}
            />
          </label>
          <label className="label">{t("startDate")} :</label>
          <DatepickerFilter
            onChange={(time) => {
              setStartDate(time?.format("YYYY-MM-DD") ?? "");
              setParams({
                ...params,
                date: [time?.format("YYYY-MM-DD"), endDate],
              });
            }}
            defaultValue={
              startDate ?? dayjs().startOf("month").format("YYYY-MM-DD")
            }
          />
          <label className="label">{t("endDate")} :</label>
          <DatepickerFilter
            onChange={(time) => {
              setEndDate(time?.format("YYYY-MM-DD") ?? "");
              setParams({
                ...params,
                date: [startDate, time?.format("YYYY-MM-DD")],
              });
            }}
            defaultValue={endDate ?? dayjs().format("YYYY-MM-DD")}
          />
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            type="button"
            className="inline-flex justify-center bg-blue-100 hover:bg-blue-200 px-4 py-2 border border-transparent rounded-md font-medium text-blue-900 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={() => {
              setStartFilter(startFilter + 1);
              setOpenFilter(false);
            }}
          >
            {t("apply")}
          </button>
          <button
            type="button"
            className="inline-flex justify-center bg-error hover:bg-red-600 px-4 py-2 border border-transparent rounded-md font-medium text-sm text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
            onClick={() => {
              setParams({});
              setOpenFilter(false);
            }}
          >
            {t("resetFilters")}
          </button>
        </div>
      </>
    );
  };

  const { data: calendarData, isLoading } = useQuery({
    queryFn: async () => {
      return await AppointmentService.make<AppointmentService>(
        "doctor",
      ).indexWithPagination(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        params,
      );
    },
    queryKey: ["calendar", startFilter],
  });

  const events = calendarData?.data?.map((appointment) => ({
    id: appointment.id,
    start: dayjs(appointment.date).toDate(),
    end: dayjs(appointment.date).toDate(),
    allDay: true,
    extendedProps: {
      appointment: appointment,
      customer: appointment.customer,
    },
  }));

  const renderEventContent = (eventInfo: any) => {
    const { customer, appointment } = eventInfo.event.extendedProps;
    const firstName = TranslateClient(customer?.user?.first_name);
    const middleName = TranslateClient(customer?.user?.middle_name);
    const lastName = TranslateClient(customer?.user?.last_name);

    return (
      <Link
        href={`/doctor/appointment/${appointment?.id}`}
        className={"text-wrap"}
      >
        <div
          className={
            "label text-sm bg-[#1fb8b9] flex flex-col rounded-xl hover:bg-gray-400"
          }
        >
          <p>{t("anAppointmentWith")} :</p>
          <span className={"text-black"}>
            {firstName} {middleName} {lastName}
          </span>
        </div>
      </Link>
    );
  };

  return (
    <>
      <Transition appear show={openFilter} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setOpenFilter(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex justify-center items-center p-4 min-h-full text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="bg-white shadow-xl p-6 rounded-2xl w-full max-w-md text-left transform transition-all overflow-hidden align-middle">
                  <Dialog.Title
                    as="h3"
                    className="text-start font-medium text-gray-900 text-lg leading-6"
                  >
                    {t("filters")}
                  </Dialog.Title>
                  {filter(params, setParams)}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <PageCard>
        <div className="flex justify-between mb-4">
          <button
            className="p-2  rounded-full border-[1px] border-[#44c4c5] bg-[#8fdbdc] hover:bg-[#1fb8b9]"
            onClick={() => setOpenFilter((prevState) => !prevState)}
          >
            <FilterIcon />
          </button>
        </div>
        {isLoading ? (
          <div className={"flex w-full h-full justify-center items-center"}>
            <LoadingSpin className={"w-7 h-7"} />
          </div>
        ) : (
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            // @ts-ignore
            events={events}
            initialDate={startDate}
            locale={calendarLocale}
            locales={[arLocale]}
            eventContent={renderEventContent}
          />
        )}
      </PageCard>
    </>
  );
};

export default CalendarComponent;
