import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import OfferForm from "@/components/common/Offers/OfferForm";
import { getTranslations } from "next-intl/server";

const page = async () => {
  const t = await getTranslations("doctor.offer.create");
  return (
    <PageCard>
      <h2 className="card-title">{t("addOffer")}</h2>
      <OfferForm typePage={"doctor"} />
    </PageCard>
  );
};

export default page;
