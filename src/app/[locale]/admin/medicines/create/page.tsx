import PageCard from "@/components/common/ui/PageCard";
import MedicineForm from "@/components/common/medicine/MedicineForm";
import { getTranslations } from "next-intl/server";

const Page = async () => {
  const t = await getTranslations("common.medicine.create");
  return (
    <PageCard>
      <h1 className={"card-title"}>{t("addMedicines")}</h1>
      <MedicineForm type={"store"} />
    </PageCard>
  );
};

export default Page;
