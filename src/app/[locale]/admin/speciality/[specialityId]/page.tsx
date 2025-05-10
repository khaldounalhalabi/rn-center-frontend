import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import { Link } from "@/navigation";
import { SpecialityService } from "@/services/SpecialityService";
import { Speciality } from "@/Models/Speciality";
import { getTranslations } from "next-intl/server";
import Grid from "@/components/common/ui/Grid";
import { LabelValue } from "@/components/common/ui/labels-and-values/LabelValue";
import Gallery from "@/components/common/ui/Gallery";
import { Label } from "@/components/common/ui/labels-and-values/Label";

const page = async ({
  params: { specialityId },
}: {
  params: { specialityId: number };
}) => {
  const t = await getTranslations("admin.speciality.show");
  const data =
    await SpecialityService.make<SpecialityService>().show(specialityId);
  const res: Speciality = data?.data;
  return (
    <PageCard>
      <div className="flex justify-between items-center w-full h-24">
        <h2 className="card-title">{t("specialityDetails")}</h2>
        <Link href={`/admin/speciality/${res.id}/edit`}>
          <PrimaryButton type={"button"}>{t("editBtn")}</PrimaryButton>
        </Link>
      </div>
      <Grid md={2}>
        <LabelValue label={t("specialityName")} value={res.name} />
      </Grid>
      <LabelValue
        col
        label={t("description")}
        value={res.description}
        color={"info"}
      />
      <Label label={t("image")} col>
        <Gallery media={res?.image} />
      </Label>
    </PageCard>
  );
};

export default page;
