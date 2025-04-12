import { User } from "@/Models/User";
import React from "react";
import { AuthService } from "@/services/AuthService";
import { getRole } from "@/Actions/HelperActions";
import UserDetails from "@/components/common/Auth/UserDetails";

const page = async () => {
  const role = await getRole();
  const data = await AuthService.make<AuthService>(role).userDetails();
  const user: User = data.data;
  return <UserDetails user={user} />;
};

export default page;
