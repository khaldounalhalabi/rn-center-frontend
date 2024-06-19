import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import { ServiceService } from "@/services/ServiceService";
import ServiceForm from "@/components/doctor/service/ServiceForm";
import { getTranslations } from "next-intl/server";

const page = async ({
  params: { serviceId },
}: {
  params: { serviceId: number };
}) => {
  const t = await getTranslations("admin.service.create-edit");

  const service = (
    await ServiceService.make<ServiceService>("doctor").show(serviceId)
  ).data;
  return (
    <PageCard>
      <h2 className="card-title">{t("editService")}</h2>
      <ServiceForm
        type={"update"}
        defaultValues={{
          ...service,
        }}
      />
    </PageCard>
  );
};

export default page;