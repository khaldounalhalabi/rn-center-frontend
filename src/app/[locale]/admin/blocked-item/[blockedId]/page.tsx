import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import { Link } from "@/navigation";
import Grid from "@/components/common/ui/Grid";
import { BlockedItemService } from "@/services/BlockedItemService";
import { BlockedItem } from "@/Models/BlockedItem";

const page = async ({
  params: { blockedId },
}: {
  params: { blockedId: number };
}) => {
  const data =
    await BlockedItemService.make<BlockedItemService>().show(blockedId);
  const res: BlockedItem = data?.data;
  return (
    <PageCard>
      <div className="flex justify-between items-center w-full h-24">
        <h2 className="card-title">Blocked Item Details</h2>
        <Link href={`/admin/blocked-item/${blockedId}/edit`}>
          <PrimaryButton type={"button"}>Edit</PrimaryButton>
        </Link>
      </div>
      <Grid md={2} gap={5}>
        <label className="label">
          Type :
          <span className="bg-base-200 px-2 rounded-xl text-lg">
            {res?.type}
          </span>
        </label>
        <label className="label">
          Value :
          <span className="badge badge-success px-2 rounded-xl text-lg">
            {res?.value}
          </span>
        </label>
      </Grid>
    </PageCard>
  );
};

export default page;
