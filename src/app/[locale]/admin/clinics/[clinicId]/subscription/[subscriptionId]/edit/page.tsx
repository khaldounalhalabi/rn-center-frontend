import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import ClinicSubscriptionForm from "@/components/admin/clinicSubscription/ClinicSubscriptionForm";
import { getTranslations } from "next-intl/server";
import { ClinicSubscriptionService } from "@/services/ClinicSubscriptionService";

const page = async ({
  params: { subscriptionId, clinicId },
}: {
  params: { subscriptionId: number; clinicId: number };
}) => {
  const t = await getTranslations("admin.subscription.create");

  const subscription = (
    await ClinicSubscriptionService.make<ClinicSubscriptionService>(
      "admin",
    ).show(subscriptionId)
  ).data;
  return (
    <PageCard>
      <h2 className="card-title">{t("editClinicSubscription")}</h2>
      <ClinicSubscriptionForm
        type={"update"}
        id={clinicId}
        defaultValues={{
          ...subscription,
        }}
      />
    </PageCard>
  );
};

export default page;
