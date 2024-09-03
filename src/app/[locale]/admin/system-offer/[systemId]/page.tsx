import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import { Link } from "@/navigation";
import Grid from "@/components/common/ui/Grid";
import { SystemOffersService } from "@/services/SystemOffersService";
import { SystemOffers } from "@/Models/SystemOffer";
import Gallery from "@/components/common/ui/Gallery";
import ClinicTable from "@/components/admin/system-offer/ClinicTable";
import {getTranslations} from "next-intl/server";

const page = async ({
  params: { systemId },
}: {
  params: { systemId: number };
}) => {
  const t = await getTranslations("admin.system.show")
  const data =
    await SystemOffersService.make<SystemOffersService>().show(systemId);
  const res: SystemOffers = data?.data;
  const clinics = res.clinics;
  return (
    <PageCard>
      <div className="flex justify-between items-center w-full h-24">
        <h2 className="card-title">{t("offerDetails")}</h2>
        <Link href={`/admin/system-offer/${systemId}/edit`}>
          <PrimaryButton type={"button"}>{t("editBtn")}</PrimaryButton>
        </Link>
      </div>
      <Grid md={2} gap={5}>
        <label className="label justify-start text-xl">
          {t("title")} :{" "}
          <span className="ml-2 badge badge-outline  ">{res?.title}</span>
        </label>
        <label className="label justify-start text-xl">
          {t("type")} :{" "}
          <span className="ml-2 badge badge-success  ">{res?.type}</span>
        </label>
        <label className="label justify-start text-xl">
          {t("amount")} :{" "}
          <span className="ml-2 badge badge-ghost  ">{res?.amount}</span>
        </label>
        <label className="label justify-start text-xl">
          {t("alowedUses")} :{" "}
          <span className="ml-2 badge badge-ghost  ">{res?.allowed_uses}</span>
        </label>
        <label className="label justify-start text-xl">
          {t("reuse")} :{" "}
          <span className="ml-2 badge badge-ghost  ">
            {res?.allow_reuse ? t("allowReuse") : t("notAllowReuse")}
          </span>
        </label>
        <label className="label justify-start text-xl">
          {t("startDate")} :{" "}
          <span className="ml-2 badge badge-accent  ">{res?.from}</span>
        </label>
        <label className="label justify-start text-xl">
          {t("endDate")} :{" "}
          <span className="ml-2 badge badge-accent  ">{res?.to}</span>
        </label>
      </Grid>
      <label className={"label text-xl"}>{t("description")} :</label>
      <textarea
        className="textarea textarea-bordered h-24 w-full"
        disabled={true}
        defaultValue={res?.description ?? "No Data"}
      />
      {res?.image?.length != 0 ? (
        <Gallery media={res?.image ? res?.image : []} />
      ) : (
        <div className="flex items-center">
          <label className="label"> {t("image")} : </label>
          <span className="text-lg badge badge-neutral">No Data</span>
        </div>
      )}
      <hr className={"my-4"} />
      <ClinicTable id={systemId} />
    </PageCard>
  );
};

export default page;