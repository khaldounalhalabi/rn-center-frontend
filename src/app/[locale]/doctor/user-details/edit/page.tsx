import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import { AuthService } from "@/services/AuthService";
import { getTranslations } from "next-intl/server";
import { getRole } from "@/actions/HelperActions";
import UserDetailsForm from "@/components/common/auth/UserDetailsForm";

const page = async () => {
  const role = await getRole();
  const user = (await AuthService.make(role).userDetails()).data;
  const t = await getTranslations("details");
  return (
    <PageCard title={t("editUserDetails")}>
      <UserDetailsForm
        defaultValues={{
          ...user,
        }}
      />
    </PageCard>
  );
};

export default page;
