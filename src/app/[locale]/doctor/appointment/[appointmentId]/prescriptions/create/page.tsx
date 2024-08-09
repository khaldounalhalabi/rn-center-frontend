import React from "react";
import PrescriptionsForm from "@/components/common/prescriptions/PrescriptionsForm";
import { AppointmentService } from "@/services/AppointmentService";
import {getTranslations} from "next-intl/server";

const page = async ({
  params: { appointmentId },
}: {
  params: { appointmentId: number };
}) => {
    const t = await getTranslations('common.prescription.create')
  const appointment =
    await AppointmentService.make<AppointmentService>("doctor").show(appointmentId);
  return (
    <div>
      <h2 className="card-title mt-8 ml-8">{t("addPrescription")}</h2>

      <PrescriptionsForm appointment={appointment?.data} userType={"doctor"}/>
    </div>
  );
};

export default page;