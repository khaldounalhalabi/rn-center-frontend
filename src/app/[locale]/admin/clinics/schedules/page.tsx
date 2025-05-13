"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import { Clinic } from "@/models/Clinic";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { ClinicsService } from "@/services/ClinicsService";
import { useTranslations } from "next-intl";
import { RoleEnum } from "@/enums/RoleEnum";
import { Label } from "@/components/common/ui/labels-and-values/Label";
import { getEnumValues } from "@/helpers/Enums";
import WeekDayEnum from "@/enums/WeekDayEnum";
import Select from "@/components/common/ui/selects/Select";
import { Input } from "@/components/ui/shadcn/input";

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
              setParams({ ...params, day_of_week: e });
            }}
            selected={params.day_of_week}
            data={getEnumValues(WeekDayEnum)}
            translated={true}
            label={t("day")}
          />

          <Label label={t("time")} col>
            <Input
              defaultValue={params.available_time}
              type={"time"}
              onChange={(event) => {
                setParams({ ...params, available_time: event.target?.value });
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
