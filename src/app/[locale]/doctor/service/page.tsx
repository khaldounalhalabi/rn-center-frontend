"use client";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import PageCard from "@/components/common/ui/PageCard";
import ShowServiceSheet from "@/components/doctor/services/ShowServiceSheet";
import UpdateServiceSheet from "@/components/doctor/services/UpdateServiceSheet";
import { RoleEnum } from "@/enums/RoleEnum";
import { Service } from "@/models/Service";
import { ServiceService } from "@/services/ServiceService";
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations("admin.service.table");
  const tableData: DataTableData<Service> = {
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
        name: "service_category.name",
        label: `${t("category")}`,
        sortable: true,
      },
      {
        name: "price",
        label: `${t("price")}`,
      },
      {
        label: `${t("actions")}`,
        render: (_undefined, data, setHidden, revalidate) => (
          <div className={"flex items-center gap-2"}>
            <ShowServiceSheet service={data} />
            <UpdateServiceSheet service={data} success={revalidate} />
          </div>
        ),
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await ServiceService.make(RoleEnum.DOCTOR).indexWithPagination(
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
