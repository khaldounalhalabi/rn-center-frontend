"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import { ClinicHoliday } from "@/Models/ClinicHoliday";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { HospitalService } from "@/services/HospitalService";
import { getCookieClient } from "@/Actions/clientCookies";
const locale = getCookieClient('locale')
const tableData: DataTableData<ClinicHoliday> = {
  createUrl: `${locale}/admin/hospitals/create`,
  title: "Hospitals",
  schema: [
    {
      name: "name",
      label: "Hospitals",
      sortable: true,
      translatable: true,
    },
    {
      label: "Actions",
      render: (_undefined, data, setHidden) => (
        <ActionsButtons
          id={data?.id}
          buttons={["edit", "delete", "show"]}
          baseUrl={`${locale}/admin/hospitals`}
          editUrl={`${locale}/admin/hospitals/${data?.id}/edit`}
          showUrl={`${locale}/admin/hospitals/${data?.id}`}
          setHidden={setHidden}
        />
      ),
    },
  ],
  api: async (page, search, sortCol, sortDir, perPage, params) =>
    await HospitalService.make().indexWithPagination(
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
