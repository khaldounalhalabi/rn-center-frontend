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

  const defaultValues ={
      ...patient,
      first_name:patient.user.first_name,
      middle_name:patient.user.middle_name,
      last_name:patient.user.last_name,
      email:patient.user.email,
      birth_date:patient.user.birth_date,
      gender:patient.user.gender,
      blood_group:patient.user.blood_group,
      tags:patient.user.tags,
      image:patient.user.image,
      phone_numbers:patient.user.phones.map((ph) => ph.phone),
      address:patient.user.address,
      password:patient.user.password,
      password_confirmation:patient.user.password_confirmation
  }

  return (
    <PageCard>
      <h2 className="card-title">Edit Patient</h2>
      <PatientsForm
        type={"update"}
        defaultValues={{...defaultValues
        }}
      />
    </PageCard>
  );
};

export default page;