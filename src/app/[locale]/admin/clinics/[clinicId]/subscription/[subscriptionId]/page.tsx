import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import { Link } from "@/navigation";
import Grid from "@/components/common/ui/Grid";
import { ClinicSubscriptionService } from "@/services/ClinicSubscriptionServic";
import { ClinicSubscription } from "@/Models/ClinicSubscription";

const page = async ({
  params: { subscriptionId },
}: {
  params: { subscriptionId: number };
}) => {
  const data =
    await ClinicSubscriptionService.make<ClinicSubscriptionService>().show(
      subscriptionId,
    );
  const res: ClinicSubscription = data?.data;
  return (
    <PageCard>
      <div className="flex justify-between items-center w-full h-24">
        <h2 className="card-title">Subscription Details</h2>
        <Link href={`/admin/subscriptions/${subscriptionId}/edit`}>
          <PrimaryButton type={"button"}>Edit</PrimaryButton>
        </Link>
      </div>
      <Grid md={2} gap={5}>
        <label className="label">
          Name :
          <span className="bg-base-200 px-2 rounded-xl text-lg">
            {res?.subscription?.name}
          </span>
        </label>
        <label className="label">
          Type :
          <span className="badge badge-accent px-2 rounded-xl text-lg">
            {res?.type}
          </span>
        </label>
        <label className="label">
          Remaining :
          <span className="badge badge-accent px-2 rounded-xl text-lg">
            {res?.remaining}
          </span>
        </label>

        <label className="label">
          Period :
          <span className="badge badge-success px-2 rounded-xl text-lg">
            {res?.subscription?.period && res?.subscription?.period <= 0
              ? "life time"
              : res?.subscription?.period}
          </span>
        </label>

        <label className="label">
          Cost :
          <span className="badge badge-neutral px-2 rounded-xl text-lg">
            {res?.subscription?.cost}
          </span>
        </label>
      </Grid>
      <label className="label">Description</label>
      <textarea
        defaultValue={res?.subscription?.description}
        className={"textarea"}
        disabled={true}
      />
    </PageCard>
  );
};

export default page;