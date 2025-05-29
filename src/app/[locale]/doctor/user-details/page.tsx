import { User } from "@/models/User";
import React from "react";
import { AuthService } from "@/services/AuthService";
import { getRole } from "@/actions/HelperActions";
import UserDataView from "@/components/common/user/UserDataView";

const page = async () => {
  const role = await getRole();
  const data = await AuthService.make(role).userDetails();
  const user: User = data.data;
  return <UserDataView user={user} editUrl={`/${role}/user-details/edit`} />;
};

export default page;
