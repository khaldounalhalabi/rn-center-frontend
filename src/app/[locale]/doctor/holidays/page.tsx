"use client";
import { useTranslations } from "next-intl";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import React from "react";
import { HolidayService } from "@/services/HolidayService";
import { RoleEnum } from "@/enums/RoleEnum";
import { Holiday } from "@/models/Holiday";
import DatePickerFilter from "@/components/common/ui/date-time-pickers/Datepicker";
import PageCard from "@/components/common/ui/PageCard";

const HolidaysIndexPage = () => {
  const t = useTranslations("holidays");
  const tableData: DataTableData<Holiday> = {
    schema: [
      {
        name: "id",
        label: `id`,
        sortable: true,
      },
      {
        name: "reason",
        label: `${t("reason")}`,
        sortable: true,
        cellProps: {
          className: "max-w-1/3 overflow-ellipsis",
        },
      },
      {
        name: "from",
        label: `${t("from")}`,
        sortable: true,
      },
      {
        name: "to",
        label: t("to"),
        sortable: true,
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await HolidayService.make(
        RoleEnum.DOCTOR,
      ).indexWithPagination(page, search, sortCol, sortDir, perPage, params),

    filter: (params, setParams) => {
      return (
        <div className={"w-full"}>
          <DatePickerFilter
            label={t("date")}
            onChange={(date) => {
              setParams({ ...params, date: date?.format("YYYY-MM-DD") });
            }}
            defaultValue={params?.date}
          />
        </div>
      );
    },
  };
  return (
    <PageCard title={`${t("holidays")}`}>
      <DataTable {...tableData} />
    </PageCard>
  );
};

export default HolidaysIndexPage;
