import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import { Link } from "@/navigation";
import { ServiceService } from "@/services/ServiceService";
import { Service } from "@/models/Service";
import Grid from "@/components/common/ui/Grid";
import { getTranslations } from "next-intl/server";
import Gallery from "@/components/common/ui/images/Gallery";
import { LabelValue } from "@/components/common/ui/labels-and-values/LabelValue";
import { Label } from "@/components/common/ui/labels-and-values/Label";
import { Value } from "@/components/common/ui/labels-and-values/Value";
import { Button } from "@/components/ui/shadcn/button";

const ServiceShowPage = async ({
  params: { serviceId },
}: {
  params: { serviceId: number };
}) => {
  const t = await getTranslations("admin.service.show");
  const data = await ServiceService.make().show(serviceId);
  const res: Service = data?.data;
  return (
    <PageCard>
      <div className="flex h-24 w-full items-center justify-between">
        <h2 className="card-title">{t("serviceDetails")}</h2>
        <Link href={`/admin/service/${res.id}/edit`}>
          <Button type={"button"}>{t("editBtn")}</Button>
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
              ${res?.price.toLocaleString()}
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
