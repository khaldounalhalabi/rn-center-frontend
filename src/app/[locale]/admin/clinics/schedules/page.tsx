"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import { Clinic } from "@/Models/Clinic";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { ClinicsService } from "@/services/ClinicsService";
import WeekDaySelect from "@/components/common/ui/Selects/WeekDaySelect";
import { useTranslations } from "next-intl";
import { RoleEnum } from "@/enum/RoleEnum";
import TimePickerFilter from "@/components/common/ui/TimePickerFilter";
import { Label } from "@/components/common/ui/LabelsValues/Label";

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
        name: "user.full_name",
        label: `${t("clinic")}`,
        sortable: true,
      },
      {
        label: `${t("actions")}`,
        render: (_undefined, clinic) => (
          <ActionsButtons
            id={clinic?.id}
            buttons={["edit", "delete"]}
            baseUrl={`/admin/clinics/schedules`}
            deleteUrl={`/admin/clinics/${clinic?.id}/schedules`}
            editUrl={`/admin/clinics/schedules/${clinic?.id}`}
          />
        ),
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await ClinicsService.make<ClinicsService>(
        RoleEnum.ADMIN,
      ).indexWithPagination(page, search, sortCol, sortDir, perPage, params),
    title: `${t("clinicSchedules")}`,
    filter: (params, setParams) => {
      return (
        <div className={"w-full grid grid-cols-1"}>
          <Label label={t("day")} col>
            <WeekDaySelect
              className="w-full max-w-xs select-bordered select-sm select"
              defaultValue={params.day_of_week}
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                setParams({ ...params, day_of_week: event.target.value });
              }}
              label={t("day")}
            />
          </Label>

          <Label label={t("time")} col>
            <TimePickerFilter
              defaultValue={params.available_time}
              onChange={(time) => {
                setParams({ ...params, available_time: time?.format("HH:mm") });
              }}
            />
          </Label>
        </div>
      );
    },
  };

  return <DataTable {...dataTableSchema} />;
};

export default Page;
