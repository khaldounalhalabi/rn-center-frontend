"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { Appointment } from "@/Models/Appointment";
import { AppointmentService } from "@/services/AppointmentService";
import SelectFilter from "@/components/common/ui/Selects/SelectFilter";
import DatepickerFilter from "@/components/common/ui/Date/DatePickerFilter";
import AppointmentStatusColumn from "@/components/admin/appointment/AppointmentStatusColumn";
import { Link } from "@/navigation";
import { RealTimeEvents } from "@/Models/NotificationPayload";
import { useTranslations } from "next-intl";
import { NotificationHandler } from "@/components/common/NotificationHandler";
import { RoleEnum } from "@/enum/RoleEnum";
import { getEnumValues } from "@/Helpers/Enums";
import { AppointmentStatusEnum } from "@/enum/AppointmentStatusEnum";
import AppointmentTypeEnum from "@/enum/AppointmentTypeEnum";
import TranslatableEnum from "@/components/common/ui/TranslatableEnum";
import AppointmentLogModal from "@/components/admin/appointment/AppointmentLogModal";

const Page = () => {
  const t = useTranslations("common.appointment.table");
  const tableData: DataTableData<Appointment> = {
    createUrl: `/admin/appointment/create`,
    title: `${t("appointments")}`,
    schema: [
      {
        name: "id",
        sortable: true,
        label: "id",
      },
      {
        name: "clinic.user.full_name",
        label: t("doctorName"),
        render: (doctorName, record) => (
          <Link href={`/admin/clinics/${record?.clinic_id}`} className={"btn"}>
            {doctorName}
          </Link>
        ),
      },
      {
        name: "customer.user.full_name",
        label: t("patientName"),
        render: (patientName, record) => (
          <Link
            href={`/admin/patients/${record?.customer_id}`}
            className={"btn"}
          >
            {patientName}
          </Link>
        ),
      },
      {
        name: "status",
        label: `${t("status")}`,
        render: (_status, appointment) => {
          return (
            appointment && (
              <div className={"flex items-center justify-center"}>
                <AppointmentStatusColumn appointment={appointment} />
              </div>
            )
          );
        },
        sortable: true,
      },
      {
        name: "type",
        label: t("type"),
        sortable: true,
        render: (type) => <TranslatableEnum value={type} />,
      },
      {
        name: "total_cost",
        label: t("totalCost"),
        sortable: true,
      },

      {
        name: "appointment_sequence",
        label: t("sequence"),
        sortable: true,
      },
      {
        name: "date_time",
        label: t("date"),
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
      await AppointmentService.make<AppointmentService>(RoleEnum.ADMIN)
        .indexWithPagination(page, search, sortCol, sortDir, perPage, params)
        .then((res) => {
          return res;
        }),
    filter: (params, setParams) => {
      return (
        <div className={"w-full grid grid-cols-1"}>
          <label className={"label"}>
            {t("status")} :
            <SelectFilter
              data={getEnumValues(AppointmentStatusEnum)}
              selected={params.status ?? "all"}
              onChange={(event: any) => {
                setParams({ ...params, status: event.target.value });
              }}
            />
          </label>
          <label className="label">
            {t("type")} :
            <SelectFilter
              data={getEnumValues(AppointmentTypeEnum)}
              selected={params.type}
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
