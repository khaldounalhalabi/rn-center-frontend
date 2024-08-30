import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import ClinicSubscriptionForm from "@/components/admin/clinicSubscription/ClinicSubscriptionForm";
import {getTranslations} from "next-intl/server";

const page = async ({
  params: { clinicId },
}: {
  params: { clinicId: number };
}) => {
    const t = await getTranslations('admin.subscription.create')
  return (
    <PageCard>
      <h2 className="card-title">{t("addClinicSubscription")}</h2>
      <ClinicSubscriptionForm id={clinicId} />
    </PageCard>
  );
};

export default page;