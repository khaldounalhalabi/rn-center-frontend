"use client";
import React, { Fragment, useState } from "react";
import DataTable, {
    DataTableData,
} from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import SelectFilter from "@/components/common/ui/Selects/SelectFilter";
import dayjs from "dayjs";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import { Link } from "@/navigation";
import ClinicTransactionDate, {
    DateFilter,
} from "@/enum/ClinicTransactionDate";
import HandleFormatArrayDateFilter from "@/hooks/HandleFormatArrayDateFilter";
import DatepickerFilter from "@/components/common/ui/Date/DatePickerFilter";
import ExportButton from "@/components/admin/appointment-deductions/ExportButton";
import { Dialog, Transition } from "@headlessui/react";
import ExcelIcon from "@/components/icons/ExcelIcon";
import AllMonth, {MonthsEnum} from "@/enum/Month";
import {AppointmentDeductionsService} from "@/services/AppointmentDeductionsService";
import {AppointmentDeductions} from "@/Models/AppointmentDeductions";
import AppointmentDeductionsStatusArray from "@/enum/AppointmentDeductionsStatus";

import {Clinic} from "@/Models/Clinic";

interface filterExportType {
    year: string;
    month: string;
}

const AppointmentDeductionTable = ({clinicId}:{clinicId:number}) => {
    const [filterExport, setFilterExport] = useState<filterExportType>({
        year: "",
        month: "",
    });
    let [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [showCustomDate, setShowCustomDate] = useState(true);
    const [customDate, setCustomDate] = useState(DateFilter.CUSTOM_DATE);
    const tableData: DataTableData<AppointmentDeductions> = {
        title: `Appointment Deductions`,
        extraButton: (
            <>
                <button
                    className="btn btn-info btn-sm btn-square"
                    onClick={openModal}
                >
                    <ExcelIcon className={`w-6 h-6 cursor-pointer `} />
                </button>
            </>
        ),
        schema: [
            {
                name: "id",
                label: `id`,
                sortable: true,
            },
            {
                name: "amount",
                label: `Amount`,
                sortable: true,
            },
            {
                name: "status",
                label: `Status`,
                sortable: true,
            },
            {
                name: "date",
                label: `Date`,
                sortable: true,
            },
            {
                name: "appointment.date",
                label: `App Date`,
                sortable: true,
                render: (_id, transaction) => {
                    return (
                        <>
                            {transaction?.appointment_id ? (
                                <div className={"btn btn-sm  cursor-pointer"}>
                                    <Link
                                        href={`/admin/appointment/${transaction?.appointment_id}`}
                                    >
                                        {transaction?.appointment?.date}
                                    </Link>
                                </div>
                            ) : (
                                <span className={"badge badge-warning"}>No Data</span>
                            )}
                        </>
                    );
                },
            },
            {
                label: `Actions`,
                render: (_undefined, data, setHidden) => (
                    <ActionsButtons
                        id={data?.id}
                        buttons={["show"]}
                        baseUrl={`/admin/appointment-deductions`}
                        showUrl={`/admin/appointment-deductions/${data?.id}`}
                        setHidden={setHidden}
                    ></ActionsButtons>
                ),
            },
        ],
        api: async (page, search, sortCol, sortDir, perPage, params) =>
            await AppointmentDeductionsService.make<AppointmentDeductionsService>("admin").getClinicAppointmentDeductions(
                clinicId,
                page,
                search,
                sortCol,
                sortDir,
                perPage,
                params,
            ),
        filter: (params, setParams) => {
            return (
                <div className={"w-full  grid grid-cols-1"}>
                    <label className="label">Status :</label>
                    <SelectFilter
                        data={AppointmentDeductionsStatusArray()}
                        selected={params.type ?? ""}
                        onChange={(event: any) => {
                            setParams({ ...params, status: event.target.value });
                        }}
                    />

                    <label className="label">Range :</label>
                    <SelectFilter
                        data={ClinicTransactionDate()}
                        selected={customDate}
                        onChange={(event: any) => {
                            if (event.target.value == DateFilter.CUSTOM_DATE) {
                                setShowCustomDate(true);
                                setCustomDate(DateFilter.CUSTOM_DATE);
                            } else {
                                setCustomDate(event.target.value);
                                setShowCustomDate(false);
                                const date = HandleFormatArrayDateFilter(event.target.value);
                                setParams({
                                    ...params,
                                    date: date,
                                });
                            }
                        }}
                    />
                    {showCustomDate ? (
                        <>
                            <label className="label">Start Date :</label>
                            <DatepickerFilter
                                onChange={(time: any) => {
                                    setStartDate(time?.format("YYYY-MM-DD hh:mm"));
                                    setParams({
                                        ...params,
                                        date: [time?.format("YYYY-MM-DD hh:mm"), endDate],
                                    });
                                }}
                                defaultValue={startDate ?? ""}
                            />
                            <label className="label">End Date :</label>
                            <DatepickerFilter
                                onChange={(time: any) => {
                                    setEndDate(time?.format("YYYY-MM-DD hh:mm"));
                                    setParams({
                                        ...params,
                                        date: [startDate, time?.format("YYYY-MM-DD hh:mm")],
                                    });
                                }}
                                defaultValue={endDate ?? ""}
                            />
                        </>
                    ) : (
                        ""
                    )}
                </div>
            );
        },
    };
    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <div className={"w-full my-4 grid grid-cols-1"}>
                                        <label className={"label"}>Year :</label>
                                        <input
                                            className="input input-bordered w-full focus:outline-pom focus:border-pom"
                                            type={"number"}
                                            min={1900}
                                            max={2099}
                                            step={1}
                                            onChange={(e) =>
                                                setFilterExport({
                                                    ...filterExport,
                                                    year: e.target.value,
                                                })
                                            }
                                            defaultValue={filterExport.year}
                                        />
                                        <label className={"label"}>Month :</label>
                                        <SelectFilter
                                            data={AllMonth()}
                                            selected={MonthsEnum.NON}
                                            onChange={(e: any) =>{
                                                if(e.target.value == MonthsEnum.NON){
                                                    setFilterExport({
                                                        ...filterExport,
                                                        month: "",
                                                    })
                                                }else {
                                                    setFilterExport({
                                                        ...filterExport,
                                                        month: e.target.value,
                                                    })
                                                }
                                            }}
                                        />
                                    </div>

                                    <ExportButton data={filterExport} close={closeModal} />
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            <DataTable {...tableData} />
        </>
    );
};

export default AppointmentDeductionTable;