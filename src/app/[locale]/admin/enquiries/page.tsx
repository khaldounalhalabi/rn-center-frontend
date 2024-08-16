"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { EnquiriesService } from "@/services/EnquiriesService";
import { Enquiries } from "@/Models/Enquiries";
import ReplyButton from "@/components/admin/enquiries/ReplyButton";

const Page = () => {
  const tableData: DataTableData<Enquiries> = {
    title: `Enquiries`,
    schema: [
      {
        name: "id",
        label: `id`,
        sortable: true,
      },
      {
        name: "name",
        label: `Name`,
        sortable: true,
      },
      {
        name: "email",
        label: `Email`,
        sortable: true,
      },
      {
        name: "read_at",
        label: "Read At",
        sortable: true,
      },
      {
        label: `Actions`,
        render: (_undefined, data, setHidden) => (
          <ActionsButtons
            id={data?.id}
            buttons={["delete", "show"]}
            baseUrl={`/admin/enquiries`}
            showUrl={`/admin/enquiries/${data?.id}`}
            setHidden={setHidden}
          >
            <ReplyButton id={data?.id ?? 0} />
          </ActionsButtons>
        ),
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await EnquiriesService.make<EnquiriesService>(
        "admin",
      ).indexWithPagination(page, search, sortCol, sortDir, perPage, params),
  };
  return <DataTable {...tableData} />;
};

export default Page;
