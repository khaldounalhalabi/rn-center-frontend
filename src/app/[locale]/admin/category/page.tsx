"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { ServiceCategory } from "@/Models/ServiceCategory";
import { CategoryService } from "@/services/CategoryService";

const tableData: DataTableData<ServiceCategory> = {
  createUrl: `/admin/category/create`,
  title: "Category",
  schema: [
    {
      name: "name",
      label: "Category",
      sortable: true,
      translatable: true,
    },
    {
      label: "Actions",
      render: (_undefined, data, setHidden) => (
        <ActionsButtons
          id={data?.id}
          buttons={["edit", "delete", "show"]}
          baseUrl={`/admin/category`}
          editUrl={`/admin/category/${data?.id}/edit`}
          showUrl={`/admin/category/${data?.id}`}
          setHidden={setHidden}
        />
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
const Page = () => {
  return <DataTable {...tableData} />;
};

export default Page;
