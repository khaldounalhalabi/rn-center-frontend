import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import { SubscriptionsService } from "@/services/SubscriptionsService";
import SubscriptionForm from "@/components/admin/subscriptions/SubscriptionForm";

const page = async ({
  params: { subscriptionId },
}: {
  params: { subscriptionId: number };
}) => {
  const subscription = (
    await SubscriptionsService.make<SubscriptionsService>("admin").show(
      subscriptionId,
    )
  ).data;
  return (
    <PageCard>
      <h2 className="card-title">Edit Subscription</h2>
      <SubscriptionForm
        type={"update"}
        defaultValues={{
          ...subscription,
        }}
      />
    </PageCard>
  );
};

export default page;
