"use server";
import { User } from "@/Models/User";
import { getTranslations } from "next-intl/server";
import PageCard from "@/components/common/ui/PageCard";
import { LabelValue } from "@/components/common/ui/LabelsValues/LabelValue";
import { Link } from "@/navigation";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import Grid from "@/components/common/ui/Grid";
import React from "react";

const UserDataView = async ({
  editUrl,
  user,
  children,
}: {
  editUrl?: string;
  user?: User;
  children?: React.ReactNode;
}) => {
  const t = await getTranslations("details");
  return (
    <PageCard>
      <div className="flex justify-between items-center w-full h-fit">
        <div className={"flex flex-col items-center justify-between"}>
          <h2 className="card-title ">
            {t("name")} : {user?.full_name}
          </h2>
          <LabelValue label={t("phone")} value={user?.phone} />
        </div>
        {editUrl && (
          <Link href={editUrl}>
            <PrimaryButton type={"button"}>{t("editBtn")}</PrimaryButton>
          </Link>
        )}
      </div>
      <hr />
      <Grid>
        <LabelValue
          label={t("first-Name")}
          value={user?.first_name}
          color={"secondary"}
        />
        <LabelValue
          label={t("last-name")}
          value={user?.last_name}
          color={"error"}
        />
        <LabelValue
          label={t("phone_verified_at")}
          value={user?.phone_verified_at}
          color={"title"}
        />
        <LabelValue
          label={t("gender")}
          value={user?.gender}
          color={"warning"}
        />
      </Grid>
      {children}
    </PageCard>
  );
};

export default UserDataView;
