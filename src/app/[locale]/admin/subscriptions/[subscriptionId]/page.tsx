import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import { Link } from "@/navigation";
import Grid from "@/components/common/ui/Grid";
import { SubscriptionsService } from "@/services/SubscriptionsService";
import { Subscriptions } from "@/Models/Subscriptions";
import SubscriptionClinicsTable from "@/components/admin/subscriptions/SubscriptionClinicsTable";

const page = async ({
  params: { subscriptionId },
}: {
  params: { subscriptionId: number };
}) => {
  const data =
    await SubscriptionsService.make<SubscriptionsService>().show(
      subscriptionId,
    );
  const res: Subscriptions = data?.data;

  return (
    <PageCard>
      <div className="flex justify-between items-center w-full h-24">
        <h2 className="card-title">Subscription Details</h2>
      </div>
      <Grid md={2} gap={5}>
        <label className="label">
          Name :
          <span className="bg-base-200 px-2 rounded-xl text-lg">
            {res?.name}
          </span>
        </label>
        <label className="label">
          Period :

            {res?.period && res?.period <= 0 ?
                <span className="badge badge-success px-2 rounded-xl text-lg">life time</span>
                : <div><span className="badge badge-outline px-2 rounded-xl text-lg">{res?.period}</span> <span className="badge badge-success px-2 rounded-xl text-lg">{res?.period_unit}</span></div>

            }

        </label>
        <label className="label">
          Allow Period :
          <span className="badge badge-accent px-2 rounded-xl text-lg">
            {res?.allow_period}
          </span>
        </label>
        <label className="label">
          Cost :
          <span className="badge badge-neutral px-2 rounded-xl text-lg">
            {res?.cost}
          </span>
        </label>
      </Grid>
      <label className="label">Description</label>
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