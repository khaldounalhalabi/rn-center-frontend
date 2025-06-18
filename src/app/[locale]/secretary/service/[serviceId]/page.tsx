import Grid from "@/components/common/ui/Grid";
import PageCard from "@/components/common/ui/PageCard";
import Gallery from "@/components/common/ui/images/Gallery";
import { Label } from "@/components/common/ui/labels-and-values/Label";
import { LabelValue } from "@/components/common/ui/labels-and-values/LabelValue";
import { Value } from "@/components/common/ui/labels-and-values/Value";
import { Button } from "@/components/ui/shadcn/button";
import { RoleEnum } from "@/enums/RoleEnum";
import { Service } from "@/models/Service";
import { Link } from "@/navigation";
import { ServiceService } from "@/services/ServiceService";
import { getTranslations } from "next-intl/server";

const ServiceShowPage = async ({
  params: { serviceId },
}: {
  params: { serviceId: number };
}) => {
  const t = await getTranslations("admin.service.show");
  const data = await ServiceService.make(RoleEnum.SECRETARY).show(serviceId);
  const res: Service = data?.data;
  return (
    <PageCard
      title={t("serviceDetails")}
      actions={
        <Link href={`/secretary/service/${res.id}/edit`}>
          <Button type={"button"}>{t("editBtn")}</Button>
        </Link>
      }
    >
      <Grid md={2} gap={5}>
        <LabelValue label={t("serviceName")} value={res.name} />
        <Label label={t("category")}>
          <Link
            href={`/secretary/service-categories/${res?.service_category?.id}`}
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
