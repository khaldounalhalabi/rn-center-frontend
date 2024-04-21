"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import { ClinicHoliday } from "@/Models/ClinicHoliday";
import { ClinicHolidayService } from "@/services/ClinicHolidayService";
import Link from "next/link";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { getCookieClient } from "@/Actions/clientCookies";

const locale = getCookieClient('NEXT_LOCALE');
const tableData: DataTableData<ClinicHoliday> = {
  createUrl: `/${locale}/admin/clinics/holidays/create`,
  title: "Clinics Holidays",
  schema: [
    {
      name: "clinic.name",
      label: "Clinic",
      sortable: true,
      translatable: true,
      render: (data, holiday) => {
        return (
          <Link
            href={`/${locale}/admin/clinics/${holiday?.clinic?.id}`}
            className={`btn btn-ghost p-1 w-full`}
          >
            {data}
          </Link>
        );
      },
    },
    {
      name: "start_date",
      label: "Start At",
      sortable: true,
    },
    {
      name: "end_date",
      label: "End At",
      sortable: true,
    },
    {
      name: "reason",
      label: "Reason",
      translatable: true,
      render: (data) => <p className={`overflow-ellipsis`}>{data}</p>,
    },
    {
      label: "Actions",
      render: (_undefined, data, setHidden) => (
        <ActionsButtons
          id={data?.id}
          buttons={["edit", "delete", "show"]}
          baseUrl={`/${locale}/admin/clinic-holidays`}
          editUrl={`/${locale}/admin/clinics/holidays/${data?.id}/edit`}
          showUrl={`/${locale}/admin/clinics/holidays/${data?.id}`}
          setHidden={setHidden}
        />
      ),
    },
  ],
  api: async (page, search, sortCol, sortDir, perPage, params) =>
    await ClinicHolidayService.make<ClinicHolidayService>().indexWithPagination(
      page,
      search,
      sortCol,
      sortDir,
      perPage,
      params,
    ),

  filter: (params, setParams) => {
    return (
      <div className={"w-full grid grid-cols-1"}>
        <label className={"label"}>
          Start Date :
          <input
            type="date"
            className={"input input-bordered input-sm"}
            defaultChecked={params.start_date}
            onChange={(event) => {
              setParams({ ...params, start_date: event.target.value });
            }}
          />
        </label>
        <label className={`label`}>
          End Date :
          <input
            type="date"
            className={"input input-bordered input-sm"}
            defaultChecked={params.end_date}
            onChange={(event) => {
              setParams({ ...params, end_date: event.target.value });
            }}
          />
        </label>
      </div>
    );
  },
};
const Page = () => {
  return <DataTable {...tableData} />;
};

export default Page;
