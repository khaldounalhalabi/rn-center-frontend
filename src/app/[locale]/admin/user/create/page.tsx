import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import UserForm from "@/components/admin/users/UserForm";

const page = async () => {
  return (
    <PageCard>
      <h2 className="card-title">Add User</h2>
      <UserForm />
    </PageCard>
  );
};

export default page;
