"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { BlockedItemService } from "@/services/BlockedItemService";
import { BlockedItem } from "@/Models/BlockedItem";

const Page = () => {
  const tableData: DataTableData<BlockedItem> = {
    createUrl: `/admin/blocked-item/create`,
    title: `Blocked Items`,
    schema: [
      {
        name: "id",
        label: `id`,
        sortable: true,
      },
      {
        name: "type",
        label: `Type`,
        sortable: true,
        render: (type) => type?.replace("_", " "),
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
            buttons={["edit", "delete", "show"]}
            baseUrl={`/admin/blocked_items`}
            editUrl={`/admin/blocked-item/${data?.id}/edit`}
            showUrl={`/admin/blocked-item/${data?.id}`}
            setHidden={setHidden}
          />
        ),
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await BlockedItemService.make<BlockedItemService>(
        "admin",
      ).indexWithPagination(page, search, sortCol, sortDir, perPage, params),
  };
  return <DataTable {...tableData} />;
};

export default Page;