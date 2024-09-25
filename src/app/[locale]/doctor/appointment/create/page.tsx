import React from "react";
import AppointmentForm from "@/components/doctor/appointment/AppointmentForm";
import { AuthService } from "@/services/AuthService";

const page = async () => {
  const actor = await AuthService.make<AuthService>("doctor").GetUserDetails();

  return <AppointmentForm type="store" clinic={actor.data} />;
};

export default page;
