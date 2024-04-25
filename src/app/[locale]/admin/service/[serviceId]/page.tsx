import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import { Link } from "@/i18Router";
import { translate } from "@/Helpers/Translations";
import { ServiceService } from "@/services/ServiceService";
import { Service } from "@/Models/Service";
import Grid from "@/components/common/ui/Grid";

const page = async ({
  params: { serviceId },
}: {
  params: { serviceId: number };
}) => {
  const data = await ServiceService.make<ServiceService>().show(serviceId);
  const res: Service = data?.data;
  console.log(res)
  return (
    <PageCard>
      <div className="flex justify-between items-center w-full h-24">
        <h2 className="card-title">Service Details</h2>
        <Link href={`/admin/service/${res.id}/edit`}>
          <PrimaryButton type={"button"}>Edit</PrimaryButton>
        </Link>
      </div>
      <Grid md={2} gap={5}>
        <label className="label">
          Service Name En:{" "}
          <span className="bg-base-200 px-2 rounded-xl text-lg">
            {translate(res?.name, true)?.en}
          </span>
        </label>
        <label className="label">
          Service Name Ar:{" "}
          <span className="bg-base-200 px-2 rounded-xl text-lg">
            {translate(res?.name, true).ar}
          </span>
        </label>
        <label className="flex flex-wrap items-center gap-2 w-full label">
          Category :
          {res?.serviceCategory.name ? (
            <span className="badge badge-error">
              {translate(res?.serviceCategory.name)}
            </span>
          ) : (
            <span className="text-lg badge-accent ">No Data</span>
          )}
        </label>
        <label className="flex flex-wrap items-center gap-2 w-full label">
          Clinic Name :
          {res?.clinic.name ? (
            <span className="badge badge-primary">
              {`${translate(res?.clinic.name)}`}
            </span>
          ) : (
            <span className="text-lg badge badge-neutral">No Data</span>
          )}
        </label>
        <label className="flex flex-wrap items-center gap-2 w-full label">
          Approximate Duration :
          {res?.approximate_duration ? (
            <span className="badge badge-accent">
              {res?.approximate_duration}
            </span>
          ) : (
            <span className="text-lg badge badge-neutral">No Departments</span>
          )}
        </label>

        <label className="flex flex-wrap items-center gap-2 w-full label">
          Price :
          {res?.price ? (
            <span className="badge badge-accent">{res?.price}</span>
          ) : (
            <span className="text-lg badge badge-neutral">No Data</span>
          )}
        </label>
        <label className="flex flex-wrap items-center gap-1 w-full label">
          Status :
          {res?.status ? (
            <span className="badge badge-success">{res?.status}</span>
          ) : (
            <span className="text-lg badge badge-neutral">No Data</span>
          )}
        </label>
        <label className="flex flex-wrap items-center gap-2 w-full label"></label>

        <label className="flex flex-wrap items-center gap-2 w-full label">
          Description EN :
          {res?.status ? (
            <textarea
              rows={4}
              value={translate(res?.description,true).en}
              className="textarea-bordered w-full text-lg textarea"
              readOnly={true}
            />
          ) : (
            <span className="text-lg badge badge-neutral">No Data</span>
          )}
        </label>
        <label className="flex flex-wrap items-center gap-2 w-full label">
          Description AR :
          {res?.status ? (
            <textarea
              rows={4}
              value={translate(res?.description,true).ar}
              className="textarea-bordered w-full text-lg textarea"
              readOnly={true}
            />
          ) : (
            <span className="text-lg badge badge-neutral">No Data</span>
          )}
        </label>
      </Grid>
    </PageCard>
  );
};

export default page;
