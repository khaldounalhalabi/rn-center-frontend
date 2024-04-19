"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { SpecialityService } from "@/services/SpecialityService";
import { getCookieClient } from "@/Actions/clientCookies";
import {Speciality} from "@/Models/Speciality";
const locale = getCookieClient('locale')
const tableData: DataTableData<Speciality> = {
  createUrl: `${locale}/admin/speciality/create`,
  title: "Specialities",
  schema: [
    {
      name: "name",
      label: "Speciality",
      sortable: true,
      translatable: true,
    },
    {
      label: "Actions",
      render: (_undefined, data, setHidden) => (
        <ActionsButtons
          id={data?.id}
          buttons={["edit", "delete", "show"]}
          baseUrl={`${locale}/admin/specialities`}
          editUrl={`${locale}/admin/speciality/${data?.id}/edit`}
          showUrl={`${locale}/admin/speciality/${data?.id}`}
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
      params
    ),
};
const Page = () => {
  return <DataTable {...tableData} />;
};

export default Page;
