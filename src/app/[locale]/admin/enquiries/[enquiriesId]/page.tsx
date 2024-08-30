import PageCard from "@/components/common/ui/PageCard";
import React from "react";

import Grid from "@/components/common/ui/Grid";
import { EnquiriesService } from "@/services/EnquiriesService";
import { Enquiries } from "@/Models/Enquiries";
import {getTranslations} from "next-intl/server";

const page = async ({
  params: { enquiriesId },
}: {
  params: { enquiriesId: number };
}) => {
    const t = await getTranslations("admin.enquiries")
  const data =
    await EnquiriesService.make<EnquiriesService>().show(enquiriesId);
  const res: Enquiries = data?.data;
  return (
    <PageCard>
      <div className="flex justify-between items-center w-full h-24">
        <h2 className="card-title">{t("enquiriesDetails")}</h2>
      </div>
      <Grid md={2} gap={5}>
        <label className="label">
          {t("name")} :
          <span className="bg-base-200 px-2 rounded-xl text-lg">
            {res?.name}
          </span>
        </label>
        <label className="label">
          {t("email")} :
          <span className="badge badge-success px-2 rounded-xl text-lg">
            {res?.email}
          </span>
        </label>
      </Grid>
      <label className="label">{t("message")}</label>
      <textarea
        defaultValue={res?.message}
        className={"textarea"}
        disabled={true}
      />
    </PageCard>
  );
};

export default page;