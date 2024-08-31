"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { BloodDonationService } from "@/services/BloodDonationService";
import { BloodDonation } from "@/Models/BloodDonation";
import {useTranslations} from "next-intl";

const Page = () => {
  const t = useTranslations("admin.blood")
  const tableData: DataTableData<BloodDonation> = {
    createUrl: `/admin/blood-donation/create`,
    title: `${t("bloodDonationRequests")}`,
    schema: [
      {
        name: "id",
        label: `id`,
        sortable: true,
      },
      {
        name: "full_name",
        label: `${t("name")}`,
        sortable: true,
      },
      {
        name: "blood_group",
        label: `${t("blood")}`,
        sortable: true,
      },
      {
        name: "city.name",
        label: `${t("city")}`,
        sortable: true,
        translatable: true,
      },
      {
        name: "can_wait_until",
        label: `${t("canWait")} ?`,
        sortable: true,
      },

      {
        label: `${t("actions")}`,
        render: (_undefined, data, setHidden) => (
          <ActionsButtons
            id={data?.id}
            buttons={["edit", "delete", "show"]}
            baseUrl={`/admin/blood-donation-requests`}
            editUrl={`/admin/blood-donation/${data?.id}/edit`}
            showUrl={`/admin/blood-donation/${data?.id}`}
            setHidden={setHidden}
          />
        ),
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await BloodDonationService.make<BloodDonationService>(
        "admin",
      ).indexWithPagination(page, search, sortCol, sortDir, perPage, params),
  };
  return <DataTable {...tableData} />;
};

export default Page;