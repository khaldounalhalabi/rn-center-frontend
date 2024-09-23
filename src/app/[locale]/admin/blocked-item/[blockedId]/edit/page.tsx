import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import { BlockedItemService } from "@/services/BlockedItemService";
import BlockedForm from "@/components/admin/blocked_items/BlockedForm";
import { getTranslations } from "next-intl/server";

const page = async ({
  params: { blockedId },
}: {
  params: { blockedId: number };
}) => {
  const t = await getTranslations("admin.block");

  const BlockedItem = (
    await BlockedItemService.make<BlockedItemService>("admin").show(blockedId)
  ).data;
  return (
    <PageCard>
      <h2 className="card-title">{t("editBlockedItem")}</h2>
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
