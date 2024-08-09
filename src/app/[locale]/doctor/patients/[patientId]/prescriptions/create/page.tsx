import React from "react";
import PrescriptionsForm from "@/components/common/prescriptions/PrescriptionsForm";
import {getTranslations} from "next-intl/server";

const page = async ({
  params: { patientId },
}: {
  params: { patientId: number };
}) => {
  const t = await getTranslations("common.prescription.create")
  return (
    <div>
      <h2 className="card-title mt-8 ml-8 mx-4">{t("addPrescription")}</h2>

      <PrescriptionsForm customerId={patientId} userType={"doctor"}/>
    </div>
  );
};

export default page;