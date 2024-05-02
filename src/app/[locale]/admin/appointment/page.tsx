"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { Appointment } from "@/Models/Appointment";
import { AppointmentService } from "@/services/AppointmentService";
import { translate } from "@/Helpers/Translations";
import Select from "@/components/common/ui/Selects/Select";
import Datepicker from "@/components/common/ui/Datepicker";
import Timepicker from "@/components/common/ui/TimePicker";
import SelectFilter from "@/components/common/ui/Selects/SelectFilter";
import DatepickerFilter from "@/components/common/ui/DatePickerFilter";
import TimepickerFilter from "@/components/common/ui/TimePickerFilter";

const statusData = ["checkin", "blocked", "cancelled", "pending"];
const typeData = ["online", "manual"];
const tableData: DataTableData<Appointment> = {
  createUrl: `/admin/appointment/create`,
  title: "Appointment",
  schema: [
    {
      name: "id",
      sortable: true,
      label: "id",
    },
    {
      name: "clinic.user.first_name",
      sortable: true,
      label: "Clinic",
      render: (_first_name, appointment) => {
        return (
            <p>{translate(appointment?.clinic?.name)}</p>
        );
      },
    },
    {
      name: "clinic.user.first_name",
      sortable: true,
      label: "Doctor",
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
      name: "appointment_sequence",
      label: "Sequence",
      sortable: true,
    },
    {
      name: "date",
      label: "Date",
      sortable: true,
    },
    {
      name: "from",
      label: "From",
      sortable: true,
    },
    {
      name: "to",
      label: "To",
      sortable: true,
    },
    {
      name: "status",
      label: "Status",
      render: (data) =>
        data == "checkout" ? (
          <span className={`badge badge-neutral`}>Checkout</span>
        ) : data == "cancelled" ? (
          <span className={`badge badge-warning`}>Cancelled</span>
        ) : data == "pending" ? (
          <span className={`badge badge-primary`}>Pending</span>
        ) : data == "checkin" ? (
          <span className={`badge badge-success`}>Checkin</span>
        ) : (
          <span className={`badge badge-error`}>Blocked</span>
        ),
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
      label: "Actions",
      render: (_undefined, data, setHidden) => (
        <ActionsButtons
          id={data?.id}
          buttons={["edit", "delete", "show"]}
          baseUrl={`/admin/appointment`}
          editUrl={`/admin/appointment/${data?.id}/edit`}
          showUrl={`/admin/appointment/${data?.id}`}
          setHidden={setHidden}
        />
      ),
    },
  ],
  api: async (page, search, sortCol, sortDir, perPage, params) =>
    await AppointmentService.make<AppointmentService>(
      "admin",
    ).indexWithPagination(page, search, sortCol, sortDir, perPage, params),
  filter: (params, setParams) => {
    return (
      <div className={"w-full grid grid-cols-1"}>
        <label className={"label"}>
          Status :
          <SelectFilter
            data={statusData}
            selected={"pending"}
            onChange={(event: any) => {
              setParams({ ...params, status: event.target.value });
            }}
          />
        </label>
        <label className="label">
          Type :
          <SelectFilter
            data={typeData}
            selected={"pending"}
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
          />
        </label>
        <label className="label">
          From :
          <TimepickerFilter

            onChange={(time: any) => {
              setParams({ ...params, from: time?.format("HH:mm") });
            }}
          />
        </label>
        <label className="label">
          To :
          <TimepickerFilter
              onChange={(time: any) => {
              setParams({ ...params, to: time?.format("HH:mm") });
            }}
          />
        </label>
      </div>
    );
  },
};
const Page = () => {
  return <DataTable {...tableData} />;
};

export default Page;
