import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import SystemOfferForm from "@/components/admin/system-offer/SystemOfferForm";
import { getTranslations } from "next-intl/server";

const page = async () => {
  const t = await getTranslations("admin.system.create");
  return (
    <PageCard>
      <h2 className="card-title">{t("addSystemOffer")}</h2>
      <SystemOfferForm />
    </PageCard>
  );
};

export default page;
