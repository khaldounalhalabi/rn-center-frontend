import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import { Link } from "@/navigation";
import Grid from "@/components/common/ui/Grid";
import { OffersService } from "@/services/OffersService";
import { Offers } from "@/Models/Offers";
import TranslateServer from "@/Helpers/TranslationsServer";

const page = async ({
  params: { offerId },
}: {
  params: { offerId: number };
}) => {
  const data = await OffersService.make<OffersService>().show(offerId);
  const res: Offers = data?.data;

  return (
    <PageCard>
      <div className="flex justify-between items-center w-full h-24">
        <h2 className="card-title">Offer Details</h2>
        <Link href={`/admin/offer/${offerId}/edit`}>
          <PrimaryButton type={"button"}>Edit</PrimaryButton>
        </Link>
      </div>
      <Grid md={2} gap={5}>
        <label className="label justify-start text-xl">
          Clinic Name :{" "}
          <span className="ml-2 badge badge-error">
            {await TranslateServer(res?.clinic?.name)}
          </span>
        </label>
        <label className="label justify-start text-xl">
          Appointment Cost :{" "}
          <span className="ml-2 badge badge-error" suppressHydrationWarning>
            {res?.clinic?.appointment_cost.toLocaleString()} IQD
          </span>
        </label>
        <label className="label justify-start text-xl">
          Title :{" "}
          <span className="ml-2 badge badge-outline  ">
            {await TranslateServer(res?.title)}
          </span>
        </label>
        <label className="label justify-start text-xl">
          Is Active :{" "}
          {res?.is_active ? (
            <span className="ml-2 badge badge-neutral">Active</span>
          ) : (
            <span className="ml-2 badge badge-warning">Not Active</span>
          )}
        </label>
        <label className="label justify-start text-xl">
          Type : <span className="ml-2 badge badge-success  ">{res?.type}</span>
        </label>
        <label className="label justify-start text-xl">
          value :{" "}
          <span className="ml-2 badge badge-ghost  ">
            {res?.value} {res?.type == "percentage" ? "%" : "IQD"}
          </span>
        </label>
        <label className="label justify-start text-xl">
          Start At :{" "}
          <span className="ml-2 badge badge-accent  ">{res?.start_at}</span>
        </label>
        <label className="label justify-start text-xl">
          End At :{" "}
          <span className="ml-2 badge badge-accent  ">{res?.end_at}</span>
        </label>
      </Grid>
      <label className={"label text-xl"}>Note :</label>
      <textarea
        className="textarea textarea-bordered h-24 w-full"
        disabled={true}
        defaultValue={await TranslateServer(res?.note)}
      />
    </PageCard>
  );
};

export default page;