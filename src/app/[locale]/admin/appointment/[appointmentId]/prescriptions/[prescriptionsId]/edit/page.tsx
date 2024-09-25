import React from "react";
import { PrescriptionService } from "@/services/PrescriptionsServise";
import PrescriptionsForm from "@/components/common/prescriptions/PrescriptionsForm";
import { AppointmentService } from "@/services/AppointmentService";
import { getTranslations } from "next-intl/server";

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
  const t = await getTranslations("common.prescription.create");

  return (
    <div>
      <h2 className="mt-8 mx-8 card-title">{t("editPrescription")}</h2>
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
