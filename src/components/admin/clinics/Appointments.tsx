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
import AppointmentStatuses, {
  AppointmentStatusEnum,
} from "@/enum/AppointmentStatus";
import AppointmentLogModal from "@/components/admin/appointment/AppointmentLogModal";
import AppointmentStatusColumn from "@/components/admin/appointment/AppointmentStatusColumn";
import { RealTimeEvents } from "@/Models/NotificationPayload";
import { useTranslations } from "next-intl";
import { NotificationHandler } from "@/components/common/NotificationHandler";
import PercentBadge from "@/components/icons/PercentBadge";

const statusData = AppointmentStatuses();
const typeData = ["online", "manual", "all"];

const Appointments = ({ clinicId }: { clinicId: number }) => {
  const t = useTranslations("common.appointment.table");
  const tableData: DataTableData<Appointment> = {
    schema: [
      {
        name: "customer.user.first_name",
        sortable: true,
        label: `${t("patientName")}`,
        render: (_first_name, appointment) => {
          return (
            <div className={`flex flex-col items-start`}>
              <p>
                {TranslateClient(appointment?.customer?.user?.first_name)}{" "}
                {TranslateClient(appointment?.customer?.user?.middle_name)}{" "}
                {TranslateClient(appointment?.customer?.user?.last_name)}
              </p>
            </div>
          );
        },
      },
      {
        name: "total_cost",
        label: `${t("totalCost")}`,
        render: (data, appointment: Appointment | undefined) => (
          <span className="flex items-center justify-between gap-1">
            {data?.toLocaleString() + " " + t("iqd")}{" "}
            {(appointment?.system_offers?.length ?? 0) > 0 && (
              <PercentBadge className="text-[#00a96e] h-6 w-6" />
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
            <span className={`badge badge-success`}>{t("online")}</span>
          ) : (
            <span className={`badge badge-neutral`}>{t("manual")}</span>
          ),
        sortable: true,
      },
      {
        name: "appointment_unique_code",
        label: `${t("appointment_unique_code")}`,
        sortable: false,
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
                    payload.getNotificationType() ==
                      RealTimeEvents.AppointmentStatusChange &&
                    revalidate
                  ) {
                    revalidate();
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
            {t("status")} :
            <SelectFilter
              data={[...statusData, "all"]}
              selected={params.status ?? AppointmentStatusEnum.PENDING}
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

export default Appointments;
