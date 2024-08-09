import React from "react";
import { PrescriptionService } from "@/services/PrescriptionsServise";
import PrescriptionsForm from "@/components/common/prescriptions/PrescriptionsForm";
import { AppointmentService } from "@/services/AppointmentService";
import {getTranslations} from "next-intl/server";

const page = async ({
  params: { appointmentId, prescriptionsId },
}: {
  params: { appointmentId: number; prescriptionsId: number };
}) => {
    const t = await getTranslations('common.prescription.create')

    const prescriptions = (
    await PrescriptionService.make<PrescriptionService>("doctor").show(
      prescriptionsId,
    )
  ).data;
  const appointment =
    await AppointmentService.make<AppointmentService>("doctor").show(appointmentId);

  return (
    <div>
      <h2 className="mt-8 ml-8 card-title">{t("editPrescription")}</h2>
      <PrescriptionsForm
          userType={'doctor'}
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