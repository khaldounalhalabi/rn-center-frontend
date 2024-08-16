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
        <label className="label justify-start text-xl">
          {t("cost")} :{" "}
          <span className="ml-2 badge badge-error" suppressHydrationWarning>
            {res.clinic?.appointment_cost.toLocaleString()} IQD
          </span>
        </label>
        <label className="label justify-start text-xl">
          {t("title")} :{" "}
          <span className="ml-2 badge badge-outline  ">
            {await TranslateServer(res?.title)}
          </span>
        </label>
        <label className="label justify-start text-xl">
          {t("isActive")} :{" "}
          {res?.is_active ? (
            <span className="ml-2 badge badge-neutral">{t("active")}</span>
          ) : (
            <span className="ml-2 badge badge-warning">{t("not-active")}</span>
          )}
        </label>
        <label className="label justify-start text-xl">
          {t("type")} :{" "}
          <span className="ml-2 badge badge-success  ">{res?.type}</span>
        </label>
        <label className="label justify-start text-xl">
          {t("value")} :{" "}
          <span className="ml-2 badge badge-ghost  ">
            {res?.value} {res?.type == "percentage" ? "%" : "IQD"}
          </span>
        </label>
        <label className="label justify-start text-xl">
          {t("startDate")} :{" "}
          <span className="ml-2 badge badge-accent  ">{res?.start_at}</span>
        </label>
        <label className="label justify-start text-xl">
          {t("endDate")} :{" "}
          <span className="ml-2 badge badge-accent  ">{res?.end_at}</span>
        </label>
      </Grid>
      <label className={"label text-xl"}>{t("note")} :</label>
      <textarea
        className="textarea textarea-bordered h-24 w-full"
        disabled={true}
        defaultValue={await TranslateServer(res?.note)}
      />
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
