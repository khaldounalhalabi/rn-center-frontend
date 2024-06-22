import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import { Link } from "@/navigation";
import { ServiceService } from "@/services/ServiceService";
import { Service } from "@/Models/Service";
import Grid from "@/components/common/ui/Grid";
import TranslateServer from "@/Helpers/TranslationsServer";
import Gallery from "@/components/common/ui/Gallery";

const page = async ({
  params: { serviceId },
}: {
  params: { serviceId: number };
}) => {
  const data =
    await ServiceService.make<ServiceService>("doctor").show(serviceId);
  const res: Service = data?.data;
  return (
    <PageCard>
      <div className="flex justify-between items-center w-full h-24">
        <h2 className="card-title">{"Service Details"}</h2>
        <Link href={`/doctor/service/${res.id}/edit`}>
          <PrimaryButton type={"button"}>{"Edit"}</PrimaryButton>
        </Link>
      </div>
      <Grid md={2} gap={5}>
        <label className="label">
          {"Service Name"} En:{" "}
          <span className="bg-base-200 px-2 rounded-xl text-lg">
            {(await TranslateServer(res?.name, true))?.en}
          </span>
        </label>
        <label className="label">
          {"Service Name"} Ar:{" "}
          <span className="bg-base-200 px-2 rounded-xl text-lg">
            {(await TranslateServer(res?.name, true)).ar}
          </span>
        </label>
        <label className="flex flex-wrap items-center gap-2 w-full label">
          {"Category"} :
          {res?.serviceCategory?.name ? (
            <span className="badge badge-error">
              {await TranslateServer(res?.serviceCategory.name)}
            </span>
          ) : (
            <span className="text-lg badge-accent">{"No Data"}</span>
          )}
        </label>
        <label className="flex flex-wrap items-center gap-2 w-full label">
          {"Clinic Name"} :
          {res?.clinic?.name ? (
            <span className="badge badge-primary">
              {`${await TranslateServer(res?.clinic?.name)}`}
            </span>
          ) : (
            <span className="text-lg badge badge-neutral">{"No Data"}</span>
          )}
        </label>
        <label className="flex flex-wrap items-center gap-2 w-full label">
          {"Approximate Duration"} :
          {res?.approximate_duration ? (
            <span className="badge badge-accent" suppressHydrationWarning>
              {res?.approximate_duration.toLocaleString()}
            </span>
          ) : (
            <span className="text-lg badge badge-neutral">{"No Data"}</span>
          )}
        </label>

        <label className="flex flex-wrap items-center gap-2 w-full label">
          {"Price"} :
          {res?.price ? (
            <span className="badge badge-accent" suppressHydrationWarning>
              {res?.price.toLocaleString()} IQD
            </span>
          ) : (
            <span className="text-lg badge badge-neutral">{"No Data"}</span>
          )}
        </label>
        <label className="flex flex-wrap items-center gap-1 w-full label">
          {"Status"} :
          {res?.status ? (
            <span className="badge badge-success">{res?.status}</span>
          ) : (
            <span className="text-lg badge badge-neutral">{"No Data"}</span>
          )}
        </label>
      </Grid>
      <Grid md={1}>
        <label className="flex flex-wrap items-center gap-2 w-full label">
          {"Description"} EN :
          {res?.status ? (
            <textarea
              rows={4}
              value={(await TranslateServer(res?.description, true)).en}
              className="textarea-bordered w-full text-lg textarea"
              readOnly={true}
            />
          ) : (
            <span className="text-lg badge badge-neutral">{"No Data"}</span>
          )}
        </label>
        <label className="flex flex-wrap items-center gap-2 w-full label">
          {"Description"} AR :
          {res?.status ? (
            <textarea
              rows={4}
              value={(await TranslateServer(res?.description, true)).ar}
              className="textarea-bordered w-full text-lg textarea"
              readOnly={true}
            />
          ) : (
            <span className="text-lg badge badge-neutral">{"No Data"}</span>
          )}
        </label>
        {res?.icon && res?.icon?.length > 0 ? (
          <Gallery media={res?.icon ? res?.icon : [""]} />
        ) : (
          <div className="flex justify-between items-center">
            <label className="label"> {"Image"} : </label>
            <span className="text-lg badge badge-neutral">{"No Image"}</span>
          </div>
        )}
      </Grid>
    </PageCard>
  );
};

export default page;