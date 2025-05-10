import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import { ServiceCategoryService } from "@/services/ServiceCategoryService";
import ServiceCategoriesForm from "@/components/admin/service-category/CategoryForm";
import { getTranslations } from "next-intl/server";
import { RoleEnum } from "@/enum/RoleEnum";

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
      <ServiceCategoriesForm type={"update"} defaultValues={serviceCategory} />
    </PageCard>
  );
};

export default page;
