import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import UserDetailsForm from "@/components/admin/userDetails/UserDetailsForm";
import { AuthService } from "@/services/AuthService";
import {getTranslations} from "next-intl/server";

const page = async () => {
  const UserDetails = (
    await AuthService.make<AuthService>("admin").GetUserDetails()
  ).data;
  const t = await getTranslations("details")
  return (
    <PageCard>
      <h2 className="card-title">{t("editUserDetails")}</h2>
      <UserDetailsForm
        defaultValues={{
          ...UserDetails,
        }}
      />
    </PageCard>
  );
};

export default page;