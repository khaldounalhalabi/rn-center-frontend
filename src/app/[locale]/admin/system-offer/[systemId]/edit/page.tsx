import PageCard from "@/components/common/ui/PageCard";
import React from "react";

import { SystemOffersService } from "@/services/SystemOffersService";
import SystemOfferForm from "@/components/admin/system-offer/SystemOfferForm";

const page = async ({
  params: { systemId },
}: {
  params: { systemId: number };
}) => {
  const system = (
    await SystemOffersService.make<SystemOffersService>("admin").show(systemId)
  ).data;
  return (
    <PageCard>
      <h2 className="card-title">Edit Offer</h2>
      <SystemOfferForm
        type={"update"}
        defaultValues={{
          ...system,
        }}
      />
    </PageCard>
  );
};

export default page;
