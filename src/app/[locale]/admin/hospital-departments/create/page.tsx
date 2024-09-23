import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import DepartmentForm from "@/components/admin/department/DepartmentForm";
import { getTranslations } from "next-intl/server";

const page = async () => {
  const t = await getTranslations("admin.departments");

  return (
    <PageCard>
      <h2 className="card-title">{t("addHospitalDepartment")}</h2>
      <DepartmentForm />
    </PageCard>
  );
};

export default page;
