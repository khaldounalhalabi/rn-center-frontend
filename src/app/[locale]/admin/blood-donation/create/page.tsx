import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import BloodDonationForm from "@/components/admin/blood-donation/BloodDonationForm";
import { getTranslations } from "next-intl/server";

const page = async () => {
  const t = await getTranslations("admin.blood");
  return (
    <PageCard>
      <h2 className="card-title">{t("addBloodDonationRequest")}</h2>
      <BloodDonationForm />
    </PageCard>
  );
};

export default page;
