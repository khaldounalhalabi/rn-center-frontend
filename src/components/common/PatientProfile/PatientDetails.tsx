import { TranslateClient } from "@/Helpers/TranslationsClient";
import Grid from "@/components/common/ui/Grid";
import React from "react";
import { Customer } from "@/Models/Customer";
import Gallery from "@/components/common/ui/Gallery";

const PatientDetails = ({
  patient,
  typePage = "admin",
}: {
  patient: Customer;
  typePage?: "admin" | "doctor";
}) => {
  const convertObjectToArray = (obj: { [key: string]: string }) => {
    return Object.entries(obj).map(([key, value]) => ({ key, value }));
  };
  const tagsArray = patient?.user?.tags ? patient?.user?.tags.split(",") : [];
  const otherData = patient?.currentClinicPatientProfile?.other_data
    ? convertObjectToArray(
        JSON.parse(patient?.currentClinicPatientProfile?.other_data),
      )
    : [];
  return (
    <>
      <Grid md={2} gap={5}>
        <label className="label justify-start text-xl">
          Birth Date :{" "}
          <span className="ml-2 badge badge-outline  ">
            {patient?.user?.birth_date}
          </span>
        </label>
        <label className="label justify-start text-xl">
          Age :{" "}
          <span className="ml-2 badge badge-accent  ">
            {patient?.user?.age}
          </span>
        </label>
        <label className="label justify-start text-xl">
          Address :{" "}
          <span className="ml-2 badge badge-success  ">
            {TranslateClient(patient?.user?.address?.name)}
          </span>
        </label>
        <label className="label justify-start text-xl">
          City :{" "}
          <span className="ml-2 badge badge-ghost  ">
            {TranslateClient(patient?.user?.address?.city?.name)}
          </span>
        </label>
        <label className="label justify-start text-xl">
          gender :{" "}
          <span className="ml-2 badge badge-accent  ">
            {patient?.user?.gender}
          </span>
        </label>
        <label className="label justify-start text-xl">
          blood_group :{" "}
          <span className="ml-2 badge badge-accent  ">
            {patient?.user?.blood_group}
          </span>
        </label>
        <label className="label justify-start text-xl">
          Is Blocked :{" "}
          {patient?.user?.is_blocked ? (
            <span className="ml-2 badge badge-error">Blocked</span>
          ) : (
            <span className="ml-2 badge badge-success">Not Blocked</span>
          )}
        </label>
        <label className="label justify-start text-xl">
          Is Archived :{" "}
          {patient?.user?.is_archived ? (
            <span className="ml-2 badge badge-neutral">Archived</span>
          ) : (
            <span className="ml-2 badge badge-warning">Not Archived</span>
          )}
        </label>
      </Grid>
      {typePage == "admin" ? (
        <label className="label justify-start text-xl">
          Tags :{" "}
          {tagsArray ? (
            tagsArray.map((e, index) => (
              <span
                key={index}
                className="rtl:mr-1 ltr:ml-1 text-lg badge badge-neutral"
              >
                {e}
              </span>
            ))
          ) : (
            <span className="text-lg badge badge-neutral">No Data</span>
          )}
        </label>
      ) : (
        <>
          <h2 className="card-title">Other Data :</h2>
          <Grid md={2}>
            {otherData?.map((data, index) => (
              <label key={index} className="label justify-start text-xl">
                {data.key} :{" "}
                <span className="ml-2 badge badge-warning">{data.value}</span>
              </label>
            ))}
          </Grid>
          <label className={"label text-xl"}>Note :</label>
          <textarea
            className="textarea textarea-bordered h-24 w-full"
            disabled={true}
            defaultValue={patient?.currentClinicPatientProfile?.note}
          />
          <label className={"label text-xl"}>Medical Condition :</label>
          <textarea
            className="textarea textarea-bordered h-24 w-full"
            disabled={true}
            defaultValue={
              patient?.currentClinicPatientProfile?.medical_condition
            }
          />
          <Gallery media={patient?.currentClinicPatientProfile?.images ?? []} />
        </>
      )}
    </>
  );
};

export default PatientDetails