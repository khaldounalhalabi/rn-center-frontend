import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import { Link } from "@/navigation";
import Grid from "@/components/common/ui/Grid";
import TranslateServer from "@/Helpers/TranslationsServer";
import { TransactionService } from "@/services/TransactionService";
import { Transactions } from "@/Models/Transactions";

const page = async ({
  params: { transactionId },
}: {
  params: { transactionId: number };
}) => {
  const data =
    await TransactionService.make<TransactionService>().show(transactionId);
  const res: Transactions = data?.data;

  return (
    <PageCard>
      <div className="flex justify-between items-center w-full h-24">
        <h2 className="card-title">Transaction Details</h2>
        <Link href={`/admin/transaction/${transactionId}/edit`}>
          <PrimaryButton type={"button"}>Edit</PrimaryButton>
        </Link>
      </div>
      <Grid md={2} gap={5}>
        <label className="label justify-start text-xl">
          Actor Name :{" "}
          <span className="ml-2 badge badge-primary">
            {await TranslateServer(res.actor.first_name)}{" "}
            {await TranslateServer(res.actor.middle_name)}{" "}
            {await TranslateServer(res.actor.last_name)}
          </span>
        </label>
        <label className="label justify-start text-xl">
          type : <span className="ml-2 badge badge-outline  ">{res.type}</span>
        </label>
        <label className="label justify-start text-xl">
          Amount :{" "}
          <span className="ml-2 badge badge-warning" suppressHydrationWarning>
            {res?.amount.toLocaleString()} IQD
          </span>
        </label>

        <label className="label justify-start text-xl">
          date :{" "}
          <span className="ml-2 badge badge-accent  ">
            {res?.date ?? "No Data"}
          </span>
        </label>
      </Grid>
      <label className={"label text-xl"}>Description :</label>
      <textarea
        className="textarea textarea-bordered h-24 w-full"
        disabled={true}
        defaultValue={res?.description ?? ""}
      />
    </PageCard>
  );
};

export default page;