import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import { Link } from "@/navigation";
import Grid from "@/components/common/ui/Grid";
import { BloodDonationService } from "@/services/BloodDonationService";
import TranslateServer from "@/Helpers/TranslationsServer";
import { BloodDonation } from "@/Models/BloodDonation";
import {getTranslations} from "next-intl/server";

const page = async ({
  params: { bloodId },
}: {
  params: { bloodId: number };
}) => {
  const t = await getTranslations("admin.blood")
  const data =
    await BloodDonationService.make<BloodDonationService>().show(bloodId);
  const res: BloodDonation = data?.data;
  return (
    <PageCard>
      <div className="flex justify-between items-center w-full h-24">
        <h2 className="card-title">{t("bloodDonationRequestDetails")}</h2>
        <Link href={`/admin/blood-donation/${bloodId}/edit`}>
          <PrimaryButton type={"button"}>{t("editBtn")}</PrimaryButton>
        </Link>
      </div>
      <Grid md={2} gap={5}>
        <label className="label">
          {t("name")} :
          <span className="bg-base-200 px-2 rounded-xl text-lg">
            {res?.full_name}
          </span>
        </label>
        <label className="label">
          {t("blood")} :
          <span className="badge badge-success px-2 rounded-xl text-lg">
            {res?.blood_group}
          </span>
        </label>
        <label className="label">
          {t("canWait")} :
          <span className="badge badge-outline px-2 rounded-xl text-lg">
            {res?.can_wait_until}
          </span>
        </label>
        <label className="label">
          {t("phone")} :
          <span className="badge badge-primary px-2 rounded-xl text-lg">
            {res?.contact_phone}
          </span>
        </label>
        <label className="label">
          {t("nearestHospital")} :
          <span className="badge badge-neutral px-2 rounded-xl text-lg">
            {res?.nearest_hospital}
          </span>
        </label>
        <label className="label">
          {t("address")} :
          <span className="badge badge-accent px-2 rounded-xl text-lg">
            {res?.address}
          </span>
        </label>
        <label className="label">
          {t("city")} :
          <span className="badge badge-info px-2 rounded-xl text-lg">
            {await TranslateServer(res?.city?.name)}
          </span>
        </label>
      </Grid>
      <label className={"label"}>{t("notes")} :</label>
      <textarea defaultValue={res?.notes ?? "No Data"} disabled={true} />
    </PageCard>
  );
};

export default page;