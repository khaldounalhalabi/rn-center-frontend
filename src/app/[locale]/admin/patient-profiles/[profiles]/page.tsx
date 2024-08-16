import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import { Link } from "@/navigation";
import Grid from "@/components/common/ui/Grid";
import TranslateServer from "@/Helpers/TranslationsServer";
import { PatientProfilesService } from "@/services/PatientProfilesService";
import { PatientProfiles } from "@/Models/PatientProfiles";
import Gallery from "@/components/common/ui/Gallery";

const page = async ({
  params: { profiles },
}: {
  params: { profiles: number };
}) => {
  const data =
    await PatientProfilesService.make<PatientProfilesService>().show(profiles);
  const res: PatientProfiles = data?.data;
  console.log(data);
  const convertObjectToArray = (obj: { [key: string]: string }) => {
    return Object.entries(obj).map(([key, value]) => ({ key, value }));
  };
  const otherData = res.other_data
    ? convertObjectToArray(JSON.parse(res.other_data))
    : [];
  return (
    <>
      <PageCard>
        <div className="flex justify-between items-center w-full h-24">
          <h2 className="card-title">Patient Profile Details</h2>
          <Link href={`/admin/patient-profiles/${profiles}/edit`}>
            <PrimaryButton type={"button"}>Edit</PrimaryButton>
          </Link>
        </div>
        <Grid md={2} gap={5}>
          <label className="label justify-start text-xl">
            Clinic Name :{" "}
            <span className="ml-2 badge badge-neutral">
              {await TranslateServer(res?.clinic?.name)}
            </span>
          </label>
          <label className="label justify-start text-xl">
            Customer Name :{" "}
            <span className="ml-2 badge badge-secondary">
              {await TranslateServer(res?.customer?.user?.first_name)}{" "}
              {await TranslateServer(res?.customer?.user?.middle_name)}{" "}
              {await TranslateServer(res?.customer?.user?.last_name)}
            </span>
          </label>
        </Grid>
      </PageCard>
      <PageCard>
        <h2 className="card-title">Other Data :</h2>
        <Grid md={2}>
          {otherData?.map((data, index) => (
            <label key={index} className="label justify-start text-xl">
              {data.key} :{" "}
              <span className="ml-2 badge badge-warning">{data.value}</span>
            </label>
          ))}
        </Grid>
      </PageCard>
      <PageCard>
        <h2 className="card-title">Description :</h2>
        <label className={"label text-xl"}>Medical Condition :</label>
        <textarea
          className="textarea textarea-bordered h-24 w-full"
          disabled={true}
          defaultValue={res?.medical_condition ?? ""}
        />
        <label className={"label text-xl"}>Note :</label>
        <textarea
          className="textarea textarea-bordered h-24 w-full"
          disabled={true}
          defaultValue={res?.medical_condition ?? ""}
        />

        <div className={"col-span-2"}>
          {res?.images?.length != 0 ? (
            <Gallery media={res?.images ? res?.images : []} />
          ) : (
            <div className="flex items-center">
              <label className="label"> {"Image"} : </label>
              <span className="text-lg badge badge-neutral">{"No Data"}</span>
            </div>
          )}
        </div>
      </PageCard>
    </>
  );
};

export default page;
