import { User } from "@/Models/User";
import React from "react";
import { AuthService } from "@/services/AuthService";
import { getRole } from "@/Actions/HelperActions";
import UserDataView from "@/components/common/User/UserDataView";

const page = async () => {
  const role = await getRole();
  const data = await AuthService.make<AuthService>(role).userDetails();
  const user: User = data.data;
  return <UserDataView user={user} editUrl={`/${role}/user-details/edit`} />;
};

export default page;
