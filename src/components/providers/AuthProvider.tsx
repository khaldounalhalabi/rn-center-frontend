"use client";
import React from "react";
import UserInitializerProvider from "./UserInitializerProvider";
import UserProvider from "./UserProvider";

const AuthProvider = ({ children }: { children?: React.ReactNode }) => {
  return (
    <UserProvider>
      <UserInitializerProvider>{children}</UserInitializerProvider>
    </UserProvider>
  );
};

export default AuthProvider;
