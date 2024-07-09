import React from "react";
import { PrescriptionService } from "@/services/PrescriptionsServise";
import PrescriptionsForm from "@/components/common/prescriptions/PrescriptionsForm";
import { AppointmentService } from "@/services/AppointmentService";

const page = async ({
  params: { appointmentId, prescriptionsId },
}: {
  params: { appointmentId: number; prescriptionsId: number };
}) => {
  const prescriptions = (
    await PrescriptionService.make<PrescriptionService>("admin").show(
      prescriptionsId,
    )
  ).data;
  const appointment =
    await AppointmentService.make<AppointmentService>().show(appointmentId);

  return (
    <div>
      <h2 className="mt-8 ml-8 card-title">Edit Prescription</h2>
      <PrescriptionsForm
        type={"update"}
        appointment={appointment?.data}
        defaultValues={{
          ...prescriptions,
        }}
      />
    </div>
  );
};

export default page;