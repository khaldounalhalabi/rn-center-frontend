"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { ServiceCategory } from "@/Models/ServiceCategory";
import { CategoryService } from "@/services/CategoryService";
import { useTranslations } from "next-intl";
import DeleteCategory from "@/components/common/DeleteCategory";

const Page = () => {
  const t = useTranslations("admin.category.table");
  const tableData: DataTableData<ServiceCategory> = {
    createUrl: `/admin/category/create`,
    title: `${t("category")}`,
    schema: [
      {
        name: "id",
        label: `id`,
        sortable: true,
      },
      {
        name: "name",
        label: `${t("category")}`,
        sortable: true,
        translatable: true,
      },
      {
        label: `${t("actions")}`,
        render: (_undefined, data, setHidden) => (
          <ActionsButtons
            id={data?.id}
            buttons={["edit", "show"]}
            baseUrl={`/admin/category`}
            editUrl={`/admin/category/${data?.id}/edit`}
            showUrl={`/admin/category/${data?.id}`}
            setHidden={setHidden}
          >
            <DeleteCategory id={data?.id} setHidden={setHidden} />
          </ActionsButtons>
        ),
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await CategoryService.make<CategoryService>("admin").indexWithPagination(
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