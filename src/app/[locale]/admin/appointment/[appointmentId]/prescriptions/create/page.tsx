import React from "react";
import PrescriptionsForm from "@/components/common/prescriptions/PrescriptionsForm";
import { AppointmentService } from "@/services/AppointmentService";

const page = async ({
  params: { appointmentId },
}: {
  params: { appointmentId: number };
}) => {
  const appointment =
    await AppointmentService.make<AppointmentService>().show(appointmentId);
  return (
    <div>
      <h2 className="card-title mt-8 ml-8">Add Prescription</h2>

      <PrescriptionsForm appointment={appointment?.data} />
    </div>
  );
};

export default page;
