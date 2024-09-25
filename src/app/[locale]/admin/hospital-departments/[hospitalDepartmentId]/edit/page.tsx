import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import { AvailableDepartmentService } from "@/services/AvailableDepartmentService";
import DepartmentForm from "@/components/admin/department/DepartmentForm";
import { getTranslations } from "next-intl/server";

const page = async ({
  params: { hospitalDepartmentId },
}: {
  params: { hospitalDepartmentId: number };
}) => {
  const medicines = (
    await AvailableDepartmentService.make<AvailableDepartmentService>(
      "admin",
    ).show(hospitalDepartmentId)
  ).data;
  const t = await getTranslations("admin.departments");

  return (
    <PageCard>
      <h2 className="card-title">{t("editDepartment")}</h2>
      <DepartmentForm
        type={"update"}
        defaultValues={{
          ...medicines,
        }}
      />
    </PageCard>
  );
};

export default page;
