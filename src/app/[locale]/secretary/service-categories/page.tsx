"use client";
import ServiceCategoryForm from "@/components/admin/service-category/ServiceCategoryForm";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import PageCard from "@/components/common/ui/PageCard";
import ShadcnDialog from "@/components/common/ui/ShadcnDialog";
import DocumentPlus from "@/components/icons/DocumentPlus";
import Pencil from "@/components/icons/Pencil";
import { Button } from "@/components/ui/shadcn/button";
import { RoleEnum } from "@/enums/RoleEnum";
import { ServiceCategory } from "@/models/ServiceCategory";
import { ServiceCategoryService } from "@/services/ServiceCategoryService";
import { useTranslations } from "next-intl";
import { useState } from "react";

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
            baseUrl={"/secretary/service-categories"}
            deleteUrl={`/secretary/service-categories/${data?.id}`}
            id={data?.id}
            setHidden={setHidden}
          >
            <UpdateDialog serviceCategory={data} revalidate={revalidate} />
          </ActionsButtons>
        ),
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await ServiceCategoryService.make(RoleEnum.SECRETARY).indexWithPagination(
        page,
        search,
        sortCol,
        sortDir,
        perPage,
        params,
      ),
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
  const [open, setOpen] = useState(false);

  return (
    <ShadcnDialog
      trigger={
        <Button size={"icon"} variant={"secondary"}>
          <Pencil />
        </Button>
      }
      title={t("editCategory")}
      onOpenChange={setOpen}
      open={open}
    >
      <ServiceCategoryForm
        type={"update"}
        defaultValues={serviceCategory}
        onSuccess={async () => {
          if (revalidate) await revalidate();
          setOpen(false);
        }}
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
  const [open, setOpen] = useState(false);
  return (
    <ShadcnDialog
      trigger={
        <Button size={"icon"}>
          <DocumentPlus />
        </Button>
      }
      title={t("addCategory")}
      onOpenChange={setOpen}
      open={open}
    >
      <ServiceCategoryForm
        type={"store"}
        onSuccess={async () => {
          if (revalidate) await revalidate();
          setOpen(false);
        }}
      />
    </ShadcnDialog>
  );
};
