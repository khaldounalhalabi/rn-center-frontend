import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import BloodDonationForm from "@/components/admin/blood-donation/BloodDonationForm";
import { BloodDonationService } from "@/services/BloodDonationService";
import { getTranslations } from "next-intl/server";

const page = async ({
  params: { bloodId },
}: {
  params: { bloodId: number };
}) => {
  const t = await getTranslations("admin.blood");

  const bloodDonation = (
    await BloodDonationService.make<BloodDonationService>("admin").show(bloodId)
  ).data;
  return (
    <PageCard>
      <h2 className="card-title">{t("editBloodDonationRequest")}</h2>
      <BloodDonationForm
        type={"update"}
        defaultValues={{
          ...bloodDonation,
        }}
      />
    </PageCard>
  );
};

export default page;
