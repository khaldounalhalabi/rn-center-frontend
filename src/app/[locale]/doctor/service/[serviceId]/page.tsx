import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import { Link } from "@/navigation";
import { ServiceService } from "@/services/ServiceService";
import { Service } from "@/Models/Service";
import Grid from "@/components/common/ui/Grid";
import TranslateServer from "@/Helpers/TranslationsServer";
import Gallery from "@/components/common/ui/Gallery";
import { getTranslations } from "next-intl/server";
import { LabelValue } from "@/components/common/ui/LabelsValues/LabelValue";
import { Label } from "@/components/common/ui/LabelsValues/Label";
import { Value } from "@/components/common/ui/LabelsValues/Value";

const page = async ({
  params: { serviceId },
}: {
  params: { serviceId: number };
}) => {
  const t = await getTranslations("doctor.service.show");
  const data =
    await ServiceService.make<ServiceService>("doctor").show(serviceId);
  const res: Service = data?.data;
  return (
    <PageCard>
      <div className="flex justify-between items-center w-full h-24">
        <h2 className="card-title">{t("serviceDetails")}</h2>
        <Link href={`/doctor/service/${res.id}/edit`}>
          <PrimaryButton type={"button"}>{t("editBtn")}</PrimaryButton>
        </Link>
      </div>
      <Grid md={2} gap={5}>
        <LabelValue
          label={`${t("serviceName")} En`}
          value={(await TranslateServer(res?.name, true))?.en}
          color={"accent"}
        />

        <LabelValue
          label={`${t("serviceName")} Ar`}
          value={(await TranslateServer(res?.name, true)).ar}
        />

        <LabelValue
          label={t("category")}
          value={await TranslateServer(res?.serviceCategory?.name)}
          color={"error"}
        />
        <LabelValue
          label={t("approximateDuration")}
          value={res?.approximate_duration.toLocaleString()}
          color={"warning"}
        />

        <LabelValue
          label={t("price")}
          value={`${res?.price?.toLocaleString() ?? 0} ${t("iqd")}`}
          color={"info"}
        />

        <LabelValue label={t("status")} value={res?.status} color={"success"} />
      </Grid>

      <Label label={`${t("description")} EN`} col={true}>
        <textarea
          rows={4}
          value={(await TranslateServer(res?.description, true)).en}
          className="textarea-bordered w-full textarea text-sm"
          readOnly={true}
        />
      </Label>

      <Label label={`${t("description")} AR`} col={true}>
        <textarea
          rows={4}
          value={(await TranslateServer(res?.description, true)).ar}
          className="textarea-bordered w-full textarea text-sm"
          readOnly={true}
        />
      </Label>

      {res?.icon && res?.icon?.length > 0 ? (
        <Gallery media={res?.icon ? res?.icon : [""]} />
      ) : (
        <Label label={t("image")}>
          <Value />
        </Label>
      )}
    </PageCard>
  );
};

export default page;
