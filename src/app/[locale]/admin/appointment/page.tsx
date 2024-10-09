"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { Appointment } from "@/Models/Appointment";
import { AppointmentService } from "@/services/AppointmentService";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import SelectFilter from "@/components/common/ui/Selects/SelectFilter";
import DatepickerFilter from "@/components/common/ui/Date/DatePickerFilter";
import AppointmentStatuses from "@/enum/AppointmentStatus";
import AppointmentLogModal from "@/components/admin/appointment/AppointmentLogModal";
import AppointmentStatusColumn from "@/components/admin/appointment/AppointmentStatusColumn";
import { toast } from "react-toastify";
import { Link } from "@/navigation";
import { RealTimeEvents } from "@/Models/NotificationPayload";
import { useTranslations } from "next-intl";
import { NotificationHandler } from "@/components/common/NotificationHandler";

const Page = () => {
  const t = useTranslations("common.appointment.table");
  const handleCopyLink = (id: number | undefined) => {
    navigator.clipboard.writeText(`${window.location.href}/${id}`);
    toast.success("Link Has Been Copied Successfully");
  };

  const statusData = AppointmentStatuses();
  const typeData = ["online", "manual", "all"];
  const tableData: DataTableData<Appointment> = {
    createUrl: `/admin/appointment/create`,
    title: `${t("appointments")}`,
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
        label: `${t("clinicName")}`,
        translatable: true,
      },
      {
        name: "clinic.user.first_name",
        sortable: true,
        label: `${t("doctorName")}`,
        render: (_first_name, appointment) => {
          return (
            <p>
              {TranslateClient(appointment?.clinic?.user?.first_name)}{" "}
              {TranslateClient(appointment?.clinic?.user?.middle_name)}{" "}
              {TranslateClient(appointment?.clinic?.user?.last_name)}
            </p>
          );
        },
      },
      {
        name: "customer.user.first_name",
        sortable: true,
        label: `${t("patientName")}`,
        render: (_first_name, appointment) => {
          return (
            <Link
              href={`/admin/patients/${appointment?.customer_id}`}
              className={`btn`}
            >
              {TranslateClient(appointment?.customer?.user?.first_name)}{" "}
              {TranslateClient(appointment?.customer?.user?.middle_name)}{" "}
              {TranslateClient(appointment?.customer?.user?.last_name)}
            </Link>
          );
        },
      },
      {
        name: "status",
        label: `${t("status")}`,
        render: (_status, appointment, setHidden, revalidate) => {
          return (
            <div className={"flex items-center justify-center"}>
              <AppointmentStatusColumn appointment={appointment} />
            </div>
          );
        },
        sortable: true,
      },
      {
        name: "type",
        label: `${t("type")}`,
        render: (data) =>
          data == "online" ? (
            <span className={` text-[#00a96e]`}>{t("online")}</span>
          ) : (
            <span className={` text-[#2b3440]`}>{t("manual")}</span>
          ),
        sortable: true,
      },
      {
        name: "total_cost",
        label: `${t("totalCost")}`,
        render: (data, appointment: Appointment | undefined) => (
          <span className="flex items-center justify-between gap-1">
            {data?.toLocaleString() + " IQD"}{" "}
            {(appointment?.system_offers?.length ?? 0) > 0 && (
              <span className="rounded-full w-3 h-3 bg-[#00a96e]"></span>
            )}
          </span>
        ),
      },

      {
        name: "appointment_sequence",
        label: `${t("sequence")}`,
      },
      {
        name: "date",
        label: `${t("date")}`,
        sortable: true,
      },
      {
        label: `${t("actions")}`,
        render: (_undefined, data, setHidden, revalidate) => (
          <ActionsButtons
            id={data?.id}
            buttons={["edit", "show"]}
            baseUrl={`/admin/appointment`}
            editUrl={`/admin/appointment/${data?.id}/edit`}
            showUrl={`/admin/appointment/${data?.id}`}
            setHidden={setHidden}
          >
            <>
              <NotificationHandler
                handle={(payload) => {
                  if (
                    revalidate &&
                    (payload.getNotificationType() ==
                      RealTimeEvents.AppointmentStatusChange ||
                      payload.getNotificationType() ==
                        RealTimeEvents.NewAppointment)
                  ) {
                    revalidate();
                    console.log("revalidated");
                  }
                }}
              />
              <AppointmentLogModal appointmentId={data?.id} />
            </>
          </ActionsButtons>
        ),
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await AppointmentService.make<AppointmentService>("admin")
        .indexWithPagination(page, search, sortCol, sortDir, perPage, params)
        .then((res) => {
          console.log(res);
          return res;
        }),
    filter: (params, setParams) => {
      return (
        <div className={"w-full grid grid-cols-1"}>
          <label className={"label"}>
            {t("status")} :
            <SelectFilter
              data={["all", ...statusData]}
              selected={params.status ?? "all"}
              onChange={(event: any) => {
                setParams({ ...params, status: event.target.value });
              }}
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
            />
          </label>
          <label className="label">
            {t("date")} :
            <DatepickerFilter
              onChange={(time: any) => {
                setParams({ ...params, date: time?.format("YYYY-MM-DD") });
              }}
              defaultValue={params.date}
            />
          </label>
        </div>
      );
    },
  };

  return <DataTable {...tableData} />;
};

export default Page;
