import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import PatientsForm from "@/components/admin/patients/PatientsForm";
import { PatientsService } from "@/services/PatientsService";

const page = async ({
  params: { patientId },
}: {
  params: { patientId: number };
}) => {
  const patient = (
    await PatientsService.make<PatientsService>("admin").show(patientId)
  ).data;

  return (
    <PageCard>
      <h2 className="card-title">Edit Patient</h2>
      <PatientsForm
        type={"update"}
        defaultValues={{
          ...patient,
        }}
      />
    </PageCard>
  );
};

export default page;
