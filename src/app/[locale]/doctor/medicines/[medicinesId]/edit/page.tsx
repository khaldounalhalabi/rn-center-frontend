import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import { MedicineService } from "@/services/MedicinesSevice";
import MedicinesForm from "@/components/common/Medicine/MedicinesForm";

const page = async ({
  params: { medicinesId },
}: {
  params: { medicinesId: number };
}) => {
  const medicines = (
    await MedicineService.make<MedicineService>("doctor").show(medicinesId)
  ).data;

  return (
    <PageCard>
      <h2 className="card-title">Edit Medicine</h2>
      <MedicinesForm
        typePage={"doctor"}
        type={"update"}
        defaultValues={{
          ...medicines,
        }}
      />
    </PageCard>
  );
};

export default page;