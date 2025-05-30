"use client";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import DataTable, {
  DataTableData,
  DataTableSchema,
} from "@/components/common/Datatable/DataTable";
import PageCard from "@/components/common/ui/PageCard";
import Datepicker from "@/components/common/ui/date-time-pickers/Datepicker";
import TranslatableEnum from "@/components/common/ui/labels-and-values/TranslatableEnum";
import Select from "@/components/common/ui/selects/Select";
import UpdateAppointmentSheet from "@/components/doctor/appointments/UpdateAppointmentSheet";
import ShowServiceSheet from "@/components/doctor/services/ShowServiceSheet";
import { Button } from "@/components/ui/shadcn/button";
import { AppointmentStatusEnum } from "@/enums/AppointmentStatusEnum";
import { RoleEnum } from "@/enums/RoleEnum";
import { getEnumValues } from "@/helpers/Enums";
import useUser from "@/hooks/UserHook";
import { Appointment } from "@/models/Appointment";
import { Link } from "@/navigation";
import { AppointmentService } from "@/services/AppointmentService";
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations("common.appointment.table");
  const { role } = useUser();

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
      render: (serviceName, record) => (
        <ShowServiceSheet service={record?.service} buttonText={serviceName} />
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
          baseUrl={`/${role}/appointment`}
          showUrl={`/${role}/appointment/${data?.id}`}
          setHidden={setHidden}
        >
          <UpdateAppointmentSheet appointment={data} success={revalidate} />
        </ActionsButtons>
      ),
    },
  ];

  const tableData: DataTableData<Appointment> = {
    schema: schema,
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
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await AppointmentService.make(RoleEnum.DOCTOR).indexWithPagination(
        page,
        search,
        sortCol,
        sortDir,
        perPage,
        params,
      ),
  };
  return (
    <PageCard title={t("appointments")}>
      <DataTable {...tableData} />
    </PageCard>
  );
};

export default Page;
