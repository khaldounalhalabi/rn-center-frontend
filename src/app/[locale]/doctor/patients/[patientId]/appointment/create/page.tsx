import React from "react";
import AppointmentForm from "@/components/doctor/appointment/AppointmentForm";
import { PatientService } from "@/services/PatientService";
import { AuthService } from "@/services/AuthService";

const page = async ({
  params: { patientId },
}: {
  params: { patientId: number };
}) => {
  const patient = (
    await PatientService.make<PatientService>("doctor").show(patientId)
  ).data;
  const clinic = await AuthService.make<AuthService>("doctor").userDetails();
  return (
    <AppointmentForm type="store" patient={patient} clinic={clinic?.data} />
  );
};

export default page;
