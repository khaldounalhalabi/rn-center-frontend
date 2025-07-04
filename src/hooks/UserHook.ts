"use client";
import { UserContext } from "@/components/providers/UserProvider";
import PermissionEnum from "@/enums/PermissionEnum";
import { useContext } from "react";

const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("Cannot Use User Hook Outside Of User Provider", {
      cause:
        "This is caused because you are using the user hook in a component that isn't wrapped with the UserProvider component , of for some reason the UserContext is still null at this point",
    });
  }

  const hasPermission = (permission: PermissionEnum) => {
    return context?.user?.permissions?.includes(permission) ?? false;
  };

  return {
    user: context?.user,
    setUser: context?.setUser,
    role: context?.role,
    permissions: context?.user?.permissions,
    hasPermission: hasPermission,
    initializeUser: context.initializeUser,
  };
};

export default useUser;
