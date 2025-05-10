import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import { AuthService } from "@/services/AuthService";
import { getTranslations } from "next-intl/server";
import { getRole } from "@/Actions/HelperActions";
import UserDetailsForm from "@/components/common/auth/UserDetailsForm";

const page = async () => {
  const role = await getRole();
  const user = (await AuthService.make<AuthService>(role).userDetails()).data;
  const t = await getTranslations("details");
  return (
    <PageCard>
      <h2 className="card-title">{t("editUserDetails")}</h2>
      <UserDetailsForm
        defaultValues={{
          ...user,
        }}
      />
    </PageCard>
  );
};

export default page;
