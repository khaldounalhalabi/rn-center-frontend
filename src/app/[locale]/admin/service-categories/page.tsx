"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { ServiceCategory } from "@/Models/ServiceCategory";
import { ServiceCategoryService } from "@/services/ServiceCategoryService";
import { useTranslations } from "next-intl";
import DeleteCategoryButton from "@/components/common/service-category/DeleteCategoryButton";
import { RoleEnum } from "@/enum/RoleEnum";

const ServiceCategoriesIndexPage = () => {
  const t = useTranslations("admin.category.table");
  const tableData: DataTableData<ServiceCategory> = {
    createUrl: `/admin/service-categories/create`,
    title: `${t("category")}`,
    schema: [
      {
        name: "id",
        label: `id`,
        sortable: true,
      },
      {
        name: "name",
        label: `${t("category-name")}`,
        sortable: true,
        translatable: true,
      },
      {
        label: `${t("actions")}`,
        render: (_undefined, data, setHidden) => (
          <ActionsButtons
            id={data?.id}
            buttons={["edit", "show"]}
            baseUrl={`/admin/service-categories`}
            editUrl={`/admin/service-categories/${data?.id}/edit`}
            showUrl={`/admin/service-categories/${data?.id}`}
            setHidden={setHidden}
          >
            <DeleteCategoryButton id={data?.id} setHidden={setHidden} />
          </ActionsButtons>
        ),
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await ServiceCategoryService.make<ServiceCategoryService>(
        RoleEnum.ADMIN,
      ).indexWithPagination(page, search, sortCol, sortDir, perPage, params),
  };
  return <DataTable {...tableData} />;
};

export default ServiceCategoriesIndexPage;
