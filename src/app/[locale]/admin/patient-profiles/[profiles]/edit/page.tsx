import React from "react";
import { PatientProfilesService } from "@/services/PatientProfilesService";
import PatientProfilesForm from "@/components/admin/patient-profiles/PatientProfilesForm";

const page = async ({
  params: { profiles },
}: {
  params: { profiles: number };
}) => {
  const offers = (
    await PatientProfilesService.make<PatientProfilesService>("admin").show(
      profiles,
    )
  ).data;
  return (
    <PatientProfilesForm
      type={"update"}
      defaultValues={{
        ...offers,
      }}
    />
  );
};

export default page;