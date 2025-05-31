"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import { ServiceCategory } from "@/models/ServiceCategory";
import { ServiceCategoryService } from "@/services/ServiceCategoryService";
import { useTranslations } from "next-intl";
import { RoleEnum } from "@/enums/RoleEnum";
import PageCard from "@/components/common/ui/PageCard";
import { Button } from "@/components/ui/shadcn/button";
import ShadcnDialog from "@/components/common/ui/ShadcnDialog";
import ServiceCategoryForm from "@/components/admin/service-category/ServiceCategoryForm";
import Pencil from "@/components/icons/Pencil";
import DocumentPlus from "@/components/icons/DocumentPlus";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";

const ServiceCategoriesIndexPage = () => {
  const t = useTranslations("admin.category.table");
  const tableData: DataTableData<ServiceCategory> = {
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
        render: (_undefined, data, setHidden, revalidate) => (
          <ActionsButtons
            deleteMessage={t("delete_service_category_question")}
            buttons={["delete"]}
            baseUrl={"/admin/service-categories"}
            deleteUrl={`/admin/service-categories/${data?.id}`}
            id={data?.id}
            setHidden={setHidden}
          >
            <UpdateDialog serviceCategory={data} revalidate={revalidate} />
          </ActionsButtons>
        ),
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await ServiceCategoryService.make(
        RoleEnum.ADMIN,
      ).indexWithPagination(page, search, sortCol, sortDir, perPage, params),
    extraButton: (revalidate) => <CreateDialog revalidate={revalidate} />,
  };
  return (
    <PageCard title={t("category")}>
      <DataTable {...tableData} />
    </PageCard>
  );
};

export default ServiceCategoriesIndexPage;


const UpdateDialog = ({
  serviceCategory,
  revalidate = undefined,
}: {
  serviceCategory?: ServiceCategory;
  revalidate?: () => void;
}) => {
  const t = useTranslations("admin.category.create-edit");
  return (
    <ShadcnDialog
      trigger={
        <Button size={"icon"} variant={"secondary"}>
          <Pencil />
        </Button>
      }
      title={t("editCategory")}
    >
      <ServiceCategoryForm
        type={"update"}
        defaultValues={serviceCategory}
        onSuccess={revalidate}
      />
    </ShadcnDialog>
  );
};

const CreateDialog = ({
  revalidate = undefined,
}: {
  revalidate?: () => void;
}) => {
  const t = useTranslations("admin.category.create-edit");

  return (
    <ShadcnDialog
      trigger={
        <Button size={"icon"}>
          <DocumentPlus />
        </Button>
      }
      title={t("addCategory")}
    >
      <ServiceCategoryForm type={"store"} onSuccess={revalidate} />
    </ShadcnDialog>
  );
};