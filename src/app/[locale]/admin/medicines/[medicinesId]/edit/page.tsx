import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import { MedicineService } from "@/services/MedicinesSevice";
import MedicinesForm from "@/components/common/Medicine/MedicinesForm";
import { getTranslations } from "next-intl/server";

const page = async ({
  params: { medicinesId },
}: {
  params: { medicinesId: number };
}) => {
  const t = await getTranslations("common.medicine.create");

  const medicines = (
    await MedicineService.make<MedicineService>("admin").show(medicinesId)
  ).data;

  return (
    <PageCard>
      <h2 className="card-title">{t("editMedicine")}</h2>
      <MedicinesForm
        type={"update"}
        defaultValues={{
          ...medicines,
        }}
      />
    </PageCard>
  );
};

export default page;
