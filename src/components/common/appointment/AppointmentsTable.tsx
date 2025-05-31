"use client";

import { Link } from "@/navigation";
import AppointmentStatusColumn from "@/components/admin/appointment/AppointmentStatusColumn";
import TranslatableEnum from "@/components/common/ui/labels-and-values/TranslatableEnum";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
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
import { Button } from "@/components/ui/shadcn/button";
import useUser from "@/hooks/UserHook";
import { RoleEnum } from "@/enums/RoleEnum";
import AppointmentLogModal from "@/components/admin/appointment/AppointmentLogModal";

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
  const { role } = useUser();

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
        <Link href={`/${role}/clinics/${record?.clinic_id}`} className={"btn"}>
          <Button variant={"link"} type={"button"}>
            {doctorName}
          </Button>
        </Link>
      ),
    },
    {
      name: "customer.user.full_name",
      label: t("patientName"),
      render: (patientName, record) => (
        <Link
          href={`/${role}/patients/${record?.customer_id}`}
          className={"btn"}
        >
          <Button variant={"link"} type={"button"}>
            {patientName}
          </Button>
        </Link>
      ),
    },
    {
      name: "status",
      label: `${t("status")}`,
      render: (status, appointment) => {
        return role == RoleEnum.ADMIN || role == RoleEnum.SECRETARY ? (
          appointment && (
            <div className={"flex items-center justify-center"}>
              <AppointmentStatusColumn appointment={appointment} />
            </div>
          )
        ) : (
          <TranslatableEnum value={status} />
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
      render: (_undefined, data, setHidden) => (
        <ActionsButtons
          id={data?.id}
          buttons={
            role == RoleEnum.SECRETARY || role == RoleEnum.ADMIN
              ? ["edit", "show"]
              : ["show"]
          }
          baseUrl={`/${role}/appointment`}
          editUrl={`/${role}/appointment/${data?.id}/edit`}
          showUrl={`/${role}/appointment/${data?.id}`}
          setHidden={setHidden}
        >
          {role == RoleEnum.SECRETARY || role == RoleEnum.ADMIN ? (
            <AppointmentLogModal appointmentId={data?.id} />
          ) : (
            <></>
          )}
        </ActionsButtons>
      ),
    },
  ];

  const tableData: DataTableData<Appointment> = {
    createUrl: createUrl,
    schema: schema.filter((item) => !without.includes(item.name ?? "")),
    filter: (params, setParams) => {
      return (
        <div className={"grid w-full grid-cols-1"}>
          <Select
            data={getEnumValues(AppointmentStatusEnum)}
            selected={params.status}
            onChange={(event: string) => {
              setParams({ ...params, status: event });
            }}
            label={t("status")}
            translated={true}
          />

          <Select
            label={t("type")}
            data={getEnumValues(AppointmentTypeEnum)}
            selected={params.type}
            onChange={(event: string) => {
              setParams({ ...params, type: event });
            }}
            translated={true}
          />
          <Datepicker
            label={t("date")}
            onChange={(time: any) => {
              setParams({ ...params, date: time?.format("YYYY-MM-DD") });
            }}
            defaultValue={params.date}
          />
        </div>
      );
    },
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await api(page, search, sortCol, sortDir, perPage, params),
  };

  return <DataTable {...tableData} />;
};

export default AppointmentsTable;
