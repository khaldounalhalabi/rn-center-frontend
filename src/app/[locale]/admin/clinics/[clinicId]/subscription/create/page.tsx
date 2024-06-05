import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import ClinicSubscriptionForm from "@/components/admin/clinicSubscription/ClinicSubscriptionForm";

const page = async ({
  params: { clinicId },
}: {
  params: { clinicId: number };
}) => {
  return (
    <PageCard>
      <h2 className="card-title">Add Clinic Subscription</h2>
      <ClinicSubscriptionForm id={clinicId} />
    </PageCard>
  );
};

export default page;