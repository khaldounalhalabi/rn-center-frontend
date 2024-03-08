"use client";
import React from "react";

const FormContainer: React.FC<any> = ({ children, ...props }) => {
  return <form {...props}>{children}</form>;
};

export default FormContainer;
