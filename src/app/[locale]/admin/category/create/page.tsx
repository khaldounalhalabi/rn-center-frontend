import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import CategoryForm from "@/components/admin/category/CategoryForm";
import { getTranslations } from "next-intl/server";

const page = async () => {
  const t = await getTranslations("admin.category.create-edit");
  return (
    <PageCard>
      <h2 className="card-title">{t("addCategory")}</h2>
      <CategoryForm />
    </PageCard>
  );
};

export default page;
