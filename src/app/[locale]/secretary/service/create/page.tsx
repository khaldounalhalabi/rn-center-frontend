import ServiceForm from "@/components/admin/service/ServiceForm";
import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import { getTranslations } from "next-intl/server";

const page = async () => {
  const t = await getTranslations("admin.service.create-edit");
  return (
    <PageCard title={t("addService")}>
      <ServiceForm />
    </PageCard>
  );
};

export default page;
