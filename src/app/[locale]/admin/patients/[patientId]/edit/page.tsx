import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import PatientsForm from "@/components/admin/patients/PatientsForm";
import { PatientService } from "@/services/PatientService";
import { getTranslations } from "next-intl/server";
import { RoleEnum } from "@/enums/RoleEnum";

const page = async ({
  params: { patientId },
}: {
  params: { patientId: number };
}) => {
  const t = await getTranslations("common.patient.create");

  const patient = (
    await PatientService.make(RoleEnum.ADMIN).show(patientId)
  ).data;

  return (
    <PageCard title={t("editPatient")}>
      <PatientsForm type={"update"} customer={patient} />
    </PageCard>
  );
};

export default page;
