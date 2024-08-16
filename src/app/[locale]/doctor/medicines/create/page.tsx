import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import MedicinesForm from "@/components/common/Medicine/MedicinesForm";
import { getTranslations } from "next-intl/server";

const page = async () => {
  const t = await getTranslations("common.medicine.create");

  return (
    <PageCard>
      <h2 className="card-title">{t("addMedicines")}</h2>
      <MedicinesForm typePage={"doctor"} />
    </PageCard>
  );
};

export default page;
