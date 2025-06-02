import { getUser } from "@/actions/HelperActions";
import { Navigate } from "@/actions/Navigate";
import PageCard from "@/components/common/ui/PageCard";
import MedicineFormSheet from "@/components/doctor/medicines/MedicineFormSheet";
import PrescriptionForm from "@/components/doctor/prescriptions/PrescriptionForm";
import { getTranslations } from "next-intl/server";

const Page = async ({
  params: { patientId },
}: {
  params: { patientId: number };
}) => {
  const t = await getTranslations("common.prescription");
  const user = await getUser();
  if (!user?.clinic?.id) {
    await Navigate("403");
  }
  return (
    <PageCard
      title={t("create.addPrescription")}
      actions={<MedicineFormSheet />}
    >
      <PrescriptionForm
        clinicId={user?.clinic?.id ?? 0}
        type={"store"}
        customerId={patientId}
      />
    </PageCard>
  );
};

export default Page;
