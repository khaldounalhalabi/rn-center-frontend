import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import { BlockedItemService } from "@/services/BlockedItemService";
import BlockedForm from "@/components/admin/blocked_items/BlockedForm";

const page = async ({
  params: { blockedId },
}: {
  params: { blockedId: number };
}) => {
  const BlockedItem = (
    await BlockedItemService.make<BlockedItemService>("admin").show(blockedId)
  ).data;
  return (
    <PageCard>
      <h2 className="card-title">Edit Blocked Item</h2>
      <BlockedForm
        type={"update"}
        defaultValues={{
          ...BlockedItem,
        }}
      />
    </PageCard>
  );
};

export default page;
