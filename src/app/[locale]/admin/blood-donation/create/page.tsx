import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import BloodDonationForm from "@/components/admin/blood-donation/BloodDonationForm";

const page = async () => {
  return (
    <PageCard>
      <h2 className="card-title">Add Blood Donation Request</h2>
      <BloodDonationForm />
    </PageCard>
  );
};

export default page;
