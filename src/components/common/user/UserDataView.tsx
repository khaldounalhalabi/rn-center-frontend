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
import dayjs from "dayjs";

const UserDataView = async ({
  editUrl,
  user,
  children,
  actions = undefined,
}: {
  editUrl?: string;
  user?: User;
  children?: React.ReactNode;
  actions?: React.ReactNode;
}) => {
  const t = await getTranslations("details");
  return (
    <PageCard
      actions={
        <div className={"flex items-center gap-2"}>
          {editUrl && (
            <Link href={editUrl}>
              <Button type={"button"}>{t("editBtn")}</Button>
            </Link>
          )}
          {actions}
        </div>
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
          value={
            user?.phone_verified_at
              ? dayjs(user?.phone_verified_at)?.format("YYYY-MM-DD HH:mm")
              : undefined
          }
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
