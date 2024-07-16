import React from "react";
import { PrescriptionService } from "@/services/PrescriptionsServise";
import PrescriptionsForm from "@/components/common/prescriptions/PrescriptionsForm";

const page = async ({
  params: { patientId, prescriptionsId },
}: {
  params: { patientId: number; prescriptionsId: number };
}) => {
  const prescriptions = (
    await PrescriptionService.make<PrescriptionService>("doctor").show(
      prescriptionsId,
    )
  ).data;

  return (
    <div>
      <h2 className="mt-8 ml-8 card-title">Edit Prescription</h2>
      <PrescriptionsForm
          userType={'doctor'}
        type={"update"}
        id={patientId}
        defaultValues={{
          ...prescriptions,
        }}
      />
    </div>
  );
};

export default page;