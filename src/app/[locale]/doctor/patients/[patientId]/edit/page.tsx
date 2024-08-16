import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import PatientForm from "@/components/doctor/patients/PatientForm";
import { PatientsService } from "@/services/PatientsService";
import { getTranslations } from "next-intl/server";

const page = async ({
  params: { patientId },
}: {
  params: { patientId: number };
}) => {
  const t = await getTranslations("common.patient.create");

  const patient = (
    await PatientsService.make<PatientsService>("doctor").show(patientId)
  ).data;
  const defaultValues = {
    ...patient,
    first_name: patient?.user?.first_name,
    middle_name: patient?.user?.middle_name,
    last_name: patient?.user?.last_name,
    email: patient?.user?.email,
    birth_date: patient?.user?.birth_date,
    gender: patient?.user?.gender,
    blood_group: patient?.user?.blood_group,
    tags: patient?.user?.tags,
    image: patient?.user?.image,
    phone_numbers: patient?.user?.phones?.map((ph) => ph.phone),
    address: patient?.user?.address,
    password: patient?.user?.password,
    password_confirmation: patient?.user?.password_confirmation,
    other_data: patient.currentClinicPatientProfile?.other_data,
    note: patient.currentClinicPatientProfile?.note,
    medical_condition: patient.currentClinicPatientProfile?.medical_condition,
    images: patient.currentClinicPatientProfile?.images,
  };

  return (
    <PageCard>
      <h2 className="card-title">{t("editPatient")}</h2>
      <PatientForm
        type={"update"}
        defaultValues={{
          ...defaultValues,
        }}
      />
    </PageCard>
  );
};

export default page;
