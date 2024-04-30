"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { SpecialityService } from "@/services/SpecialityService";
import { Speciality } from "@/Models/Speciality";
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations("admin.speciality.table");
  const tableData: DataTableData<Speciality> = {
    createUrl: `/admin/speciality/create`,
    title: `${t("specialities")}`,
    schema: [
      {
        name: "name",
        label: `${t("speciality")}`,
        sortable: true,
        translatable: true,
      },
      {
        label: `${t("actions")}`,
        render: (_undefined, data, setHidden) => (
          <ActionsButtons
            id={data?.id}
            buttons={["edit", "delete", "show"]}
            baseUrl={`/admin/specialities`}
            editUrl={`/admin/speciality/${data?.id}/edit`}
            showUrl={`/admin/speciality/${data?.id}`}
            setHidden={setHidden}
          />
        ),
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await SpecialityService.make<SpecialityService>().indexWithPagination(
        page,
        search,
        sortCol,
        sortDir,
        perPage,
        params,
      ),
  };
  return <DataTable {...tableData} />;
};

export default Page;
