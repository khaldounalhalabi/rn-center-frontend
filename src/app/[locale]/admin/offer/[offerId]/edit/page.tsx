import PageCard from "@/components/common/ui/PageCard";
import React from "react";

import OfferForm from "@/components/admin/offers/OfferForm";
import { OffersService } from "@/services/OffersService";

const page = async ({
  params: { offerId },
}: {
  params: { offerId: number };
}) => {
  const offers = (
    await OffersService.make<OffersService>("admin").show(offerId)
  ).data;
  return (
    <PageCard>
      <h2 className="card-title">Edit Offer</h2>
      <OfferForm
        type={"update"}
        defaultValues={{
          ...offers,
        }}
      />
    </PageCard>
  );
};

export default page;