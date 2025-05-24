import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import { getTranslations } from "next-intl/server";
import UserForm from "@/components/common/user/UserForm";
import { RoleEnum } from "@/enums/RoleEnum";

const Page = async () => {
  const t = await getTranslations("details");
  return (
    <PageCard title={t("editUserDetails")}>
      <UserForm type={"store"} role={RoleEnum.SECRETARY} />
    </PageCard>
  );
};

export default Page;
