"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import { Clinic } from "@/models/Clinic";
import { ClinicsService } from "@/services/ClinicsService";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { useTranslations } from "next-intl";
import { Label } from "@/components/common/ui/labels-and-values/Label";
import { RoleEnum } from "@/enums/RoleEnum";
import TranslatableEnum from "@/components/common/ui/labels-and-values/TranslatableEnum";
import Grid from "@/components/common/ui/Grid";
import Select from "@/components/common/ui/selects/Select";
import { getEnumValues } from "@/helpers/Enums";
import WeekDayEnum from "@/enums/WeekDayEnum";
import { Input } from "@/components/ui/shadcn/input";
import dayjs from "dayjs";

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
              setParams({ ...params, day_of_week: e });
            }}
            selected={params.day_of_week}
            data={getEnumValues(WeekDayEnum)}
            translated={true}
            label={t("available_day")}
          />

          <Label label={t("available_time")} col>
            <Input
              onChange={(event) => {
                setParams({
                  ...params,
                  available_time: event.target.value,
                });
              }}
              defaultValue={params.available_time}
              type={"time"}
            />
          </Label>
        </Grid>
      );
    },
  };
  return <DataTable {...dataTableData} />;
};

export default Page;
