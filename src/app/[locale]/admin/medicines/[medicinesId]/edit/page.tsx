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
    await MedicineService.make(RoleEnum.ADMIN).show(
      medicinesId,
    )
  ).data;

  return (
    <PageCard title={t("editMedicine")}>
      <MedicineForm type={"update"} defaultValues={medicines} />
    </PageCard>
  );
};

export default page;
