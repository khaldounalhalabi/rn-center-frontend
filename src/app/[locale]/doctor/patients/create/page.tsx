import React from "react";
import PatientForm from "@/components/doctor/patients/PatientForm";
import PageCard from "@/components/common/ui/PageCard";
import {getTranslations} from "next-intl/server";

const page = async () => {
  const t =await getTranslations('common.patient.create')
  return (
    <PageCard>
      <h2 className="card-title">{t("addPatient")}</h2>
      <PatientForm />
    </PageCard>
  );
};

export default page;