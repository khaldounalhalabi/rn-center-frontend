import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import SpecialityForm from "@/components/admin/speciality/SpecialityForm";
import { getTranslations } from "next-intl/server";

const page = async () => {
  const t = await getTranslations("admin.speciality.create-edit");

  return (
    <PageCard title={t("addSpeciality")}>
      <SpecialityForm />
    </PageCard>
  );
};

export default page;
