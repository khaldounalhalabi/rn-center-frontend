import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import BlockedForm from "@/components/admin/blocked_items/BlockedForm";
import { getTranslations } from "next-intl/server";

const page = async () => {
  const t = await getTranslations("admin.block");
  return (
    <PageCard>
      <h2 className="card-title">{t("addBlockedItem")}</h2>
      <BlockedForm />
    </PageCard>
  );
};

export default page;
