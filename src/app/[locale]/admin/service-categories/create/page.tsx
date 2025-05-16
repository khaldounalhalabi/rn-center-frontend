import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import ServiceCategoryForm from "@/components/admin/service-category/ServiceCategoryForm";
import { getTranslations } from "next-intl/server";
// todo: delete this page

const page = async () => {
  const t = await getTranslations("admin.category.create-edit");
  return (
    <PageCard>
      <h2 className="card-title">{t("addCategory")}</h2>
      <ServiceCategoryForm />
    </PageCard>
  );
};

export default page;
