"use client";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import PageCard from "@/components/common/ui/PageCard";
import { Button } from "@/components/ui/shadcn/button";
import { RoleEnum } from "@/enums/RoleEnum";
import { Service } from "@/models/Service";
import { Link } from "@/navigation";
import { ServiceService } from "@/services/ServiceService";
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations("admin.service.table");
  const tableData: DataTableData<Service> = {
    createUrl: `/secretary/service/create`,
    schema: [
      {
        name: "id",
        label: `id`,
        sortable: true,
      },
      {
        name: "name",
        label: `${t("service")}`,
        sortable: true,
        translatable: true,
      },
      {
        name: "clinic.user.full_name",
        label: `${t("doctor_name")}`,
        sortable: true,
        render: (name, service) => (
          <Link
            className={"btn"}
            href={`/secretary/clinics/${service?.clinic_id}`}
          >
            <Button variant={"link"}>{service?.clinic?.user?.full_name}</Button>
          </Link>
        ),
      },
      {
        name: "approximate_duration",
        label: `${t("approximateDuration")}`,
        sortable: true,
        render: (data) => (
          <p className="flex gap-2">
            {data} <span className={"badge badge-success"}>{t("min")}</span>
          </p>
        ),
      },
      {
        name: "service_category_id",
        label: `${t("category")}`,
        sortable: true,
        translatable: true,
        render: (_item, service) => (
          <Link
            href={`/secretary/service-categories/${service?.service_category_id}`}
            className={"btn"}
          >
            {service?.service_category?.name}
          </Link>
        ),
      },
      {
        name: "price",
        label: `${t("price")}`,
        render: (data) => data.toLocaleString(),
      },
      {
        label: `${t("actions")}`,
        render: (_undefined, data, setHidden) => (
          <ActionsButtons
            id={data?.id}
            buttons={["edit", "delete", "show"]}
            baseUrl={`/secretary/service`}
            editUrl={`/secretary/service/${data?.id}/edit`}
            showUrl={`/secretary/service/${data?.id}`}
            setHidden={setHidden}
          />
        ),
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await ServiceService.make(RoleEnum.SECRETARY).indexWithPagination(
        page,
        search,
        sortCol,
        sortDir,
        perPage,
        params,
      ),
  };
  return (
    <PageCard title={t("service")}>
      <DataTable {...tableData} />
    </PageCard>
  );
};

export default Page;
