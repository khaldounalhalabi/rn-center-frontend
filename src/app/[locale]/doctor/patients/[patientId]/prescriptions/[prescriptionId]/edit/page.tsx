import { getUser } from "@/actions/HelperActions";
import PageCard from "@/components/common/ui/PageCard";
import PrescriptionForm from "@/components/doctor/prescriptions/PrescriptionForm";
import { RoleEnum } from "@/enums/RoleEnum";
import { PrescriptionService } from "@/services/PrescriptionsServise";
import { getTranslations } from "next-intl/server";

const Page = async ({
  params: { patientId, prescriptionId },
}: {
  params: { patientId: number; prescriptionId: number };
}) => {
  const prescription = (
    await PrescriptionService.make(RoleEnum.DOCTOR).show(prescriptionId)
  ).data;
  const t = await getTranslations("common.prescription");
  const user = await getUser();
  return (
    <PageCard
      title={t("create.editPrescription")}
      description={`${t("patient")} : ${prescription?.customer?.user?.full_name}`}
    >
      <PrescriptionForm
        clinicId={user?.clinic?.id ?? 0}
        type={"update"}
        prescription={prescription}
        customerId={patientId}
      />
    </PageCard>
  );
};

export default Page;
