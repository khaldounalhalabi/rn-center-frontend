"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import { Clinic } from "@/models/Clinic";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { ClinicsService } from "@/services/ClinicsService";
import { useTranslations } from "next-intl";
import { RoleEnum } from "@/enum/RoleEnum";
import TimePickerFilter from "@/components/common/ui/date-time-pickers/Timepicker";
import { Label } from "@/components/common/ui/labels-and-values/Label";
import { getEnumValues } from "@/helpers/Enums";
import WeekDayEnum from "@/enum/WeekDayEnum";
import Select from "@/components/common/ui/selects/Select";

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
        <div className={"grid w-full grid-cols-1"}>
          <Select
            onChange={(e) => {
              setParams({ ...params, day_of_week: e.target?.value });
            }}
            selected={params.day_of_week}
            data={getEnumValues(WeekDayEnum)}
            translated={true}
            label={t("day")}
          />

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
