"use client";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import FormulaTemplateViewer from "@/components/common/formula/FormulaTemplateViewer";
import PageCard from "@/components/common/ui/PageCard";
import { RoleEnum } from "@/enums/RoleEnum";
import Formula from "@/models/Formula";
import FormulaService from "@/services/FormulaService";
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations("formulas");
  const datatable: DataTableData<Formula> = {
    createUrl: "/secretary/formulas/create",
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await FormulaService.make(RoleEnum.SECRETARY).indexWithPagination(
        page,
        search,
        sortCol,
        sortDir,
        perPage,
        params,
      ),
    schema: [
      {
        name: "id",
        label: "ID",
        sortable: true,
      },
      {
        name: "name",
        label: t("name"),
        sortable: true,
      },
      {
        name: "template",
        label: t("formula"),
        render: (data) => <FormulaTemplateViewer formula={data} />,
      },
      {
        label: "actions",
        render: (_data, record, setHidden) => (
          <ActionsButtons
            buttons={["delete", "show", "edit"]}
            baseUrl={"/secretary/formulas"}
            setHidden={setHidden}
            data={record}
          />
        ),
      },
    ],
  };
  return (
    <PageCard title={t("formulas")} description={t("index_description")}>
      <DataTable {...datatable} />
    </PageCard>
  );
};
export default Page;
