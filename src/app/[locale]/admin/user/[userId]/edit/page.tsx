import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import { UsersService } from "@/services/UsersService";
import UserForm from "@/components/admin/users/UserForm";

const page = async ({ params: { userId } }: { params: { userId: number } }) => {
  const user = (await UsersService.make<UsersService>("admin").show(userId))
    .data;

  const defaultUser = {
    phone_numbers: user?.phones.map((ph) => ph.phone),
    ...user,
  };

  return (
    <PageCard>
      <h2 className="card-title">Edit User</h2>
      <UserForm
        type={"update"}
        defaultValues={{
          ...defaultUser,
        }}
      />
    </PageCard>
  );
};

export default page;
