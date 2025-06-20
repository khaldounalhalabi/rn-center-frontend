import PrescriptionDetails from "@/components/common/prescriptions/PrescriptionDetails";
import PageCard from "@/components/common/ui/PageCard";
import { RoleEnum } from "@/enums/RoleEnum";
import { PrescriptionService } from "@/services/PrescriptionsServise";
import { getTranslations } from "next-intl/server";

const Page = async ({
  params: { prescriptionId, patientId },
}: {
  params: { prescriptionId: number; patientId: number };
}) => {
  const t = await getTranslations("common.prescription.show");
  const prescription = (
    await PrescriptionService.make(RoleEnum.ADMIN).show(prescriptionId)
  )?.data;
  return (
    <PageCard title={t("prescriptionsDetails")}>
      <PrescriptionDetails prescription={prescription} customerId={patientId} />
    </PageCard>
  );
};

export default Page;
