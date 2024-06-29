import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import { Link } from "@/navigation";
import Grid from "@/components/common/ui/Grid";
import TranslateServer from "@/Helpers/TranslationsServer";
import { SystemOffersService } from "@/services/SystemOffersService";
import { SystemOffers } from "@/Models/SystemOffer";
import Gallery from "@/components/common/ui/Gallery";

const page = async ({
  params: { systemId },
}: {
  params: { systemId: number };
}) => {
  const data =
    await SystemOffersService.make<SystemOffersService>().show(systemId);
  const res: SystemOffers = data?.data;
  const clinics = res.clinics;
  return (
    <PageCard>
      <div className="flex justify-between items-center w-full h-24">
        <h2 className="card-title">System Offer Details</h2>
        <Link href={`/admin/system-offer/${systemId}/edit`}>
          <PrimaryButton type={"button"}>Edit</PrimaryButton>
        </Link>
      </div>
      <label className="label justify-start text-xl">
        Clinics Name :{" "}
        {clinics?.map(async (e) => (
            <span className="ml-2 badge badge-accent">
              { TranslateServer(e.name)}
            </span>
        ))}
      </label>
      <Grid md={2} gap={5}>

        <label className="label justify-start text-xl">
          Title :{" "}
          <span className="ml-2 badge badge-outline  ">
            {res?.title}
          </span>
        </label>
        <label className="label justify-start text-xl">
          Type : <span className="ml-2 badge badge-success  ">{res?.type}</span>
        </label>
        <label className="label justify-start text-xl">
          Amount :{" "}
          <span className="ml-2 badge badge-ghost  ">
            {res?.amount}
          </span>
        </label>
        <label className="label justify-start text-xl">
          Allowed Uses :{" "}
          <span className="ml-2 badge badge-ghost  ">
            {res?.allowed_uses}
          </span>
        </label>
        <label className="label justify-start text-xl">
          Reuse :{" "}
          <span className="ml-2 badge badge-ghost  ">
            {res?.allow_reuse ? "Allow Reuse" : "Not Allow Reuse"}
          </span>
        </label>
        <label className="label justify-start text-xl">
          Start At :{" "}
          <span className="ml-2 badge badge-accent  ">{res?.from}</span>
        </label>
        <label className="label justify-start text-xl">
          End At :{" "}
          <span className="ml-2 badge badge-accent  ">{res?.to}</span>
        </label>
      </Grid>
      <label className={"label text-xl"}>Description :</label>
      <textarea
        className="textarea textarea-bordered h-24 w-full"
        disabled={true}
        defaultValue={res?.description??"No Data"}
      />
      {res?.image?.length != 0 ? (
          <Gallery
              media={res?.image ? res?.image : []}
          />
      ) : (
          <div className="flex items-center">
            <label className="label"> Image : </label>
            <span className="text-lg badge badge-neutral">No Data</span>
          </div>
      )}
    </PageCard>
  );
};

export default page;