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

const statusData = AppointmentStatuses();
const typeData = ["online", "manual", "all"];

const Appointments = ({ clinicId }: { clinicId: number }) => {
  const tableData: DataTableData<Appointment> = {
    schema: [
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
        render: (data) => (
          <p>
            <span>{data.toLocaleString()}</span>
          </p>
        ),
      },
      {
        name: "date",
        label: "Date",
        sortable: true,
      },
      {
        name: "status",
        label: "Status",
        render: (data) =>
          data == AppointmentStatusEnum.CHECKOUT ? (
            <span className={`badge badge-neutral`}>Checkout</span>
          ) : data == AppointmentStatusEnum.CANCELLED ? (
            <span className={`badge badge-warning`}>Cancelled</span>
          ) : data == AppointmentStatusEnum.PENDING ? (
            <span className={`badge badge-primary`}>Pending</span>
          ) : data == AppointmentStatusEnum.CHECKIN ? (
            <span className={`badge badge-success`}>Checkin</span>
          ) : data == AppointmentStatusEnum.BOOKED ? (
            <span className={`badge badge-error`}>Booked</span>
          ) : (
            <span className={`badge badge-info`}>Completed</span>
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
            buttons={["edit", "delete", "show", "logs"]}
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
      ).getClinicAppointments(
        clinicId,
        page ?? 0,
        search,
        sortCol,
        sortDir,
        perPage,
        params,
      ),
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

export default Appointments;
