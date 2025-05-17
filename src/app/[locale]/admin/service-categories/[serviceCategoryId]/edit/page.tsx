import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import { ServiceCategoryService } from "@/services/ServiceCategoryService";
import ServiceCategoryForm from "@/components/admin/service-category/ServiceCategoryForm";
import { getTranslations } from "next-intl/server";
import { RoleEnum } from "@/enums/RoleEnum";

// todo: delete this page

const page = async ({
  params: { serviceCategoryId },
}: {
  params: { serviceCategoryId: number };
}) => {
  const t = await getTranslations("admin.category.create-edit");
  const serviceCategory = (
    await ServiceCategoryService.make<ServiceCategoryService>(
      RoleEnum.ADMIN,
    ).show(serviceCategoryId)
  ).data;
  return (
    <PageCard>
      <h2 className="card-title">{t("editCategory")}</h2>
      <ServiceCategoryForm type={"update"} defaultValues={serviceCategory} />
    </PageCard>
  );
};

export default page;
