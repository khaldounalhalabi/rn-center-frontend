import PageCard from "@/components/common/ui/PageCard";
import React from "react";

import OfferForm from "@/components/common/Offers/OfferForm";
import { OffersService } from "@/services/OffersService";
import {getTranslations} from "next-intl/server";

const page = async ({
  params: { offerId },
}: {
  params: { offerId: number };
}) => {
    const t = await getTranslations("admin.offer.create")
  const offers = (
    await OffersService.make<OffersService>("admin").show(offerId)
  ).data;
  return (
    <PageCard>
      <h2 className="card-title">{t("editOffer")}</h2>
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