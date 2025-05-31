"use client";
import React from "react";
import DataTable, { DataTableData } from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { SpecialityService } from "@/services/SpecialityService";
import { Speciality } from "@/models/Speciality";
import { useTranslations } from "next-intl";
import PageCard from "@/components/common/ui/PageCard";

const Page = () => {
  const t = useTranslations("admin.speciality.table");
  const tableData: DataTableData<Speciality> = {
    createUrl: `/admin/speciality/create`,
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
            baseUrl={`/admin/specialities`}
            editUrl={`/admin/speciality/${data?.id}/edit`}
            showUrl={`/admin/speciality/${data?.id}`}
            setHidden={setHidden}
          />
        ),
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await SpecialityService.make().indexWithPagination(
        page,
        search,
        sortCol,
        sortDir,
        perPage,
        params,
      ),
  };
  return <PageCard title={t("specialities")}><DataTable {...tableData} /></PageCard>;
};

export default Page;
