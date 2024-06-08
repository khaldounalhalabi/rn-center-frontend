import { TranslateClient } from "@/Helpers/TranslationsClient";
import Grid from "@/components/common/ui/Grid";
import React from "react";
import { User } from "@/Models/User";

const PatientsDetailes = ({
  patient,
}: {
  patient: User | null | undefined;
}) => {
  const tagsArray = patient?.tags.split(",");

  return (
    <>
      <Grid md={2} gap={5}>
        <label className="label justify-start text-xl">
          Birth Date :{" "}
          <span className="ml-2 badge badge-outline  ">
            {patient?.birth_date}
          </span>
        </label>
        <label className="label justify-start text-xl">
          Age :{" "}
          <span className="ml-2 badge badge-accent  ">{patient?.age}</span>
        </label>
        <label className="label justify-start text-xl">
          Address :{" "}
          <span className="ml-2 badge badge-success  ">
            {TranslateClient(patient?.address?.name)}
          </span>
        </label>
        <label className="label justify-start text-xl">
          City :{" "}
          <span className="ml-2 badge badge-ghost  ">
            {TranslateClient(patient?.address?.city?.name)}
          </span>
        </label>
        <label className="label justify-start text-xl">
          gender :{" "}
          <span className="ml-2 badge badge-accent  ">{patient?.gender}</span>
        </label>
        <label className="label justify-start text-xl">
          blood_group :{" "}
          <span className="ml-2 badge badge-accent  ">
            {patient?.blood_group}
          </span>
        </label>
        <label className="label justify-start text-xl">
          Is Blocked :{" "}
          {patient?.is_blocked ? (
            <span className="ml-2 badge badge-error">Blocked</span>
          ) : (
            <span className="ml-2 badge badge-success">Not Blocked</span>
          )}
        </label>
        <label className="label justify-start text-xl">
          Is Archived :{" "}
          {patient?.is_archived ? (
            <span className="ml-2 badge badge-neutral">Archived</span>
          ) : (
            <span className="ml-2 badge badge-warning">Not Archived</span>
          )}
        </label>
      </Grid>
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
    </>
  );
};

export default PatientsDetailes