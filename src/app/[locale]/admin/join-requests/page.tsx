"use client";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import { JoinRequest } from "@/Models/JoinRequest";
import { useTranslations } from "next-intl";
import { JoinRequestService } from "@/services/JoinRequestService";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import DeleteCategoryButton from "@/components/common/ServiceCategory/DeleteCategoryButton";
import React from "react";

const Page = () => {
  const t = useTranslations("join_requests");
  const tableData: DataTableData<JoinRequest> = {
    title: t("join_requests"),
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await JoinRequestService.make<JoinRequestService>().indexWithPagination(
        page,
        search,
        sortCol,
        sortDir,
        perPage,
        params
      ),
    schema: [
      {
        name: "id",
        label: "ID",
      },
      {
        name: "doctor_name",
        label: t("doctor_name"),
      },
      {
        name: "clinic_name",
        label: t("clinic_name"),
      },
      {
        name: "phone_number",
        label: t("phone"),
      },
      {
        name: "city.name",
        label: t("city"),
        translatable: true,
      },
      {
        label: t("actions"),
        render: (_undefined, data, setHidden) => (
          <ActionsButtons
            id={data?.id}
            buttons={["delete", "show"]}
            baseUrl={`/admin/join-requests`}
            deleteUrl={`/admin/clinic-join-requests/${data?.id}`}
            setHidden={setHidden}
          ></ActionsButtons>
        ),
      },
    ],
  };

  return <DataTable {...tableData} />;
};
export default Page;
