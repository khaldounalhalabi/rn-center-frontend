"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import { ClinicHoliday } from "@/Models/ClinicHoliday";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { SpecialityService } from "@/services/SpecialityService";
import { getCookieClient } from "@/Actions/clientCookies";
const locale = getCookieClient('locale')
const tableData: DataTableData<ClinicHoliday> = {
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
    await SpecialityService.make().indexWithPagination(
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
