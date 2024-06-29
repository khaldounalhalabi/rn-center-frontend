"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import { Clinic } from "@/Models/Clinic";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { ClinicsService } from "@/services/ClinicsService";
import { Link } from "@/navigation";
import WeekDaySelect from "@/components/common/WeekDaySelect";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import { useTranslations } from "next-intl";
import TimepickerFilter from "@/components/common/ui/TimePickerFilter";

const Page = () => {
  const t = useTranslations("admin.schedules.table");
  const dataTableSchema: DataTableData<Clinic> = {
    schema: [
      {
        name: "id",
        label: `id`,
        sortable: true,
      },
      {
        name: "user.first_name",
        label: `${t("clinic")}`,
        sortable: true,
        render: (_data, clinic) => {
          return (
            <Link
              href={`/admin/clinics/${clinic?.id}`}
              className={`flex flex-col items-start btn btn-ghost p-1 hover:text-pom`}
            >
              <p>{TranslateClient(clinic?.name)}</p>
            </Link>
          );
        },
      },
      {
        name: "user.first_name",
        sortable: true,
        label: `${t("doctor")}`,
        render: (_first_name, clinic) => {
          return (
            <p>
              {TranslateClient(clinic?.user?.first_name)}{" "}
              {TranslateClient(clinic?.user?.middle_name)}{" "}
              {TranslateClient(clinic?.user?.last_name)}
            </p>
          );
        },
      },

      {
        label: `${t("actions")}`,
        render: (_undefined, clinic, setHidden) => (
          <ActionsButtons
            id={clinic?.id}
            buttons={["edit", "delete"]}
            baseUrl={`/admin/clinics/schedules`}
            setHidden={setHidden}
            deleteUrl={`/admin/clinics/${clinic?.id}`}
            editUrl={`/admin/clinics/schedules/${clinic?.id}`}
          />
        ),
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await ClinicsService.make<ClinicsService>("admin").setHeaders({ filtered: true }).indexWithPagination(
        page,
        search,
        sortCol,
        sortDir,
        perPage,
        params,
      ),
    createUrl: `/admin/clinics/schedules/create`,
    title: `${t("clinicSchedules")}`,
    filter: (params, setParams) => {
      return (
        <div className={"w-full grid grid-cols-1"}>
          <label className={"label"}>
            {t("startTime")} :
            <TimepickerFilter
              defaultValue={params.start_time}
              onChange={(v): void => {
                setParams({ ...params, start_time: v?.format("HH:mm") });
              }}
            />
          </label>
          <label className={`label`}>
            {t("endTime")} :
            <TimepickerFilter
              defaultValue={params.end_time}
              onChange={(v): void => {
                setParams({ ...params, end_time: v?.format("HH:mm") });
              }}
            />
          </label>
          <label className={"label"}>
            {t("day")} :
            <WeekDaySelect
              className="w-full max-w-xs select-bordered select-sm select"
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

  return <DataTable {...dataTableSchema} />;
};

export default Page;