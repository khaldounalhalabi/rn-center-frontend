"use server";
import { User } from "@/models/User";
import { getTranslations } from "next-intl/server";
import PageCard from "@/components/common/ui/PageCard";
import { LabelValue } from "@/components/common/ui/labels-and-values/LabelValue";
import { Link } from "@/navigation";
import Grid from "@/components/common/ui/Grid";
import React from "react";
import TranslatableEnum from "@/components/common/ui/labels-and-values/TranslatableEnum";
import { Button } from "@/components/ui/shadcn/button";

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
    <PageCard
      actions={
        editUrl && (
          <Link href={editUrl}>
            <Button type={"button"}>{t("editBtn")}</Button>
          </Link>
        )
      }
      title={`${user?.full_name}`}
      description={user?.phone}
    >
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
          value={<TranslatableEnum value={user?.gender} />}
          color={"warning"}
        />
      </Grid>
      {children}
    </PageCard>
  );
};

export default UserDataView;
