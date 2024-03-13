"use client";
import React from "react";
import DataTable, {
  DataTableSchema,
} from "@/components/common/datatable/DataTable";

const Page = () => {
  const headerData: DataTableSchema[] = [
    {
      name: "name",
      label: "Name",
    },
    {
      name: "birthDate",
      label: "Date Of Birth",
    },
    { label: "Role", name: "role" },
    {
      label: "Salary",
      name: "salary",
      render: (data) => {
        return <a href={"#"}>{data}</a>;
      },
    },
  ];

  const data = [
    {
      name: "John Doe",
      birthDate: "222222",
      role: "admin",
      salary: "55",
    },
    {
      name: "John Doe",
      birthDate: "222222",
      role: "admin",
      salary: "55",
    },
    {
      name: "John Doe",
      birthDate: "222222",
      role: "admin",
      salary: "55",
    },
  ];
  return <DataTable bodyData={data} schema={headerData} />;
};

export default Page;
