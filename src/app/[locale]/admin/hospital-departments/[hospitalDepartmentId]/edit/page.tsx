import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import {AvailableDepartmentService} from "@/services/AvailableDepartmentService";
import DepartmentForm from "@/components/admin/department/DepartmentForm";

const page = async ({
  params: { hospitalDepartmentId },
}: {
  params: { hospitalDepartmentId: number };
}) => {
  const medicines = (
    await AvailableDepartmentService.make<AvailableDepartmentService>("admin").show(hospitalDepartmentId)
  ).data;

  return (
    <PageCard>
      <h2 className="card-title">Edit Department</h2>
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