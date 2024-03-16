"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import { Clinic } from "@/Models/Clinic";
import { ClinicService } from "@/services/ClinicService";
import Eye from "@/components/icons/Eye";
import Pencil from "@/components/icons/Pencil";
import Trash from "@/components/icons/Trash";

const dataTableData: DataTableData<Clinic> = {
  schema: [
    {
      name: "user.first_name",
      sortable: true,
      label: "Doctor",
      render: (first_name, clinic) => (
        <div className={`flex flex-col items-start`}>
          <p>
            {clinic?.user?.first_name} {clinic?.user?.middle_name}{" "}
            {clinic?.user?.last_name}
          </p>
          <p>{clinic?.name}</p>
        </div>
      ),
    },
    {
      sortable: false,
      label: "City",
      render: (undefined, clinic) => clinic?.user?.address?.city,
    },
    {
      label: "Phone",
      render: (undefined, clinic) => clinic?.user?.phones[0]?.phone ?? "",
    },
    {
      label: "Actions",
      render: (undefined, clinic) => (
        <div className={`flex justify-between items-center`}>
          <button className="btn btn-square btn-sm">
            <Eye className="h-6 w-6 text-primary" />
          </button>
          <button className="btn btn-square btn-sm">
            <Pencil className="h-6 w-6 text-success" />
          </button>
          <button className="btn btn-square btn-sm">
            <Trash className="h-6 w-6 text-error" />
          </button>
        </div>
      ),
    },
  ],
  api: async (page, search, sortCol, sortDir) =>
    await new ClinicService().indexWithPagination(
      page,
      search,
      sortCol,
      sortDir
    ),
};

const Page = () => {
  return <DataTable schema={dataTableData.schema} api={dataTableData.api} />;
};

export default Page;
