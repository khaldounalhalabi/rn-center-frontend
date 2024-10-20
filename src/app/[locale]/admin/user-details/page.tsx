import { User } from "@/Models/User";
import PageCard from "@/components/common/ui/PageCard";
import { Link } from "@/navigation";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import React from "react";
import { getMedia } from "@/Models/Media";
import RoundedImage from "@/components/common/RoundedImage";
import TranslateServer from "@/Helpers/TranslationsServer";
import MapIFrame from "@/components/common/ui/MapIFrame";
import Grid from "@/components/common/ui/Grid";
import { AuthService } from "@/services/AuthService";
import { getTranslations } from "next-intl/server";

const page = async () => {
  const data = await AuthService.make<AuthService>("admin").GetUserDetails();
  const res: User = data.data;
  const t = await getTranslations("details");
  return (
    <PageCard>
      <div className="flex justify-between items-center  w-full h-fit">
        <div className={"flex items-center justify-between"}>
          <RoundedImage
              src={getMedia(res?.image?.[0] ?? undefined)}
              alt={"doctor-profile"}
              className={"w-24 self-center md:self-start h-24"}
          />
          <h2 className="card-title ">
            {t("name")} : {await TranslateServer(res.first_name)}{" "}
            {await TranslateServer(res.middle_name)}{" "}
            {await TranslateServer(res.last_name)}
          </h2>
        </div>
        <Link href={`/admin/user-details/edit`}>
          <PrimaryButton type={"button"}>{t("editBtn")}</PrimaryButton>
        </Link>
      </div>
      <hr />
      <div className="w-full flex flex-col gap-3 md:flex-row my-4 h-fit">
        <div
          className={
            "md:w-1/2 w-full flex flex-col gap-3 h-full justify-between"
          }
        >
          <h2>
            {t("email")} :{" "}
            <span className="badge badge-accent">{res?.email}</span>
          </h2>
          <h2>
            {t("birthDate")} :{" "}
            <span className="badge badge-outline">{res?.birth_date}</span>
          </h2>
        </div>
        <div className="md:w-1/2 w-full gap-3  flex flex-col h-full justify-between">
          <div className="flex ">
            <h1>{t("phone")} : </h1>
            <div className={"flex flex-col"}>
              {res?.phones?.length != 0 ? (
                res?.phones?.map((e, index) => {
                  return (
                    <span
                      key={index}
                      className={"badge ml-3 mt-1 badge-neutral"}
                    >
                      {e.phone}
                    </span>
                  );
                })
              ) : (
                <span className="badge ml-3 mt-1 badge-neutral">No Data</span>
              )}
            </div>
          </div>
          <h2>
            {t("gender")} :{" "}
            <span className="badge ml-3 mt-1 badge-warning">{res?.gender}</span>
          </h2>
          <h2>
            {t("isBlocked")} :{" "}
            <span className="badge ml-3 mt-1 badge-success">
              {res?.is_blocked ? t("blocked") : t("notBlocked")}
            </span>
          </h2>
        </div>
      </div>
      <hr />
      <div className={"w-full  my-4"}>
        <div className={"h-2/3 flex flex-col justify-between"}>
          <Grid md={"2"} className={" justify-between h-52"}>
            <h2>
              {t("age")} : <span className="badge badge-info">{res?.age}</span>
            </h2>
            <h2>
              {t("blood")} :{" "}
              <span className="badge ml-3 mt-1 badge-warning">
                {res?.blood_group ?? "No Data"}
              </span>
            </h2>
            <h2>
              {t("isArchived")} :{" "}
              <span className="badge ml-3 mt-1 badge-success">
                {res?.is_archived ? t("archived") : t("notArchived")}
              </span>
            </h2>
            <h2>
              {t("city")} :{" "}
              <span className="badge ml-3 mt-1 badge-primary">
                {await TranslateServer(res?.address?.city?.name)}
              </span>
            </h2>
            <h2>
              {t("address")} :{" "}
              <span className="badge ml-3 mt-1 badge-accent">
                {await TranslateServer(res?.address?.name)}
              </span>
            </h2>
          </Grid>
        </div>

        <div className={"h-1/3"}>
          <MapIFrame iframe={res?.address?.map_iframe} />
        </div>
      </div>
    </PageCard>
  );
};

export default page;
