"use client"
import React, {Fragment, useState, useRef, useEffect} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import dayjs from 'dayjs';
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
import {Navigate} from "@/Actions/navigate";
import {Link} from "@/navigation";

const CalendarComponent = () => {
    const calendarRef = useRef(null);
    const [openFilter, setOpenFilter] = useState(false);
    const [startDate, setStartDate] = useState<string>(dayjs().startOf('month').format("YYYY-MM-DD"));
    const [endDate, setEndDate] = useState<string>(dayjs().format("YYYY-MM-DD"));
    const statusData = AppointmentStatuses();
    const typeData = ["online", "manual", "all"];
    const [params, setParams] = useState({});
    const [startFilter, setStartFilter] = useState(0);

    const filter = (params:any, setParams:any) => {
        return (
            <>
                <div className="w-full grid grid-cols-1">
                    <label className="label">
                        Status :
                        <SelectFilter
                            data={[...statusData, "all"]}
                            selected={""}
                            onChange={(event:any) => {
                                setParams({ ...params, status: event.target.value });
                            }}
                        />
                    </label>
                    <label className="label">
                        Type :
                        <SelectFilter
                            data={typeData}
                            selected={params.type ?? "online"}
                            onChange={(event:any) => {
                                setParams({ ...params, type: event.target.value });
                            }}
                        />
                    </label>
                    <label className="label">Start Date :</label>
                    <DatepickerFilter
                        onChange={(time) => {
                            setStartDate(time?.format("YYYY-MM-DD")??"");
                            setParams({
                                ...params,
                                date: [time?.format("YYYY-MM-DD"), endDate],
                            });
                        }}
                        defaultValue={startDate ?? dayjs().startOf('month').format("YYYY-MM-DD")}
                    />
                    <label className="label">End Date :</label>
                    <DatepickerFilter
                        onChange={(time) => {
                            setEndDate(time?.format("YYYY-MM-DD")??"");
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
                            console.log(params);
                            setStartFilter(startFilter+1);
                            setOpenFilter(false);
                        }}
                    >
                        Apply
                    </button>
                    <button
                        type="button"
                        className="inline-flex justify-center bg-error hover:bg-red-600 px-4 py-2 border border-transparent rounded-md font-medium text-sm text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                        onClick={() => {
                            setParams({});
                            setOpenFilter(false);
                        }}
                    >
                        Reset Filters
                    </button>
                </div>
            </>
        );
    };

    const { data: calendarData,isLoading } = useQuery({
        queryFn: async () => {
            return await AppointmentService.make<AppointmentService>("doctor").indexWithPagination(undefined, undefined, undefined, undefined, undefined, params);
        },
        queryKey: ['calendar', startFilter]
    });

    const events = calendarData?.data?.map(appointment => ({
        id: appointment.id,
        start: dayjs(appointment.date).toDate(),
        end: dayjs(appointment.date).toDate(),
        allDay: true,
        extendedProps: {
            appointment: appointment,
            customer: appointment.customer,
        },
    }));

    console.log(startDate)
    const renderEventContent = (eventInfo:any) => {
        const { customer,appointment } = eventInfo.event.extendedProps;
        const firstName = TranslateClient(customer?.user?.first_name);
        const middleName = TranslateClient(customer?.user?.middle_name);
        const lastName = TranslateClient(customer?.user?.last_name);

        return (
            <Link href={`/doctor/appointment/${appointment?.id}`} className={'text-wrap'} >
                <div className={'label text-sm bg-success flex flex-col rounded-xl hover:bg-gray-400'}>
                    <p>An appointment with :</p>
                    <span className={'text-black'}>{firstName} {middleName} {lastName}</span>
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
                                        className="font-medium text-gray-900 text-lg leading-6"
                                    >
                                        Filters
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
                        className="btn btn-info btn-sm btn-square"
                        onClick={() => setOpenFilter((prevState) => !prevState)}
                    >
                        <FilterIcon />
                    </button>
                </div>
                {isLoading?<div className={'flex w-full h-full justify-center items-center'}><LoadingSpin className={'w-7 h-7'}/></div>
                : <FullCalendar
                        ref={calendarRef}
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        // @ts-ignore
                        events={events}
                        initialDate={startDate}
                        eventContent={renderEventContent}
                    />}

            </PageCard>
        </>
    );
};

export default CalendarComponent;