"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { Service } from "@/Models/Service";
import { ServiceService } from "@/services/ServiceService";
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations("admin.service.table");
  const tableData: DataTableData<Service> = {
    createUrl: `/admin/service/create`,
    title: `${t("service")}`,
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
        name: "clinic.name",
        label: `${t("clinic")}`,
        sortable: true,
        translatable: true,
      },
      {
        name: "approximate_duration",
        label: `${t("approximateDuration")}`,
        sortable: true,
        render: (data) => (
          <p className="text-center flex justify-evenly">
            {data} <span className={"badge-success badge "}>min</span>
          </p>
        ),
      },
      {
        name: "serviceCategory.name",
        label: `${t("category")}`,
        sortable: true,
        translatable: true,
      },
      {
        name: "price",
        label: `${t("price")}`,
        render: (data) => (
          <p>
            <span suppressHydrationWarning>{data.toLocaleString()} IQD</span>
          </p>
        ),
      },
      {
        name: "status",
        label: `${t("status")}`,
        sortable: true,
        render: (data) =>
          data == "active" ? (
            <span className={`badge badge-success`}>{t("active")}</span>
          ) : (
            <span className={`badge badge-error`}>{t("inActive")}</span>
          ),
      },

      {
        label: `${t("actions")}`,
        render: (_undefined, data, setHidden) => (
          <ActionsButtons
            id={data?.id}
            buttons={["edit", "delete", "show"]}
            baseUrl={`/admin/service`}
            editUrl={`/admin/service/${data?.id}/edit`}
            showUrl={`/admin/service/${data?.id}`}
            setHidden={setHidden}
          />
        ),
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await ServiceService.make<ServiceService>("admin").indexWithPagination(
        page,
        search,
        sortCol,
        sortDir,
        perPage,
        params,
      ),
  };
  return <DataTable {...tableData} />;
};

export default Page;
