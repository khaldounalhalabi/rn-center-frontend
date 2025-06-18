"use client";

import AppointmentLogModal from "@/components/admin/appointment/AppointmentLogModal";
import AppointmentStatusColumn from "@/components/admin/appointment/AppointmentStatusColumn";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import DataTable, {
  DataTableData,
  DataTableSchema,
} from "@/components/common/Datatable/DataTable";
import Datepicker from "@/components/common/ui/date-time-pickers/Datepicker";
import TranslatableEnum from "@/components/common/ui/labels-and-values/TranslatableEnum";
import Select from "@/components/common/ui/selects/Select";
import { Button } from "@/components/ui/shadcn/button";
import { AppointmentStatusEnum } from "@/enums/AppointmentStatusEnum";
import AppointmentTypeEnum from "@/enums/AppointmentTypeEnum";
import PermissionEnum from "@/enums/PermissionEnum";
import { RoleEnum } from "@/enums/RoleEnum";
import { getEnumValues } from "@/helpers/Enums";
import useUser from "@/hooks/UserHook";
import { ApiResponse } from "@/http/Response";
import { Appointment } from "@/models/Appointment";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

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
  const { role, user } = useUser();

  const schema: DataTableSchema<Appointment>[] = [
    {
      name: "id",
      sortable: true,
      label: "id",
    },
    {
      name: "clinic.user.full_name",
      label: t("doctorName"),
      render: (doctorName, record) =>
        role == RoleEnum.ADMIN ||
        user?.permissions?.includes(PermissionEnum.CLINIC_MANAGEMENT) ? (
          <Link
            href={`/${role}/clinics/${record?.clinic_id}`}
            className={"btn"}
          >
            <Button variant={"link"} type={"button"}>
              {doctorName}
            </Button>
          </Link>
        ) : (
          doctorName
        ),
    },
    {
      name: "customer.user.full_name",
      label: t("patientName"),
      render: (patientName, record) =>
        role == RoleEnum.ADMIN ||
        user?.permissions?.includes(PermissionEnum.PATIENT_MANAGEMENT) ? (
          <Link
            href={`/${role}/patients/${record?.customer_id}`}
            className={"btn"}
          >
            <Button variant={"link"} type={"button"}>
              {patientName}
            </Button>
          </Link>
        ) : (
          patientName
        ),
    },
    {
      name: "status",
      label: `${t("status")}`,
      render: (status, appointment) => {
        return role == RoleEnum.ADMIN || role == RoleEnum.SECRETARY ? (
          appointment && (
            <div className={"flex items-center justify-center"}>
              <AppointmentStatusColumn appointment={appointment} role={role} />
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
      label: t("actions"),
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
          {role == RoleEnum.SECRETARY ||
            (role == RoleEnum.ADMIN && (
              <AppointmentLogModal appointmentId={data?.id} role={role} />
            ))}
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
