import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import BlockedForm from "@/components/admin/blocked_items/BlockedForm";

const page = async () => {
  return (
    <PageCard>
      <h2 className="card-title">Add Blocked Item</h2>
      <BlockedForm />
    </PageCard>
  );
};

export default page;
