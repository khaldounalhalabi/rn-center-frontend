import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import { getTranslations } from "next-intl/server";
import StaffForm from "@/components/doctor/staff/StaffForm";

const page = async () => {
  const t = await getTranslations("doctor.staff.create");

  return (
    <PageCard>
      <h2 className="card-title">{t("addStaff")}</h2>
      <StaffForm />
    </PageCard>
  );
};

export default page;
