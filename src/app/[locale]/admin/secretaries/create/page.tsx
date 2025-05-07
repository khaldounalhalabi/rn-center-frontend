import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import { getTranslations } from "next-intl/server";
import UserForm from "@/components/common/User/UserForm";

const Page = async () => {
  const t = await getTranslations("details");
  return (
    <PageCard>
      <h2 className="card-title">{t("editUserDetails")}</h2>
      <UserForm type={"store"} />
    </PageCard>
  );
};

export default Page;