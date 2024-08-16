import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import DepartmentForm from "@/components/admin/department/DepartmentForm";

const page = async () => {
  return (
    <PageCard>
      <h2 className="card-title">Add Hospital Department</h2>
      <DepartmentForm />
    </PageCard>
  );
};

export default page;
