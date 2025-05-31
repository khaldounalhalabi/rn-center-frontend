import PageCard from "@/components/common/ui/PageCard";
import MedicineFormSheet from "@/components/doctor/medicines/MedicineFormSheet";
import PrescriptionForm from "@/components/doctor/prescriptions/PrescriptionForm";
import { RoleEnum } from "@/enums/RoleEnum";
import { AppointmentService } from "@/services/AppointmentService";
import { PrescriptionService } from "@/services/PrescriptionsServise";
import { getTranslations } from "next-intl/server";

const Page = async ({
  params: { appointmentId, prescriptionId },
}: {
  params: { appointmentId: number; prescriptionId: number };
}) => {
  const prescription = (
    await PrescriptionService.make(RoleEnum.DOCTOR).show(prescriptionId)
  ).data;
  const appointment = (
    await AppointmentService.make(RoleEnum.DOCTOR).show(appointmentId)
  ).data;

  const t = await getTranslations("common.prescription");

  return (
    <PageCard
      title={t("create.editPrescription")}
      actions={<MedicineFormSheet />}
    >
      <PrescriptionForm
        appointment={appointment}
        clinicId={appointment?.clinic_id}
        prescription={prescription}
        type={"update"}
      />
    </PageCard>
  );
};

export default Page;
