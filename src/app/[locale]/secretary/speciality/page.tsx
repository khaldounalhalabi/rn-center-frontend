"use client";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import PageCard from "@/components/common/ui/PageCard";
import { RoleEnum } from "@/enums/RoleEnum";
import { Speciality } from "@/models/Speciality";
import { SpecialityService } from "@/services/SpecialityService";
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations("admin.speciality.table");
  const tableData: DataTableData<Speciality> = {
    createUrl: `/secretary/speciality/create`,
    schema: [
      {
        name: "id",
        label: `id`,
        sortable: true,
      },
      {
        name: "name",
        label: `${t("speciality")}`,
        sortable: true,
      },
      {
        label: `${t("actions")}`,
        render: (_undefined, data, setHidden) => (
          <ActionsButtons
            id={data?.id}
            buttons={["edit", "delete", "show"]}
            baseUrl={`/secretary/specialities`}
            editUrl={`/secretary/speciality/${data?.id}/edit`}
            showUrl={`/secretary/speciality/${data?.id}`}
            setHidden={setHidden}
          />
        ),
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await SpecialityService.make(RoleEnum.SECRETARY).indexWithPagination(
        page,
        search,
        sortCol,
        sortDir,
        perPage,
        params,
      ),
  };
  return (
    <PageCard title={t("specialities")}>
      <DataTable {...tableData} />
    </PageCard>
  );
};

export default Page;
