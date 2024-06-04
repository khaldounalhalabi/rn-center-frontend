import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import { Link } from "@/navigation";
import { ServiceService } from "@/services/ServiceService";
import { Service } from "@/Models/Service";
import Grid from "@/components/common/ui/Grid";
import { getTranslations } from "next-intl/server";
import TranslateServer from "@/Helpers/TranslationsServer";

const page = async ({
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
        <label className="label">
          {t("serviceName")} En:{" "}
          <span className="bg-base-200 px-2 rounded-xl text-lg">
            {(await TranslateServer(res?.name, true))?.en}
          </span>
        </label>
        <label className="label">
          {t("serviceName")} Ar:{" "}
          <span className="bg-base-200 px-2 rounded-xl text-lg">
            {(await TranslateServer(res?.name, true)).ar}
          </span>
        </label>
        <label className="flex flex-wrap items-center gap-2 w-full label">
          {t("category")} :
          {res?.serviceCategory.name ? (
            <span className="badge badge-error">
              {await TranslateServer(res?.serviceCategory.name)}
            </span>
          ) : (
            <span className="text-lg badge-accent">{t("noData")}</span>
          )}
        </label>
        <label className="flex flex-wrap items-center gap-2 w-full label">
          {t("clinicName")} :
          {res?.clinic.name ? (
            <span className="badge badge-primary">
              {`${await TranslateServer(res?.clinic.name)}`}
            </span>
          ) : (
            <span className="text-lg badge badge-neutral">{t("noData")}</span>
          )}
        </label>
        <label className="flex flex-wrap items-center gap-2 w-full label">
          {t("approximateDuration")} :
          {res?.approximate_duration ? (
            <span className="badge badge-accent" suppressHydrationWarning>
              {res?.approximate_duration.toLocaleString()}
            </span>
          ) : (
            <span className="text-lg badge badge-neutral">{t("noData")}</span>
          )}
        </label>

        <label className="flex flex-wrap items-center gap-2 w-full label">
          {t("price")} :
          {res?.price ? (
            <span className="badge badge-accent" suppressHydrationWarning>
              {res?.price.toLocaleString()} IQD
            </span>
          ) : (
            <span className="text-lg badge badge-neutral">{t("noData")}</span>
          )}
        </label>
        <label className="flex flex-wrap items-center gap-1 w-full label">
          {t("status")} :
          {res?.status ? (
            <span className="badge badge-success">{res?.status}</span>
          ) : (
            <span className="text-lg badge badge-neutral">{t("noData")}</span>
          )}
        </label>
      </Grid>
      <Grid md={1}>
        <label className="flex flex-wrap items-center gap-2 w-full label">
          {t("description")} EN :
          {res?.status ? (
            <textarea
              rows={4}
              value={(await TranslateServer(res?.description, true)).en}
              className="textarea-bordered w-full text-lg textarea"
              readOnly={true}
            />
          ) : (
            <span className="text-lg badge badge-neutral">{t("noData")}</span>
          )}
        </label>
        <label className="flex flex-wrap items-center gap-2 w-full label">
          {t("description")} AR :
          {res?.status ? (
            <textarea
              rows={4}
              value={(await TranslateServer(res?.description, true)).ar}
              className="textarea-bordered w-full text-lg textarea"
              readOnly={true}
            />
          ) : (
            <span className="text-lg badge badge-neutral">{t("noData")}</span>
          )}
        </label>
      </Grid>
    </PageCard>
  );
};

export default page;