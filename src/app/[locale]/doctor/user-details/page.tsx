import { User } from "@/Models/User";
import PageCard from "@/components/common/ui/PageCard";
import { Link } from "@/navigation";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import React from "react";
import { getMedia } from "@/Models/Media";
import RoundedImage from "@/components/common/RoundedImage";
import TranslateServer from "@/Helpers/TranslationsServer";
import Grid from "@/components/common/ui/Grid";
import { AuthService } from "@/services/AuthService";
import { getTranslations } from "next-intl/server";
import { LabelValue } from "@/components/common/ui/LabelsValues/LabelValue";

const page = async () => {
  const t = await getTranslations("details");

  const data = await AuthService.make<AuthService>("doctor").GetUserDetails();
  const res: User = data.data;
  return (
    <PageCard>
      <div className="flex justify-between items-center  w-full h-24">
        <div className={"flex justify-center"}>
          <RoundedImage
            src={getMedia(res?.image?.[0] ?? undefined)}
            alt={"doctor-profile"}
            className={"w-24 h-24"}
          />
          <h2 className="card-title mx-2">
            {" "}
            {await TranslateServer(res.first_name)}{" "}
            {await TranslateServer(res.middle_name)}{" "}
            {await TranslateServer(res.last_name)}
          </h2>
        </div>

        <Link href={`/doctor/user-details/edit`}>
          <PrimaryButton type={"button"}>{t("editBtn")}</PrimaryButton>
        </Link>
      </div>
      <hr />
      <div className="w-full flex my-4 h-40">
        <Grid md={2}>
          <LabelValue
            label={t("birthDate")}
            value={res?.birth_date}
            color={"accent"}
          />
          <LabelValue label={t("gender")} value={res?.gender} color={"error"} />
          <LabelValue label={t("email")} value={res?.email} />
          <LabelValue label={t("age")} value={res?.age} color={"warning"} />
          <LabelValue
            label={t("blood")}
            value={res?.blood_group}
            color={"success"}
          />
        </Grid>
      </div>
    </PageCard>
  );
};

export default page;
