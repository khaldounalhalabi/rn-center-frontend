"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import { Clinic } from "@/Models/Clinic";
import { ClinicsService } from "@/services/ClinicsService";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { useTranslations } from "next-intl";
import { Label } from "@/components/common/ui/labels-and-values/Label";
import { RoleEnum } from "@/enum/RoleEnum";
import TimePickerFilter from "@/components/common/ui/date-time-pickers/Timepicker";
import TranslatableEnum from "@/components/common/ui/TranslatableEnum";
import Grid from "@/components/common/ui/Grid";
import Select from "@/components/common/ui/selects/Select";
import { getEnumValues } from "@/Helpers/Enums";
import WeekDayEnum from "@/enum/WeekDayEnum";

const Page = () => {
  const t = useTranslations("admin.clinic.table");
  const dataTableData: DataTableData<Clinic> = {
    createUrl: `/admin/clinics/create`,
    schema: [
      {
        name: "id",
        label: `id`,
        sortable: true,
      },
      {
        name: "user.full_name",
        sortable: true,
        label: `${t("doctor")}`,
      },
      {
        label: `${t("phone")}`,
        name: "user.phone",
        sortable: true,
      },
      {
        label: `${t("gender")}`,
        name: "user.gender",
        sortable: true,
        render: (gender) => <TranslatableEnum value={gender} />,
      },
      {
        name: "total_appointments",
        label: `${t("total-appointments")}`,
        render: (_undefined, clinic) => {
          return (
            <span suppressHydrationWarning>
              {clinic?.total_appointments.toLocaleString()}
            </span>
          );
        },
      },
      {
        label: `${t("actions")}`,
        render: (_undefined, clinic, setHidden) => (
          <ActionsButtons
            id={clinic?.id}
            buttons={["edit", "show", "delete"]}
            baseUrl={`/admin/clinics`}
            setHidden={setHidden}
          />
        ),
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await ClinicsService.make<ClinicsService>(
        RoleEnum.ADMIN,
      ).indexWithPagination(page, search, sortCol, sortDir, perPage, params),
    title: `${t("clinics")} :`,
    filter: (params, setParams) => {
      return (
        <Grid md={1}>
          <Select
            onChange={(e) => {
              setParams({ ...params, day_of_week: e.target?.value });
            }}
            selected={params.day_of_week}
            data={getEnumValues(WeekDayEnum)}
            translated={true}
            label={t("available_day")}
          />

          <Label label={t("available_time")} col>
            <TimePickerFilter
              onChange={(time) => {
                setParams({ ...params, available_time: time?.format("HH:mm") });
              }}
              defaultValue={params.available_time}
            />
          </Label>
        </Grid>
      );
    },
  };
  return <DataTable {...dataTableData} />;
};

export default Page;
