"use client";
import React from "react";
import PermissionProvider from "./PermissionProvider";
import UserInitializerProvider from "./UserInitializerProvider";
import UserProvider from "./UserProvider";

const AuthProvider = ({ children }: { children?: React.ReactNode }) => {
  return (
    <UserProvider>
      <PermissionProvider>
        <UserInitializerProvider>{children}</UserInitializerProvider>
      </PermissionProvider>
    </UserProvider>
  );
};

export default AuthProvider;
