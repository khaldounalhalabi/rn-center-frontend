import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import PrimaryButton from "@/components/common/ui/buttons/PrimaryButton";
import { Link } from "@/navigation";
import Grid from "@/components/common/ui/Grid";
import { ServiceCategoryService } from "@/services/ServiceCategoryService";
import { getTranslations } from "next-intl/server";
import { LabelValue } from "@/components/common/ui/labels-and-values/LabelValue";

const page = async ({
  params: { serviceCategoryId },
}: {
  params: { serviceCategoryId: number };
}) => {
  const t = await getTranslations("admin.category.show");
  const data =
    await ServiceCategoryService.make<ServiceCategoryService>().show(
      serviceCategoryId,
    );
  const serviceCategory = data?.data;
  return (
    <PageCard>
      <div className="flex justify-between items-center w-full h-24">
        <h2 className="card-title">{t("categoryDetails")}</h2>
        <Link href={`/admin/service-categories/${serviceCategoryId}/edit`}>
          <PrimaryButton type={"button"}>{t("editBtn")}</PrimaryButton>
        </Link>
      </div>
      <Grid md={2} gap={5}>
        <LabelValue label={t("category-name")} value={serviceCategory.name} />
      </Grid>
    </PageCard>
  );
};

export default page;
