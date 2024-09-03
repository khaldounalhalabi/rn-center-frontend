"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { PatientProfilesService } from "@/services/PatientProfilesService";
import { PatientProfiles } from "@/Models/PatientProfiles";
import {useTranslations} from "next-intl";

const PatientProfilesTable = ({ id }: { id?: number }) => {
  const t = useTranslations('admin.patientsProfiles.table')
  const tableData: DataTableData<PatientProfiles> = {
    createUrl: `/admin/patients/${id}/patient-profiles/create`,
    title: `${t("patientsProfiles")}`,
    schema: [
      {
        name: "id",
        label: `id`,
        sortable: true,
      },
      {
        name: "clinic.name",
        label: `${t("clinicName")}`,
        sortable: true,
        translatable: true,
      },
      {
        name: "updated_at",
        label: `${t("lastModify")}`,
        sortable: true,
      },

      {
        label: `${t("actions")}`,
        render: (_undefined, data, setHidden) => (
          <ActionsButtons
            id={data?.id}
            buttons={["edit", "show", "delete"]}
            baseUrl={`/admin/patient-profiles`}
            editUrl={`/admin/patients/${id}/patient-profiles/${data?.id}/edit`}
            showUrl={`/admin/patients/${id}/patient-profiles/${data?.id}`}
            setHidden={setHidden}
          ></ActionsButtons>
        ),
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await PatientProfilesService.make<PatientProfilesService>(
        "admin",
      ).getCustomerPatientProfiles(
        id ?? 0,
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

export default PatientProfilesTable;