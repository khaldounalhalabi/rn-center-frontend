import React from "react";
import AppointmentForm from "@/components/doctor/appointment/AppointmentForm";
import { PatientsService } from "@/services/PatientsService";
import { AuthService } from "@/services/AuthService";

const page = async ({
  params: { patientId },
}: {
  params: { patientId: number };
}) => {
  const patient = (
    await PatientsService.make<PatientsService>("doctor").show(patientId)
  ).data;
  const clinic = await AuthService.make<AuthService>("doctor").GetUserDetails();
  return (
    <AppointmentForm type="store" patient={patient} clinic={clinic?.data} />
  );
};

export default page;
