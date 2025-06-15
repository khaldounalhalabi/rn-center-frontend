"use server";
import Grid from "@/components/common/ui/Grid";
import PageCard from "@/components/common/ui/PageCard";
import { LabelValue } from "@/components/common/ui/labels-and-values/LabelValue";
import TranslatableEnum from "@/components/common/ui/labels-and-values/TranslatableEnum";
import { Button } from "@/components/ui/shadcn/button";
import { User } from "@/models/User";
import { Link } from "@/navigation";
import dayjs from "dayjs";
import { getTranslations } from "next-intl/server";
import React from "react";
import { Label } from "../ui/labels-and-values/Label";
import { Value } from "../ui/labels-and-values/Value";

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

        {user?.permissions ? (
          <Label label={"Permissions"} col>
            {user.permissions.map((p, index) => (
              <Value value={p} key={index} />
            ))}
          </Label>
        ) : (
          ""
        )}
      </Grid>
      {children}
    </PageCard>
  );
};

export default UserDataView;
