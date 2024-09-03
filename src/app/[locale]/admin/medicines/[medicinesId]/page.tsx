import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import { Link } from "@/navigation";
import Grid from "@/components/common/ui/Grid";
import { MedicineService } from "@/services/MedicinesSevice";
import { Medicine } from "@/Models/Medicines";
import TranslateServer from "@/Helpers/TranslationsServer";
import {getTranslations} from "next-intl/server";

const page = async ({
  params: { medicinesId },
}: {
  params: { medicinesId: number };
}) => {
    const t =await getTranslations('common.medicine.show')

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
        <label className="label">
          {t("medicineName")}
          <span className="bg-base-200 px-2 rounded-xl text-lg">
            {res?.name}
          </span>
        </label>
        <label className="label">
          {t("clinicName")}
          <span className="badge-primary px-2 rounded-xl text-lg">
            {await TranslateServer(res?.clinic?.name)}
          </span>
        </label>
      </Grid>

      <div className="w-full">
        <label className="label">{t("description")} :</label>
        <textarea
          className="w-full p-2"
          disabled={true}
          defaultValue={res?.description ?? ""}
        ></textarea>
      </div>
    </PageCard>
  );
};

export default page;