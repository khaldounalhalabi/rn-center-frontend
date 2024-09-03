import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import SubscriptionForm from "@/components/admin/subscriptions/SubscriptionForm";
import {getTranslations} from "next-intl/server";

const page = async () => {
    const t = await getTranslations('admin.subscription.create')

    return (
    <PageCard>
      <h2 className="card-title">{t("addClinicSubscription")}</h2>
      <SubscriptionForm />
    </PageCard>
  );
};

export default page;