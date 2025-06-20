import MedicineForm from "@/components/common/medicine/MedicineForm";
import PageCard from "@/components/common/ui/PageCard";
import { RoleEnum } from "@/enums/RoleEnum";
import { MedicineService } from "@/services/MedicinesSevice";
import { getTranslations } from "next-intl/server";

const page = async ({
  params: { medicinesId },
}: {
  params: { medicinesId: number };
}) => {
  const t = await getTranslations("common.medicine.create");

  const medicines = (
    await MedicineService.make(RoleEnum.SECRETARY).show(medicinesId)
  ).data;

  return (
    <PageCard title={t("editMedicine")}>
      <MedicineForm type={"update"} defaultValues={medicines} />
    </PageCard>
  );
};

export default page;
