import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import { Link } from "@/navigation";
import Grid from "@/components/common/ui/Grid";
import { OffersService } from "@/services/OffersService";
import { Offers } from "@/Models/Offers";
import TranslateServer from "@/Helpers/TranslationsServer";
import Gallery from "@/components/common/ui/Gallery";
import { getTranslations } from "next-intl/server";
import { LabelValue } from "@/components/common/ui/LabelsValues/LabelValue";
import { Label } from "@/components/common/ui/LabelsValues/Label";
import { Value } from "@/components/common/ui/LabelsValues/Value";

const page = async ({
  params: { offerId },
}: {
  params: { offerId: number };
}) => {
  const t = await getTranslations("doctor.offer.show");

  const data = await OffersService.make<OffersService>("doctor").show(offerId);
  const res: Offers = data?.data;

  return (
    <PageCard>
      <div className="flex justify-between items-center w-full h-24">
        <h2 className="card-title">{t("offerDetails")}</h2>
        <Link href={`/doctor/offer/${offerId}/edit`}>
          <PrimaryButton type={"button"}>{t("editBtn")}</PrimaryButton>
        </Link>
      </div>
      <Grid md={2} gap={5}>
        <LabelValue
          label={t("cost")}
          value={`${res.clinic?.appointment_cost.toLocaleString()} IQD`}
          color={"error"}
        />

        <LabelValue
          label={t("title")}
          value={await TranslateServer(res?.title)}
          color={"primary"}
        />

        <Label label={t("isActive")}>
          {res?.is_active ? (
            <Value color="neutral">{t("active")}</Value>
          ) : (
            <Value color="warning">{t("not-active")}</Value>
          )}
        </Label>

        <LabelValue label={t("type")} value={res?.type} color={"success"} />

        <LabelValue
          label={t("value")}
          value={`${res?.value} ${res?.type == "percentage" ? "%" : "IQD"}`}
          color={"primary"}
        />

        <LabelValue
          label={t("startDate")}
          value={res?.start_at}
          color={"info"}
        />

        <LabelValue label={t("endDate")} value={res?.end_at} color={"accent"} />
      </Grid>
      <Label label={t("note")}>
        <textarea
          className="textarea textarea-bordered text-sm"
          disabled={true}
          defaultValue={await TranslateServer(res?.note)}
        />
      </Label>

      <div className={"col-span-2"}>
        {res?.image?.length != 0 ? (
          <Gallery media={res?.image ? res?.image : []} />
        ) : (
          <div className="flex items-center">
            <label className="label"> Image : </label>
            <span className="text-lg badge badge-neutral">No Data</span>
          </div>
        )}
      </div>
    </PageCard>
  );
};

export default page;
