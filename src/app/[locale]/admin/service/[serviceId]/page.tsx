import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import { Link } from "@/navigation";
import { ServiceService } from "@/services/ServiceService";
import { Service } from "@/Models/Service";
import Grid from "@/components/common/ui/Grid";
import { getTranslations } from "next-intl/server";
import Gallery from "@/components/common/ui/images/Gallery";
import { LabelValue } from "@/components/common/ui/labels-and-values/LabelValue";
import { Label } from "@/components/common/ui/labels-and-values/Label";
import { Value } from "@/components/common/ui/labels-and-values/Value";

const ServiceShowPage = async ({
  params: { serviceId },
}: {
  params: { serviceId: number };
}) => {
  const t = await getTranslations("admin.service.show");
  const data = await ServiceService.make<ServiceService>().show(serviceId);
  const res: Service = data?.data;
  return (
    <PageCard>
      <div className="flex justify-between items-center w-full h-24">
        <h2 className="card-title">{t("serviceDetails")}</h2>
        <Link href={`/admin/service/${res.id}/edit`}>
          <PrimaryButton type={"button"}>{t("editBtn")}</PrimaryButton>
        </Link>
      </div>
      <Grid md={2} gap={5}>
        <LabelValue label={t("serviceName")} value={res.name} />
        <Label label={t("category")}>
          <Link
            href={`/admin/service-categories/${res?.service_category?.id}`}
            className={"hover:underline"}
          >
            <Value value={res?.service_category?.name} color={"accent"} />
          </Link>
        </Label>

        <Label label={t("clinicName")}>
          <Link href={`/admin/clinics/${res.clinic_id}`}>
            <Value value={res?.clinic?.user?.full_name} color={"error"} />
          </Link>
        </Label>

        <LabelValue
          label={t("approximateDuration")}
          value={res?.approximate_duration}
        />

        <LabelValue
          label={t("price")}
          value={`
              ${res?.price.toLocaleString()} ${t("iqd")}
            `}
          color={"secondary"}
        />
      </Grid>
      <Grid md={1}>
        <LabelValue
          label={t("description")}
          value={res?.description}
          col={true}
          color={"brand-primary"}
        />

        <Label label={t("image")} col>
          <Gallery media={res?.icon} />
        </Label>
      </Grid>
    </PageCard>
  );
};

export default ServiceShowPage;
