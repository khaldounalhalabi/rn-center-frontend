import React from "react";
import PageCard from "@/components/common/ui/PageCard";
import ClinicForm from "@/components/admin/clinics/ClinicForm";
import { getTranslations } from "next-intl/server";

const Page = async () => {
  const t = await getTranslations("admin.clinic.create-edit");
  return (
    <PageCard title={t("newClinic")}>
      <ClinicForm type={"store"} />
    </PageCard>
  );
};
export default Page;
