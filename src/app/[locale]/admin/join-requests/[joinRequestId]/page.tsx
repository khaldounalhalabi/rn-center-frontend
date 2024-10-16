import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import { getTranslations } from "next-intl/server";
import { JoinRequestService } from "@/services/JoinRequestService";
import Grid from "@/components/common/ui/Grid";
import { LabelValue } from "@/components/common/ui/LabelsValues/LabelValue";
import TranslateServer from "@/Helpers/TranslationsServer";

const Page = async ({
  params: { joinRequestId },
}: {
  params: { joinRequestId: number };
}) => {
  const t = await getTranslations("join_requests");
  const joinRequest = (
    await JoinRequestService.make<JoinRequestService>().show(joinRequestId)
  ).data;
  return (
    <PageCard>
      <div className="flex justify-between items-center w-full h-24">
        <h2 className="card-title">
          {t("join_request")} : {joinRequest.doctor_name}
        </h2>
      </div>
      <Grid>
        <LabelValue
          label={t("doctor_name")}
          value={joinRequest?.doctor_name}
          color={"warning"}
        />
        <LabelValue
          label={t("clinic_name")}
          value={joinRequest?.clinic_name}
          color={"error"}
        />
        <LabelValue
          label={t("phone")}
          value={joinRequest?.phone_number}
          color={"info"}
        />
        <LabelValue
          label={t("city")}
          value={await TranslateServer(joinRequest?.city?.name)}
          color={"accent"}
        />
      </Grid>
    </PageCard>
  );
};

export default Page;
