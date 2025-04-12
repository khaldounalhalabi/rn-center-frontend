import React from "react";
import PatientForm from "@/components/doctor/patients/PatientForm";
import PageCard from "@/components/common/ui/PageCard";
import { getTranslations } from "next-intl/server";
import { AuthService } from "@/services/AuthService";

const page = async () => {
  const t = await getTranslations("common.patient.create");
  const doctor = await AuthService.make<AuthService>("doctor")
    .userDetails()
    .then((res) => res.data);

  return (
    <PageCard>
      <h2 className="card-title">{t("addPatient")}</h2>
      <PatientForm doctor={doctor} />
    </PageCard>
  );
};

export default page;
