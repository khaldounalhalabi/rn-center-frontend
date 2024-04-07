"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import { Clinic } from "@/Models/Clinic";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { ClinicService } from "@/services/ClinicService";
import Link from "next/link";

const dataTableSchema: DataTableData<Clinic> = {
  schema: [
    {
      name: "user.first_name",
      label: "Doctor",
      sortable: true,
      render: (_data, clinic, setHidden) => {
        return (
          <Link
            href={`/admin/clinics/${clinic?.id}`}
            className={`flex flex-col items-start btn btn-ghost p-1`}
          >
            <p>
              {clinic?.user?.first_name} {clinic?.user?.middle_name}{" "}
              {clinic?.user?.last_name}
            </p>
            <p>{clinic?.name}</p>
          </Link>
        );
      },
    },
    {
      name: "approximate_appointment_time",
      label: "Approximate Appointment Time (min)",
      sortable: true,
      render: (minutes) => (
        <span className={`badge badge-primary`}>{minutes} minutes</span>
      ),
    },
    {
      label: "Actions",
      render: (_undefined, clinic, setHidden) => (
        <ActionsButtons
          id={clinic?.id}
          buttons={["edit", "delete"]}
          baseUrl={"/admin/clinics/schedules"}
          setHidden={setHidden}
          deleteUrl={`/admin/clinics/${clinic?.id}`}
          editUrl={`/admin/clinics/schedules/${clinic.id}`}
        />
      ),
    },
  ],
  api: async (page, search, sortCol, sortDir, perPage) =>
    await ClinicService.make().indexWithPagination(
      page,
      search,
      sortCol,
      sortDir,
      perPage,
    ),
  createUrl: "/admin/clinics/schedules/create",
  title: "Clinic Schedules",
};

const Page = () => {
  return <DataTable {...dataTableSchema} />;
};

export default Page;
