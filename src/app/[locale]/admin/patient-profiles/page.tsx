"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { PatientProfilesService } from "@/services/PatientProfilesService";
import { PatientProfiles } from "@/Models/PatientProfiles";
import { TranslateClient } from "@/Helpers/TranslationsClient";

const Page = () => {
  const tableData: DataTableData<PatientProfiles> = {
    createUrl: `/admin/patient-profiles/create`,
    title: `Patient Profiles`,
    schema: [
      {
        name: "id",
        label: `id`,
        sortable: true,
      },
      {
        name: "clinic.name",
        label: `Clinic`,
        sortable: true,
        translatable: true,
      },
      {
        name: "customer.user.first_name",
        label: "Patient Name",
        sortable: true,
        render: (firstName, profile) => (
          <p>
            {TranslateClient(profile?.customer?.user?.first_name)}{" "}
            {TranslateClient(profile?.customer?.user?.middle_name)}{" "}
            {TranslateClient(profile?.customer?.user?.last_name)}
          </p>
        ),
      },
      {
        name: "updated_at",
        label: `Last Modify`,
        sortable: true,
      },

      {
        label: `Actions`,
        render: (_undefined, data, setHidden) => (
          <ActionsButtons
            id={data?.id}
            buttons={["edit", "show", "delete"]}
            baseUrl={`/admin/patient-profiles`}
            editUrl={`/admin/patient-profiles/${data?.id}/edit`}
            showUrl={`/admin/patient-profiles/${data?.id}`}
            setHidden={setHidden}
          ></ActionsButtons>
        ),
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await PatientProfilesService.make<PatientProfilesService>(
        "admin",
      ).indexWithPagination(page, search, sortCol, sortDir, perPage, params),
  };
  return <DataTable {...tableData} />;
};

export default Page;
