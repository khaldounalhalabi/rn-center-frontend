"use client";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import DataTable, {
  DataTableData,
  DataTableSchema,
} from "@/components/common/Datatable/DataTable";
import PageCard from "@/components/common/ui/PageCard";
import DatePickerFilter from "@/components/common/ui/date-time-pickers/Datepicker";
import PermissionEnum from "@/enums/PermissionEnum";
import { RoleEnum } from "@/enums/RoleEnum";
import useUser from "@/hooks/UserHook";
import { Holiday } from "@/models/Holiday";
import { HolidayService } from "@/services/HolidayService";
import { useTranslations } from "next-intl";

const HolidaysIndexPage = () => {
  const t = useTranslations("holidays");
  const { user } = useUser();
  const schema: DataTableSchema<Holiday>[] = [
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
  ];

  if (user?.permissions?.includes(PermissionEnum.HOLIDAYS_MANAGEMENT)) {
    schema.push({
      label: `${t("actions")}`,
      render: (_undefined, data, setHidden) => (
        <ActionsButtons
          id={data?.id}
          buttons={["edit", "delete"]}
          baseUrl={`/secretary/holidays`}
          setHidden={setHidden}
        />
      ),
    });
  }

  const tableData: DataTableData<Holiday> = {
    createUrl: user?.permissions?.includes(PermissionEnum.HOLIDAYS_MANAGEMENT)
      ? `/secretary/holidays/create`
      : undefined,
    schema: schema,
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await HolidayService.make(RoleEnum.SECRETARY).indexWithPagination(
        page,
        search,
        sortCol,
        sortDir,
        perPage,
        params,
      ),

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
