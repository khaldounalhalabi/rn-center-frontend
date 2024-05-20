import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import SubscriptionForm from "@/components/admin/subscriptions/SubscriptionForm";

const page = async () => {
  return (
    <PageCard>
      <h2 className="card-title">Add Subscription</h2>
      <SubscriptionForm />
    </PageCard>
  );
};

export default page;
