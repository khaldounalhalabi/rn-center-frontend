"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import { Clinic } from "@/Models/Clinic";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { ClinicService } from "@/services/ClinicService";
import Link from "next/link";

import WeekDaySelect from "@/components/common/WeekDaySelect";
import { getCookieClient } from "@/Actions/clientCookies";
import { translate } from "@/Helpers/Translations";

const locale = getCookieClient('NEXT_LOCALE');

const dataTableSchema: DataTableData<Clinic> = {
  schema: [
    {
      name: "user.first_name",
      label: "Doctor",
      sortable: true,
      render: (_data, clinic) => {
        return (
          <Link
            href={`/${locale}/admin/clinics/${clinic?.id}`}
            className={`flex flex-col items-start btn btn-ghost p-1`}
          >
            <p>
              {translate(clinic?.user?.first_name)}{" "}
              {translate(clinic?.user?.middle_name)}{" "}
              {translate(clinic?.user?.last_name)}
            </p>
            <p>{translate(clinic?.name)}</p>
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
          baseUrl={`/${locale}/admin/clinics/schedules`}
          setHidden={setHidden}
          deleteUrl={`/${locale}/admin/clinics/${clinic?.id}`}
          editUrl={`/${locale}/admin/clinics/schedules/${clinic?.id}`}
        />
      ),
    },
  ],
  api: async (page, search, sortCol, sortDir, perPage, params) =>
    await ClinicService.make<ClinicService>().indexWithPagination(
      page,
      search,
      sortCol,
      sortDir,
      perPage,
      params,
    ),
  createUrl: `/${locale}/admin/clinics/schedules/create`,
  title: "Clinic Schedules",
  filter: (params, setParams) => {
    return (
      <div className={"w-full grid grid-cols-1"}>
        <label className={"label"}>
          Start Time :
          <input
            type="time"
            className={"input input-bordered input-sm"}
            defaultChecked={params.start_time}
            onChange={(event) => {
              setParams({ ...params, start_time: event.target.value });
            }}
          />
        </label>
        <label className={`label`}>
          End Time :
          <input
            type="time"
            className={"input input-bordered input-sm"}
            defaultChecked={params.end_time}
            onChange={(event) => {
              setParams({ ...params, end_time: event.target.value });
            }}
          />
        </label>
        <label className={"label"}>
          Day :
          <WeekDaySelect
            className="select select-bordered select-sm w-full max-w-xs"
            defaultValue={params.day_of_week}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              setParams({ ...params, day_of_week: event.target.value });
            }}
          />
        </label>
      </div>
    );
  },
};

const Page = () => {
  return <DataTable {...dataTableSchema} />;
};

export default Page;
