import React from "react";
import { ApiResponse } from "@/http/Response";
import { Clinic } from "@/models/Clinic";
import { ClinicsService } from "@/services/ClinicsService";
import PageCard from "@/components/common/ui/PageCard";
import ClinicForm from "@/components/admin/clinics/ClinicForm";
import { getTranslations } from "next-intl/server";

const Page = async ({
  params: { clinicId },
}: {
  params: { clinicId: number };
}) => {
  const data: ApiResponse<Clinic> =
    await ClinicsService.make<ClinicsService>().show(clinicId);
  const clinic = data.data;
  const t = await getTranslations("admin.clinic.create-edit");
  return (
    <PageCard title={t("update_title")}>
      <ClinicForm type={"update"} defaultValues={clinic} />
    </PageCard>
  );
};

export default Page;
