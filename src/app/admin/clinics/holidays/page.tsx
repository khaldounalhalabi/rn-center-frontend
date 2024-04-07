"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import { ClinicHoliday } from "@/Models/ClinicHoliday";
import { ClinicHolidayService } from "@/services/ClinicHolidayService";
import Link from "next/link";

const tableData: DataTableData<ClinicHoliday> = {
  title: "Clinics Holidays",
  schema: [
    {
      name: "clinic.name",
      label: "Doctor",
      sortable: true,
      render: (_data, holiday) => {
        return (
          <Link
            href={`/admin/clinics/${holiday?.clinic?.id}`}
            className={`btn btn-ghost p-1 w-full`}
          >
            {holiday?.clinic?.name}
          </Link>
        );
      },
    },
    {
      name: "start_date",
      label: "Start At",
      sortable: true,
      render: (data) => data.replace(" 00:00:00", ""),
    },
    {
      name: "end_date",
      label: "End At",
      sortable: true,
      render: (data) => data.replace(" 00:00:00", ""),
    },
    {
      name: "reason",
      label: "Reason",
      render: (data) => <p className={`overflow-ellipsis`}>{data}</p>,
    },
  ],
  api: async (page, search, sortCol, sortDir, perPage) =>
    await ClinicHolidayService.make().indexWithPagination(
      page,
      search,
      sortCol,
      sortDir,
      perPage,
    ),
};
const Page = () => {
  return <DataTable {...tableData} />;
};

export default Page;
