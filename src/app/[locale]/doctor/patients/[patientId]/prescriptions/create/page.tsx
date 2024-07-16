import React from "react";
import PrescriptionsForm from "@/components/common/prescriptions/PrescriptionsForm";

const page = async ({
  params: { patientId },
}: {
  params: { patientId: number };
}) => {

  return (
    <div>
      <h2 className="card-title mt-8 ml-8">Add Prescription</h2>

      <PrescriptionsForm id={patientId} userType={"doctor"}/>
    </div>
  );
};

export default page;