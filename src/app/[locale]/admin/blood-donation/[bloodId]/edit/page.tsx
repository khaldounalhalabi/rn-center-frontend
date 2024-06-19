import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import BloodDonationForm from "@/components/admin/blood-donation/BloodDonationForm";
import { BloodDonationService } from "@/services/BloodDonationService";

const page = async ({
  params: { bloodId },
}: {
  params: { bloodId: number };
}) => {
  const bloodDonation = (
    await BloodDonationService.make<BloodDonationService>("admin").show(bloodId)
  ).data;
  return (
    <PageCard>
      <h2 className="card-title">Edit Blood Donation Request</h2>
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
