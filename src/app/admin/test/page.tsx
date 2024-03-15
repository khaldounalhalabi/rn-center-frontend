"use client";
import React from "react";
import DataTable, {
  DataTableData,
  DataTableSchema,
} from "@/components/common/datatable/DataTable";
import { Clinic } from "@/Models/Clinic";
import { ClinicService } from "@/services/ClinicService";

const Page = () => {
  const headerData: DataTableSchema[] = [
    {
      label: "Clinic Name",
      render:(data , fullObject) => {
        return (
        <div className="flex flex-col">
          <div>{fullObject.user.first_name}</div>
          <p>{fullObject.name}</p>
        </div>
        )
      }
    },
    {
      name: "appointment_cost",
      label: "Appointment Cost",
      render: (data, fullObject) => {
        return <button className={`btn btn-sm btn-warning`}>{data}</button>;
      },
    },
    {
      name:"working_start_year" , 
      label:"Work Start Year" , 
    }
  ];

  const tableData: DataTableData<Clinic> = {
    schema: headerData,
    api: async (page , search) => await new ClinicService().indexWithPagination(page , search),
  };
  return <DataTable api={tableData.api} schema={tableData.schema} />;
};

export default Page;
