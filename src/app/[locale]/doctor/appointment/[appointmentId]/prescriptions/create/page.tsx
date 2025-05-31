import PageCard from "@/components/common/ui/PageCard";
import PrescriptionForm from "@/components/doctor/prescriptions/PrescriptionForm";
import { AppointmentService } from "@/services/AppointmentService";
import { getTranslations } from "next-intl/server";
import { RoleEnum } from "@/enums/RoleEnum";

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
    <PageCard title={t("addPrescription")}>
      <PrescriptionForm type={"store"} appointment={appointment} clinicId={appointment?.clinic_id}/>
    </PageCard>
  );
};

export default Page;
