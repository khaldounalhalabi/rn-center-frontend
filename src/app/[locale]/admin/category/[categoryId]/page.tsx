import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import { Link } from "@/navigation";
import Grid from "@/components/common/ui/Grid";
import { CategoryService } from "@/services/CategoryService";
import { ServiceCategory } from "@/Models/ServiceCategory";
import { getTranslations } from "next-intl/server";
import TranslateServer from "@/Helpers/TranslationsServer";

const page = async ({
  params: { categoryId },
}: {
  params: { categoryId: number };
}) => {
  const t = await getTranslations("admin.category.show");
  const data = await CategoryService.make<CategoryService>().show(categoryId);
  const res: ServiceCategory = data?.data;
  return (
    <PageCard>
      <div className="flex justify-between items-center w-full h-24">
        <h2 className="card-title">{t("categoryDetails")}</h2>
        <Link href={`/admin/category/${categoryId}/edit`}>
          <PrimaryButton type={"button"}>{t("editBtn")}</PrimaryButton>
        </Link>
      </div>
      <Grid md={2} gap={5}>
        <label className="label">
          {t("category-name")} En:{" "}
          <span className="bg-base-200 px-2 rounded-xl text-lg">
            {(await TranslateServer(res?.name, true))?.en}
          </span>
        </label>
        <label className="label">
          {t("category-name")} Ar:{" "}
          <span className="bg-base-200 px-2 rounded-xl text-lg">
            {(await TranslateServer(res?.name, true))?.ar}
          </span>
        </label>
      </Grid>
    </PageCard>
  );
};

export default page;