import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import Grid from "@/components/common/ui/Grid";
import { SubscriptionsService } from "@/services/SubscriptionsService";
import { Subscriptions } from "@/Models/Subscriptions";
import SubscriptionClinicsTable from "@/components/admin/subscriptions/SubscriptionClinicsTable";
import { getTranslations } from "next-intl/server";

const page = async ({
  params: { subscriptionId },
}: {
  params: { subscriptionId: number };
}) => {
  const t = await getTranslations("admin.subscription.show");

  const data =
    await SubscriptionsService.make<SubscriptionsService>().show(
      subscriptionId,
    );
  const res: Subscriptions = data?.data;

  return (
    <PageCard>
      <div className="flex justify-between items-center w-full h-24">
        <h2 className="card-title">{t("subscriptionDetails")}</h2>
      </div>
      <Grid md={2} gap={5}>
        <label className="label">
          {t("subscriptionName")} :
          <span className="bg-base-200 px-2 rounded-xl text-lg">
            {res?.name}
          </span>
        </label>
        <label className="label">
          {t("period")} :
          {res?.period && res?.period <= 0 ? (
            <span className="badge badge-success px-2 rounded-xl text-lg">
              {t("lifeTime")}
            </span>
          ) : (
            <div>
              <span className="badge badge-outline px-2 rounded-xl text-lg">
                {res?.period}
              </span>{" "}
              <span className="badge badge-success px-2 rounded-xl text-lg">
                {res?.period_unit}
              </span>
            </div>
          )}
        </label>
        <label className="label">
          {t("allowPeriod")} :
          <span className="badge badge-accent px-2 rounded-xl text-lg">
            {res?.allow_period}
          </span>
        </label>
        <label className="label">
          {t("cost")} :
          <span className="badge badge-neutral px-2 rounded-xl text-lg">
            {res?.cost}
          </span>
        </label>
      </Grid>
      <label className="label">{t("description")}</label>
      <textarea
        defaultValue={res?.description}
        className={"textarea"}
        disabled={true}
      />
      <SubscriptionClinicsTable subscriptionId={res.id} />
    </PageCard>
  );
};

export default page;
