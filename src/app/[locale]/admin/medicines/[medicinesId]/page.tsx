import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import { Link } from "@/navigation";
import Grid from "@/components/common/ui/Grid";
import { MedicineService } from "@/services/MedicinesSevice";
import { Medicine } from "@/Models/Medicine";
import { getTranslations } from "next-intl/server";
import { LabelValue } from "@/components/common/ui/LabelsValues/LabelValue";
import TranslatableEnum from "@/components/common/ui/TranslatableEnum";

const page = async ({
  params: { medicinesId },
}: {
  params: { medicinesId: number };
}) => {
  const t = await getTranslations("common.medicine.show");

  const data = await MedicineService.make<MedicineService>().show(medicinesId);
  const res: Medicine = data?.data;
  return (
    <PageCard>
      <div className="flex justify-between items-center w-full h-24">
        <h2 className="card-title">{t("medicinesDetails")}</h2>
        <Link href={`/admin/medicines/${medicinesId}/edit`}>
          <PrimaryButton type={"button"}>{t("editBtn")}</PrimaryButton>
        </Link>
      </div>
      <Grid md={2} gap={5}>
        <LabelValue label={t("medicineName")} value={res?.name} />
        <LabelValue
          label={t("status")}
          value={<TranslatableEnum value={res?.status} />}
        />
        <LabelValue label={t("quantity")} value={res?.quantity} />
        <LabelValue label={t("barcode_value")} value={res?.barcode} />
        <div className={"md:col-span-2"}>
          <LabelValue label={t("description")} col value={res?.description} />
        </div>
      </Grid>
    </PageCard>
  );
};

export default page;
