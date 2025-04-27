import React from "react";
import PageCard from "@/components/common/ui/PageCard";
import { getTranslations } from "next-intl/server";
import { PrescriptionService } from "@/services/PrescriptionsServise";
import PrescriptionDetails from "@/components/common/prescriptions/PrescriptionDetails";

const Page = async ({
  params: { prescriptionId },
}: {
  params: { prescriptionId: number };
}) => {
  const t = await getTranslations("common.prescription.show");
  const prescription = (await PrescriptionService.make().show(prescriptionId))
    ?.data;
  return (
    <PageCard>
      <div className="flex justify-between items-center w-full h-24">
        <h2 className="card-title">{t("prescriptionsDetails")}</h2>
      </div>
      <PrescriptionDetails prescription={prescription} />
    </PageCard>
  );
};

export default Page;
