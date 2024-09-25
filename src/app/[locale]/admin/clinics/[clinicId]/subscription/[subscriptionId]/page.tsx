import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import { Link } from "@/navigation";
import Grid from "@/components/common/ui/Grid";
import { ClinicSubscription } from "@/Models/ClinicSubscription";
import { getTranslations } from "next-intl/server";
import { ClinicSubscriptionService } from "@/services/ClinicSubscriptionService";

const page = async ({
  params: { clinicId, subscriptionId },
}: {
  params: { clinicId: number; subscriptionId: number };
}) => {
  const t = await getTranslations("admin.subscription.show");

  const data =
    await ClinicSubscriptionService.make<ClinicSubscriptionService>().show(
      subscriptionId,
    );
  const res: ClinicSubscription = data?.data;
  return (
    <PageCard>
      <div className="flex justify-between items-center w-full h-24">
        <h2 className="card-title">{t("subscriptionDetails")}</h2>
        <Link
          href={`/admin/clinics/${clinicId}/subscription/${subscriptionId}/edit`}
        >
          <PrimaryButton type={"button"}>{t("editBtn")}</PrimaryButton>
        </Link>
      </div>
      <Grid md={2} gap={5}>
        <label className="label">
          {t("subscriptionName")} :
          <span className="bg-base-200 px-2 rounded-xl text-lg">
            {res?.subscription?.name}
          </span>
        </label>
        <label className="label">
          {t("type")} :
          <span className="bg-accent px-2 rounded-xl text-lg">{res?.type}</span>
        </label>

        <label className="label">
          {t("period")} :
          <span className="badge badge-success px-2 rounded-xl text-lg">
            {res?.subscription?.period && res?.subscription?.period <= 0
              ? t("lifeTime")
              : res?.subscription?.period}
          </span>
        </label>

        {res?.subscription?.period && res?.subscription?.period >= 0 && (
          <label className="label">
            {t("remaining")} :
            <span className="badge badge-accent px-2 rounded-xl text-lg">
              {res?.remaining}
            </span>
          </label>
        )}

        <label className="label">
          {t("cost")} :
          <span className="badge badge-neutral px-2 rounded-xl text-lg">
            {res?.subscription?.cost}
          </span>
        </label>
      </Grid>
      <label className="label">{t("description")}</label>
      <textarea
        defaultValue={res?.subscription?.description}
        className={"textarea"}
        disabled={true}
      />
    </PageCard>
  );
};

export default page;
