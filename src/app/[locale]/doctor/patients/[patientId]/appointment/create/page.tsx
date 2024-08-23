import React from "react";
import AppointmentForm from "@/components/doctor/appointment/AppointmentForm";
import { PatientsService } from "@/services/PatientsService";

const page = async ({
  params: { patientId },
}: {
  params: { patientId: number };
}) => {
  const patient = (
    await PatientsService.make<PatientsService>("doctor").show(patientId)
  ).data;
  return <AppointmentForm type="store" patient={patient} />;
};

export default page;
