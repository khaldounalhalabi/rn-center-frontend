"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { PatientService } from "@/services/PatientService";
import { Customer } from "@/models/Customer";
import { useTranslations } from "next-intl";
import { RoleEnum } from "@/enums/RoleEnum";

const Page = () => {
  const t = useTranslations("common.patient.table");
  const tableData: DataTableData<Customer> = {
    createUrl: `/admin/patients/create`,
    title: `${t("patients")}`,
    schema: [
      {
        name: "id",
        label: `id`,
        sortable: true,
      },
      {
        name: "user.full_name",
        label: `${t("patientName")}`,
        sortable: true,
      },
      {
        name: "user.phone",
        label: `${t("phone")}`,
      },
      {
        name: "user.gender",
        label: `${t("gender")}`,
      },
      {
        name: "blood_group",
        label: `${t("blood_group")}`,
        sortable: true,
      },
      {
        name: "age",
        label: `${t("age")}`,
      },
      {
        label: `${t("actions")}`,
        render: (_undefined, data, setHidden, revalidate) => (
          <ActionsButtons
            id={data?.id}
            buttons={["edit", "delete", "show"]}
            baseUrl={`/admin/customers`}
            editUrl={`/admin/patients/${data?.id}/edit`}
            showUrl={`/admin/patients/${data?.id}`}
            setHidden={setHidden}
          />
        ),
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await PatientService.make<PatientService>(
        RoleEnum.ADMIN,
      ).indexWithPagination(page, search, sortCol, sortDir, perPage, params),
  };
  return <DataTable {...tableData} />;
};

export default Page;
