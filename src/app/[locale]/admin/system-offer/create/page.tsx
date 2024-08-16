import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import SystemOfferForm from "@/components/admin/system-offer/SystemOfferForm";

const page = async () => {
  return (
    <PageCard>
      <h2 className="card-title">Add System Offer</h2>
      <SystemOfferForm />
    </PageCard>
  );
};

export default page;
