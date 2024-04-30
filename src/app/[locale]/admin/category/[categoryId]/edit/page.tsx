import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import { CategoryService } from "@/services/CategoryService";
import CategoryForm from "@/components/admin/category/CategoryForm";
import { getTranslations } from "next-intl/server";

const page = async ({
  params: { categoryId },
}: {
  params: { categoryId: number };
}) => {
  const t = await getTranslations("admin.category.create-edit");
  const category = (
    await CategoryService.make<CategoryService>("admin").show(categoryId)
  ).data;
  return (
    <PageCard>
      <h2 className="card-title">{t("editCategory")}</h2>
      <CategoryForm
        type={"update"}
        defaultValues={{
          ...category,
        }}
      />
    </PageCard>
  );
};

export default page;
