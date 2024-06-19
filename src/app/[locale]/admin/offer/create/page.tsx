import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import OfferForm from "@/components/common/Offers/OfferForm";

const page = async () => {
  return (
    <PageCard>
      <h2 className="card-title">Add Offer</h2>
      <OfferForm />
    </PageCard>
  );
};

export default page;