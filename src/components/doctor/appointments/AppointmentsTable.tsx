"use client";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import DataTable, {
  DataTableData,
  DataTableSchema,
} from "@/components/common/Datatable/DataTable";
import Datepicker from "@/components/common/ui/date-time-pickers/Datepicker";
import TranslatableEnum from "@/components/common/ui/labels-and-values/TranslatableEnum";
import Select from "@/components/common/ui/selects/Select";
import UpdateAppointmentSheet from "@/components/doctor/appointments/UpdateAppointmentSheet";
import ShowServiceSheet from "@/components/doctor/services/ShowServiceSheet";
import { Button } from "@/components/ui/shadcn/button";
import { AppointmentStatusEnum } from "@/enums/AppointmentStatusEnum";
import { getEnumValues } from "@/helpers/Enums";
import useUser from "@/hooks/UserHook";
import { ApiResponse } from "@/http/Response";
import { Appointment } from "@/models/Appointment";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

const AppointmentsTable = ({
  without = [],
  api,
}: {
  without?: string[];
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
  const { user } = useUser();

  const schema: DataTableSchema<Appointment>[] = [
    {
      name: "id",
      sortable: true,
      label: "id",
    },
    {
      name: "customer.user.full_name",
      label: t("patientName"),
      render: (patientName, record) => (
        <Link
          href={`/doctor/patients/${record?.customer_id}`}
          className={"btn"}
        >
          <Button variant={"link"} type={"button"}>
            {patientName}
          </Button>
        </Link>
      ),
    },
    {
      name: "service.name",
      label: t("service"),
      render: (serviceName, record) =>
        record?.service ? (
          <ShowServiceSheet
            service={record?.service}
            buttonText={serviceName}
          />
        ) : (
          <div className={"mx-3"}>
            <TranslatableEnum value={"no_data"} />
          </div>
        ),
    },
    {
      name: "status",
      label: `${t("status")}`,
      render: (status) => <TranslatableEnum value={status} />,
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
          buttons={["show"]}
          baseUrl={`/doctor/appointment`}
          showUrl={`/doctor/appointment/${data?.id}`}
          setHidden={setHidden}
        >
          {data?.clinic_id == user?.clinic?.id ? (
            <UpdateAppointmentSheet appointment={data} success={revalidate} />
          ) : (
            <></>
          )}
        </ActionsButtons>
      ),
    },
  ];

  const tableData: DataTableData<Appointment> = {
    schema: schema.filter((i) => !without.includes(i?.name ?? i?.label)),
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
    api: (page, search, sortCol, sortDir, perPage, params) =>
      api(page, search, sortCol, sortDir, perPage, params),
  };
  return <DataTable {...tableData} />;
};

export default AppointmentsTable;
