"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { Appointment } from "@/Models/Appointment";
import { AppointmentService } from "@/services/AppointmentService";
import { translate } from "@/Helpers/Translations";
import SelectFilter from "@/components/common/ui/Selects/SelectFilter";
import DatepickerFilter from "@/components/common/ui/DatePickerFilter";
import TimepickerFilter from "@/components/common/ui/TimePickerFilter";
import AppointmentStatuses, {
  AppointmentStatusEnum,
} from "@/enm/AppointmentStatus";
import AppointmentLogModal from "@/components/admin/appointment/AppointmentLogModal";
import AppointmentStatusColumn from "@/components/admin/appointment/AppointmentStatusColumn";
import { toast } from "react-toastify";

const Page = () => {
  const handleCopyLink = (id: number | undefined) => {
    navigator.clipboard.writeText(`${window.location.href}/${id}`);
    toast.success("Link Has Been Copied Successfully");
  };

  const statusData = AppointmentStatuses();
  const typeData = ["online", "manual", "all"];
  const tableData: DataTableData<Appointment> = {
    createUrl: `/admin/appointment/create`,
    title: "Appointment",
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
        name: "clinic.name",
        sortable: true,
        label: "Clinic Name",
        translatable: true,
      },
      {
        name: "clinic.user.first_name",
        sortable: true,
        label: "Doctor Name",
        render: (_first_name, appointment) => {
          return (
            <p>
              {translate(appointment?.clinic?.user?.first_name)}{" "}
              {translate(appointment?.clinic?.user?.middle_name)}{" "}
              {translate(appointment?.clinic?.user?.last_name)}
            </p>
          );
        },
      },
      {
        name: "customer.user.first_name",
        sortable: true,
        label: "Patient",
        render: (_first_name, appointment) => {
          return (
            <div className={`flex flex-col items-start`}>
              <p>
                {translate(appointment?.customer?.user?.first_name)}{" "}
                {translate(appointment?.customer?.user?.middle_name)}{" "}
                {translate(appointment?.customer?.user?.last_name)}
              </p>
            </div>
          );
        },
      },
      {
        name: "status",
        label: "Status",
        render: (_status, appointment, setHidden, revalidate) => {
          return (
            <AppointmentStatusColumn
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
      },
      {
        name: "date",
        label: "Date",
        sortable: true,
      },

      {
        label: "Actions",
        render: (_undefined, data, setHidden) => (
          <ActionsButtons
            id={data?.id}
            buttons={["edit", "delete", "show"]}
            baseUrl={`/admin/appointment`}
            editUrl={`/admin/appointment/${data?.id}/edit`}
            showUrl={`/admin/appointment/${data?.id}`}
            setHidden={setHidden}
          >
            <AppointmentLogModal appointmentId={data?.id} />
          </ActionsButtons>
        ),
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await AppointmentService.make<AppointmentService>(
        "admin"
      ).indexWithPagination(page, search, sortCol, sortDir, perPage, params),
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
          <label className="label">
            Date :
            <DatepickerFilter
              onChange={(time: any) => {
                setParams({ ...params, date: time?.format("YYYY-MM-DD") });
              }}
              defaultValue={params.date}
            />
          </label>
          <label className="label">
            From :
            <TimepickerFilter
              onChange={(time: any) => {
                setParams({ ...params, from: time?.format("HH:mm") });
              }}
              defaultValue={params.from}
            />
          </label>
          <label className="label">
            To :
            <TimepickerFilter
              onChange={(time: any) => {
                setParams({ ...params, to: time?.format("HH:mm") });
              }}
              defaultValue={params.to}
            />
          </label>
        </div>
      );
    },
  };

  return <DataTable {...tableData} />;
};

export default Page;
