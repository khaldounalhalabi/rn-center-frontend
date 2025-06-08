"use client";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import DataTable, {
  DataTableData,
  DataTableSchema,
} from "@/components/common/Datatable/DataTable";
import Datepicker from "@/components/common/ui/date-time-pickers/Datepicker";
import PageCard from "@/components/common/ui/PageCard";
import ShowVacationSheet from "@/components/common/Vacations/ShowVacationSheet";
import VacationFormSheet from "@/components/common/Vacations/VacationFormSheet";
import { RoleEnum } from "@/enums/RoleEnum";
import Vacation from "@/models/Vacation";
import VacationService from "@/services/VacationService";
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations("vacations");
  const schema: DataTableSchema<Vacation>[] = [
    {
      name: "id",
      label: "ID",
      sortable: true,
    },
    {
      name: "from",
      label: t("from"),
      sortable: true,
    },
    {
      name: "to",
      label: t("to"),
      sortable: true,
    },
    {
      name: "status",
      label: t("status"),
      sortable: true,
    },
    {
      name: "actions",
      label: t("actions"),
      render(data, fullObject, setHidden, revalidate) {
        return (
          <ActionsButtons
            data={fullObject}
            baseUrl="/admin/vacations"
            buttons={fullObject?.can_delete ? ["delete"] : []}
            reverse
            setHidden={setHidden}
          >
            <ShowVacationSheet vacation={fullObject} />
          </ActionsButtons>
        );
      },
    },
  ];

  const datatable: DataTableData<Vacation> = {
    async api(page, search, sortCol, sortDir, perPage, params) {
      return await VacationService.make(RoleEnum.DOCTOR).indexWithPagination(
        page,
        search,
        sortCol,
        sortDir,
        perPage,
        params,
      );
    },
    schema: schema,
    extraButton(revalidate) {
      return (
        <VacationFormSheet
          type="store"
          revalidate={revalidate}
          role={RoleEnum.DOCTOR}
        />
      );
    },
    filter(params, setParams) {
      return (
        <Datepicker
          label={t("date")}
          onChange={(date) => {
            setParams({ ...params, date: date?.format("YYYY-MM-DD") });
          }}
          defaultValue={params?.date}
        />
      );
    },
  };
  return (
    <PageCard title={t("index_title")}>
      <DataTable {...datatable} />
    </PageCard>
  );
};

export default Page;
