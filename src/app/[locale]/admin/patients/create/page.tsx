import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import PatientsForm from "@/components/admin/patients/PatientsForm";
import { getTranslations } from "next-intl/server";

const page = async () => {
  const t = await getTranslations("common.patient.create");

  return (
    <PageCard>
      <h2 className="card-title">{t("addPatient")}</h2>
      <PatientsForm />
    </PageCard>
  );
};

export default page;
