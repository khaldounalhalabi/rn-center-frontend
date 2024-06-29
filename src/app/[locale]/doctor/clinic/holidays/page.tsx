"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import { ClinicHoliday } from "@/Models/ClinicHoliday";
import { ClinicHolidayService } from "@/services/ClinicHolidayService";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import DatepickerFilter from "@/components/common/ui/DatePickerFilter";

const Page = () => {
  const tableData: DataTableData<ClinicHoliday> = {
    createUrl: `/doctor/clinic/holidays/create`,
    title: `${"Clinics Holidays"}`,
    schema: [
      {
        name: "id",
        label: `id`,
        sortable: true,
      },
      {
        name: "start_date",
        label: `${"Start"}`,
        sortable: true,
      },
      {
        name: "end_date",
        label: `${"End"}`,
        sortable: true,
      },
      {
        name: "reason",
        label: `${"Reason"}`,
        translatable: true,
        render: (data) => <p className={`overflow-ellipsis`}>{data}</p>,
      },
      {
        label: `${"Actions"}`,
        render: (_undefined, data, setHidden) => (
          <ActionsButtons
            id={data?.id}
            buttons={["edit", "delete", "show"]}
            baseUrl={`/doctor/clinic-holidays`}
            editUrl={`/doctor/clinic/holidays/${data?.id}/edit`}
            showUrl={`/doctor/clinic/holidays/${data?.id}`}
            setHidden={setHidden}
          />
        ),
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await ClinicHolidayService.make<ClinicHolidayService>(
        "doctor",
      ).setHeaders({ filtered: true }).indexWithPagination(page, search, sortCol, sortDir, perPage, params),

    filter: (params, setParams) => {
      return (
        <div className={"w-full grid grid-cols-1"}>
          <label className={"label"}>
            {"Start Date"} :
            <DatepickerFilter
              onChange={(event): void => {
                setParams({
                  ...params,
                  start_date: event?.format("YYYY-MM-DD"),
                });
              }}
              defaultValue={params.start_date}
            />
          </label>
          <label className={`label`}>
            {"End Date"} :
            <DatepickerFilter
              onChange={(event): void => {
                setParams({ ...params, end_date: event?.format("YYYY-MM-DD") });
              }}
              defaultValue={params.end_date}
            />
          </label>
        </div>
      );
    },
  };
  return <DataTable {...tableData} />;
};

export default Page;