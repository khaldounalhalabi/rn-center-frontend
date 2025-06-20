import PageCard from "@/components/common/ui/PageCard";
import MedicineFormSheet from "@/components/doctor/medicines/MedicineFormSheet";
import PrescriptionForm from "@/components/doctor/prescriptions/PrescriptionForm";
import { RoleEnum } from "@/enums/RoleEnum";
import { AppointmentService } from "@/services/AppointmentService";
import { getTranslations } from "next-intl/server";

const Page = async ({
  params: { appointmentId },
}: {
  params: { appointmentId: number };
}) => {
  const t = await getTranslations("common.prescription.create");
  const appointment = (
    await AppointmentService.make(RoleEnum.DOCTOR).show(appointmentId)
  ).data;
  return (
    <PageCard title={t("addPrescription")} actions={<MedicineFormSheet />}>
      <PrescriptionForm
        type={"store"}
        appointment={appointment}
        clinicId={appointment?.clinic_id}
      />
    </PageCard>
  );
};

export default Page;
