import PageCard from "@/components/common/ui/PageCard";
import React from "react";

import { SystemOffersService } from "@/services/SystemOffersService";
import SystemOfferForm from "@/components/admin/system-offer/SystemOfferForm";
import { getTranslations } from "next-intl/server";

const page = async ({
  params: { systemId },
}: {
  params: { systemId: number };
}) => {
  const t = await getTranslations("admin.system.create");

  const system = (
    await SystemOffersService.make<SystemOffersService>("admin").show(systemId)
  ).data;
  return (
    <PageCard>
      <h2 className="card-title">{t("editSystemOffer")}</h2>
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
