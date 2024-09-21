import React from "react";
import AppointmentForm from "@/components/doctor/appointment/AppointmentForm";
import { AppointmentService } from "@/services/AppointmentService";
import {AuthService} from "@/services/AuthService";

const page = async ({
  params: { appointmentId },
}: {
  params: { appointmentId: number };
}) => {
  const appointment = (
    await AppointmentService.make<AppointmentService>("doctor").show(
      appointmentId,
    )
  ).data;
    const actor = await AuthService.make<AuthService>("doctor").GetUserDetails()

  return (
    <AppointmentForm
      type={"update"}
      defaultValues={{
        ...appointment,
      }}
      clinic={actor.data}
    />
  );
};

export default page;