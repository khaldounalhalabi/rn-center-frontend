import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import SpecialityForm from "@/components/admin/speciality/SpecialityForm";
import { SpecialityService } from "@/services/SpecialityService";
import { getTranslations } from "next-intl/server";

const page = async ({
  params: { specialityId },
}: {
  params: { specialityId: number };
}) => {
  const t = await getTranslations("admin.speciality.create-edit");

  const speciality = (
    await SpecialityService.make<SpecialityService>().show(specialityId)
  ).data;
  return (
    <PageCard title={t("editSpeciality")}>
      <SpecialityForm type={"update"} defaultValues={speciality} />
    </PageCard>
  );
};

export default page;
