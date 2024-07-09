"use client";
import React, { useState } from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { Appointment } from "@/Models/Appointment";
import { AppointmentService } from "@/services/AppointmentService";
import SelectFilter from "@/components/common/ui/Selects/SelectFilter";
import DatepickerFilter from "@/components/common/ui/Date/DatePickerFilter";
import AppointmentStatuses, {
  AppointmentStatusEnum,
} from "@/enum/AppointmentStatus";
import AppointmentLogModal from "@/components/admin/appointment/AppointmentLogModal";
import AppointmentStatusColumn from "@/components/doctor/appointment/AppointmentStatusColumn";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import AppointmentSpeechButton from "@/components/doctor/appointment/AppointmentSpeechButton";
import { getCookieClient } from "@/Actions/clientCookies";

import ExportButton from "@/components/common/Appointment/ExportButton";
import {Link} from "@/navigation";
import CalenderIcon from "@/components/icons/CalenderIcon";
import DocumentPlus from "@/components/icons/DocumentPlus";

const Page = () => {
  const handleCopyLink = (id: number | undefined) => {
    navigator.clipboard.writeText(`${window.location.href}/${id}`);
    toast.success("Link Has Been Copied Successfully");
  };
  const locale = getCookieClient("NEXT_LOCALE");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState(dayjs().format("YYYY-MM-DD hh:mm"));
  const statusData = AppointmentStatuses();
  const typeData = ["online", "manual", "all"];
  const tableData: DataTableData<Appointment> = {
    createUrl: `/doctor/appointment/create`,
    title: "Appointment",
    extraButton: (
     <>
       <Link href={`/doctor/appointment/calender`} className={'mx-1'}>
         <button className="btn btn-info btn-sm p-1 btn-square">
           <CalenderIcon className={'w-6 h-6'}/>
         </button>
       </Link>
       <ExportButton />
     </>
    ),
    schema: [
      {
        name: "id",
        sortable: true,
        label: "id",
        render: (_id, appointment) => {
          return (
            <button
              type={"button"}
              className="btn btn-sm"
              onClick={() => handleCopyLink(appointment?.id)}
            >
              {appointment?.id}
            </button>
          );
        },
      },
      {
        name: "service.name",
        label: "Service Name",
        sortable: true,
        translatable: true,
      },
      {
        name: "status",
        label: "Status",
        render: (_status, appointment, setHidden, revalidate) => {
          return (
            <AppointmentStatusColumn
              userType={"doctor"}
              appointment={appointment}
              revalidate={revalidate}
            />
          );
        },
        sortable: true,
      },
      {
        name: "type",
        label: "Type",
        render: (data) =>
          data == "online" ? (
            <span className={`badge badge-success`}>Online</span>
          ) : (
            <span className={`badge badge-neutral`}>Manual</span>
          ),
        sortable: true,
      },

      {
        name: "appointment_sequence",
        label: "Sequence",
        render: (data) => (
          <p>
            <span>{data}</span>
          </p>
        ),
      },
      {
        name: "date",
        label: "Date",
        sortable: true,
      },

      {
        label: "Actions",
        render: (_undefined, data, setHidden, revalidate) => {
          const sequence = data?.appointment_sequence
            .toString()
            .split("")
            .join(" ");
          const lang = locale == "en" ? "en-IN" : "ar-IQ";
          const message =
            locale == "en"
              ? `The appointment number ${sequence} the doctor is waiting for you`
              : `الموعد رقم ${sequence}  الطبيبُ في انتظارك`;
          return (
            <ActionsButtons
              id={data?.id}
              buttons={["edit", "show"]}
              baseUrl={`/doctor/appointment`}
              editUrl={`/doctor/appointment/${data?.id}/edit`}
              showUrl={`/doctor/appointment/${data?.id}`}
              setHidden={setHidden}
            >
              <>
                <AppointmentLogModal appointmentId={data?.id} />
                <AppointmentSpeechButton message={message} language={lang} />
              </>
            </ActionsButtons>
          );
        },
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await AppointmentService.make<AppointmentService>("doctor")
        .setHeaders({ filtered: true })
        .indexWithPagination(page, search, sortCol, sortDir, perPage, params),
    filter: (params, setParams) => {
      return (
        <div className={"w-full grid grid-cols-1"}>
          <label className={"label"}>
            Status :
            <SelectFilter
              data={[...statusData, "all"]}
              selected={params.status ?? AppointmentStatusEnum.PENDING}
              onChange={(event: any) => {
                setParams({ ...params, status: event.target.value });
              }}
            />
          </label>
          <label className="label">
            Type :
            <SelectFilter
              data={typeData}
              selected={params.type ?? "online"}
              onChange={(event: any) => {
                setParams({ ...params, type: event.target.value });
              }}
            />
          </label>
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
            defaultValue={endDate ?? dayjs().format("YYYY-MM-DD hh:mm")}
          />
        </div>
      );
    },
  };

  return <DataTable {...tableData} />;
};

export default Page;