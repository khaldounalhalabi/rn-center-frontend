"use client";
import React, { ReactNode } from "react";

const FormContainer: React.FC<any> = ({
  children,
  ...props
}: {
  children: ReactNode;
  props: React.FormHTMLAttributes<HTMLFormElement>;
}) => {
  return <form {...props}>{children}</form>;
};

export default FormContainer;
