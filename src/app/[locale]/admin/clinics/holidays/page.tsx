"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import { ClinicHoliday } from "@/Models/ClinicHoliday";
import { ClinicHolidayService } from "@/services/ClinicHolidayService";
import { Link } from "@/i18Router";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const tableData: DataTableData<ClinicHoliday> = {
  createUrl: `/admin/clinics/holidays/create`,
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
            href={`/admin/clinics/${holiday?.clinic?.id}`}
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
          baseUrl={`/admin/clinic-holidays`}
          editUrl={`/admin/clinics/holidays/${data?.id}/edit`}
          showUrl={`/admin/clinics/holidays/${data?.id}`}
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
      params
    ),

  filter: (params, setParams) => {
    return (
      <div className={"w-full grid grid-cols-1"}>
        <label className={"label"}>
          Start Date :
          <DatePicker
            onChange={(event): void => {
              setParams({ ...params, start_date: event?.format("YYYY-MM-DD") });
            }}
            defaultValue={dayjs(params.start_date ?? null)}
          />
        </label>
        <label className={`label`}>
          End Date :
          <DatePicker
            onChange={(event): void => {
              setParams({ ...params, end_date: event?.format("YYYY-MM-DD") });
            }}
            defaultValue={dayjs(params.end_date ?? null)}
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
