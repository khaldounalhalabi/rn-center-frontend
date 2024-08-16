"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { BloodDonationService } from "@/services/BloodDonationService";
import { BloodDonation } from "@/Models/BloodDonation";

const Page = () => {
  const tableData: DataTableData<BloodDonation> = {
    createUrl: `/admin/blood-donation/create`,
    title: `Blood Donation Requests`,
    schema: [
      {
        name: "id",
        label: `id`,
        sortable: true,
      },
      {
        name: "full_name",
        label: `Name`,
        sortable: true,
      },
      {
        name: "blood_group",
        label: `Blood Group`,
        sortable: true,
      },
      {
        name: "city.name",
        label: `City`,
        sortable: true,
        translatable: true,
      },
      {
        name: "can_wait_until",
        label: `Can Wait`,
        sortable: true,
      },

      {
        label: `Actions`,
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
