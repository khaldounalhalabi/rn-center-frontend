"use client";
import React from "react";
import PageCard from "@/components/common/ui/PageCard";
import { useTranslations } from "next-intl";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import Formula from "@/models/Formula";
import FormulaService from "@/services/FormulaService";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import FormulaTemplateViewer from "@/components/common/formula/FormulaTemplateViewer";

const Page = () => {
  const t = useTranslations("formulas");
  const datatable: DataTableData<Formula> = {
    createUrl: "/admin/formulas/create",
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await FormulaService.make().indexWithPagination(
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
            baseUrl={"/admin/formulas"}
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
