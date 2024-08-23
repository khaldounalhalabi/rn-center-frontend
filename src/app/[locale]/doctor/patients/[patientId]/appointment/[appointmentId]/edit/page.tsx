import React from "react";
import AppointmentForm from "@/components/doctor/appointment/AppointmentForm";
import { AppointmentService } from "@/services/AppointmentService";

const page = async ({
  params: { appointmentId, patientId },
}: {
  params: { appointmentId: number; patientId: number };
}) => {
  const appointment = (
    await AppointmentService.make<AppointmentService>("doctor").show(
      appointmentId,
    )
  ).data;

  return (
    <AppointmentForm
      patient={appointment.customer}
      type={"update"}
      defaultValues={{
        ...appointment,
      }}
    />
  );
};

export default page;
