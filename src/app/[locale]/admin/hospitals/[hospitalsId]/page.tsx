import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import { Link } from "@/navigation";
import { HospitalService } from "@/services/HospitalService";
import { Hospital } from "@/Models/Hospital";
import { Department } from "@/Models/Departments";
import { Phone } from "@/Models/Phone";
import Grid from "@/components/common/ui/Grid";
import Gallery from "@/components/common/ui/Gallery";
import MapIFrame from "@/components/common/ui/MapIFrame";
import { getTranslations } from "next-intl/server";
import TranslateServer from "@/Helpers/TranslationsServer";

const page = async ({
  params: { hospitalsId },
}: {
  params: { hospitalsId: number };
}) => {
  const t = await getTranslations("admin.hospitals.show");
  const data = await HospitalService.make<HospitalService>().show(hospitalsId);
  const res: Hospital = data?.data;
  return (
    <PageCard>
      <div className="flex justify-between items-center w-full h-24 ">
        <h2 className="card-title">{t("hospitalDetails")}</h2>
        <Link href={`/admin/hospitals/${hospitalsId}/edit`}>
          <PrimaryButton type={"button"}>{t("editBtn")}</PrimaryButton>
        </Link>
      </div>
      <Grid md={2} gap={5}>
        <label className="label">
          {t("hospitalName")} EN:{" "}
          <span className="bg-base-200 px-2 rounded-xl text-lg">
            {(await TranslateServer(res?.name, true))?.en}
          </span>
        </label>
        <label className="label">
          {t("hospitalName")} AR:{" "}
          <span className="bg-base-200 px-2 rounded-xl text-lg">
            {(await TranslateServer(res?.name, true)).ar}
          </span>
        </label>
        <label className="flex flex-wrap items-center gap-2 w-full label">
          {t("phones")} :
          {res?.phones?.length != 0 ? (
            res?.phones?.map((phone: Phone, index: number) => (
              <span key={index} className="badge badge-neutral">
                {phone.phone}
              </span>
            ))
          ) : (
            <span className="text-lg badge badge-neutral">No Phones</span>
          )}
        </label>
        <label className="flex flex-wrap items-center gap-2 w-full label">
          {t("departments")} :
          {res?.available_departments?.length != 0 ? (
            res?.available_departments?.map((e: Department, index: number) => {
              return (
                <span key={index} className="badge badge-accent">
                  {TranslateServer(e.name)}
                </span>
              );
            })
          ) : (
            <span className="text-lg badge badge-neutral">
              {t("noDepartments")}
            </span>
          )}
        </label>

        <label className="flex flex-wrap items-center gap-2 w-full label">
          {t("address")} :
          {res?.address?.name ? (
            <span className="badge badge-accent">
              {await TranslateServer(res?.address?.name)}
            </span>
          ) : (
            <span className="text-lg badge badge-neutral">{t("noData")}</span>
          )}
        </label>
        <label className="flex flex-wrap items-center gap-2 w-full label">
          {t("city")} :
          {res?.address?.city ? (
            <span className="badge badge-accent">
              {`${await TranslateServer(res?.address?.city.name)}`}
            </span>
          ) : (
            <span className="text-lg badge badge-neutral">{t("noData")}</span>
          )}
        </label>
        <label className="flex flex-wrap items-center gap-2 w-full label">
          {t("status")} :
          {res?.status ? (
            <span className="badge badge-accent">{res.status}</span>
          ) : (
            <span className="text-lg badge badge-neutral">{t("noData")}</span>
          )}
        </label>
      </Grid>
      <div className={"w-full"}>
        {res?.images?.length != 0 ? (
          <Gallery media={res?.images ? res?.images : [""]} />
        ) : (
          <div className="flex justify-between items-center">
            <label className="label"> {t("image")} : </label>
            <span className="text-lg badge badge-neutral">{t("noData")}</span>
          </div>
        )}
      </div>
      <div className={"w-full"}>
        <MapIFrame iframe={res?.address?.map_iframe} />
      </div>
    </PageCard>
  );
};

export default page;
