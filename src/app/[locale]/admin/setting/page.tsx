"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { SettingService } from "@/services/SettingService";
import { Setting } from "@/Models/setting";

const Page = () => {
  const tableData: DataTableData<Setting> = {
    title: `Settings`,
    schema: [
      {
        name: "id",
        label: `id`,
        sortable: true,
      },
      {
        name: "label",
        label: `Label`,
        sortable: true,
        render: (data) => <span>{data?.replace(/_/g, " ")}</span>,
      },
      {
        name: "value",
        label: `Value`,
        sortable: true,
      },
      {
        label: `Actions`,
        render: (_undefined, data, setHidden) => (
          <ActionsButtons
            id={data?.id}
            buttons={["edit"]}
            baseUrl={`/admin/settings`}
            editUrl={`/admin/setting/${data?.id}/edit`}
            setHidden={setHidden}
          />
        ),
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await SettingService.make<SettingService>("admin").indexWithPagination(
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