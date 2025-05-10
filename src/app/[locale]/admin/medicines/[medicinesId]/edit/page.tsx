import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import { MedicineService } from "@/services/MedicinesSevice";
import MedicineForm from "@/components/common/medicine/MedicineForm";
import { getTranslations } from "next-intl/server";
import { RoleEnum } from "@/enums/RoleEnum";

const page = async ({
  params: { medicinesId },
}: {
  params: { medicinesId: number };
}) => {
  const t = await getTranslations("common.medicine.create");

  const medicines = (
    await MedicineService.make<MedicineService>(RoleEnum.ADMIN).show(
      medicinesId,
    )
  ).data;

  return (
    <PageCard>
      <h2 className="card-title">{t("editMedicine")}</h2>
      <MedicineForm type={"update"} defaultValues={medicines} />
    </PageCard>
  );
};

export default page;
