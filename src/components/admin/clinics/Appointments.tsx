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
const statusData = ["Checkin", "Blocked", "Cancelled", "Pending"];
const typeData = ["Online","Manual"]

const Appointment = ({ clinicId }: { clinicId:number }) => {
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
              <Select
                  data={statusData}
                  selected={"Pending"}
                  onChange={(event:any) => {
                    setParams({ ...params, status: event.target.value})
                  }}
              />
            </label>
            <label className="label">
              Type :
              <Select
                  data={typeData}
                  selected={"Pending"}
                  onChange={(event:any) => {
                    setParams({ ...params, type: event.target.value})

                  }}
              />
            </label>
            <label className="label">
              Date :
              <Datepicker  onChange={(time:any)=>{
                console.log(time?.format("YYYY-MM-DD"))
                setParams({ ...params, date: time?.format("YYYY-MM-DD")})
              }} />
            </label>
            <label className="label">
              From :
              <Timepicker  onChange={(time:any)=>{
                setParams({ ...params, from: time?.format("HH:mm")})
              }}/>

            </label>
            <label className="label">
              To :
              <Timepicker  onChange={(time:any)=>{
                setParams({ ...params, to: time?.format("HH:mm")})
              }}/>

            </label>
          </div>
      );
    },
  };
  return <DataTable {...tableData} />;
};

export default Appointment;
