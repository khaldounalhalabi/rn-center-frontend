"use client";

import { Link } from "@/navigation";
import AppointmentStatusColumn from "@/components/admin/appointment/AppointmentStatusColumn";
import TranslatableEnum from "@/components/common/ui/labels-and-values/TranslatableEnum";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { NotificationHandler } from "@/components/common/helpers/NotificationHandler";
import { RealTimeEvents } from "@/models/NotificationPayload";
import AppointmentLogModal from "@/components/admin/appointment/AppointmentLogModal";
import React from "react";
import { useTranslations } from "next-intl";
import DataTable, {
  DataTableData,
  DataTableSchema,
} from "@/components/common/Datatable/DataTable";
import { Appointment } from "@/models/Appointment";
import Select from "@/components/common/ui/selects/Select";
import { getEnumValues } from "@/helpers/Enums";
import { AppointmentStatusEnum } from "@/enums/AppointmentStatusEnum";
import AppointmentTypeEnum from "@/enums/AppointmentTypeEnum";
import Datepicker from "@/components/common/ui/date-time-pickers/Datepicker";
import { ApiResponse } from "@/http/Response";
import { Label } from "@/components/common/ui/labels-and-values/Label";

const AppointmentsTable = ({
  without,
  createUrl = "/admin/appointment/create",
  api,
}: {
  without: string[];
  createUrl?: string;
  api: (
    page?: number,
    search?: string,
    sortCol?: string,
    sortDir?: string,
    perPage?: number,
    params?: object,
  ) => Promise<ApiResponse<Appointment[]>>;
}) => {
  const t = useTranslations("common.appointment.table");

  const schema: DataTableSchema<Appointment>[] = [
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
        <Link href={`/admin/patients/${record?.customer_id}`} className={"btn"}>
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
  ];

  const tableData: DataTableData<Appointment> = {
    createUrl: createUrl,
    schema: schema.filter((item) => !without.includes(item.name ?? "")),
    title: `${t("appointments")}`,
    filter: (params, setParams) => {
      return (
        <div className={"w-full grid grid-cols-1"}>
          <Label label={t("status")} col>
            <Select
              data={getEnumValues(AppointmentStatusEnum)}
              selected={params.status ?? "all"}
              onChange={(event: any) => {
                setParams({ ...params, status: event.target.value });
              }}
            />
          </Label>
          <Label label={t("type")} col>
            <Select
              data={getEnumValues(AppointmentTypeEnum)}
              selected={params.type}
              onChange={(event: any) => {
                setParams({ ...params, type: event.target.value });
              }}
            />
          </Label>
          <Label label={t("date")}>
            <Datepicker
              onChange={(time: any) => {
                setParams({ ...params, date: time?.format("YYYY-MM-DD") });
              }}
              defaultValue={params.date}
            />
          </Label>
        </div>
      );
    },
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await api(page, search, sortCol, sortDir, perPage, params),
  };

  return <DataTable {...tableData} />;
};

export default AppointmentsTable;
