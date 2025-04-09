"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { PatientsService } from "@/services/PatientsService";
import { Customer } from "@/Models/Customer";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations("common.patient.table");
  const tableData: DataTableData<Customer> = {
    createUrl: `/doctor/patients/create`,
    title: `${t("patients")}`,
    schema: [
      {
        name: "id",
        label: `id`,
        sortable: true,
      },
      {
        name: "user",
        label: `${t("patientName")}`,
        sortable: true,
        render: (_first_name, patient) => {
          return (
            <p>
              {TranslateClient(patient?.user?.first_name)}{" "}
              {TranslateClient(patient?.user?.middle_name)}{" "}
              {TranslateClient(patient?.user?.last_name)}
            </p>
          );
        },
      },
      {
        name: "user.email",
        label: `${t("email")}`,
        sortable: true,
      },
      {
        name: "user.age",
        label: `${t("age")}`,
        sortable: true,
      },
      {
        label: `${t("actions")}`,
        render: (_undefined, data, undefined, revalidate) => (
          <ActionsButtons
            id={data?.id}
            buttons={["edit", "delete", "show"]}
            baseUrl={`/doctor/customers`}
            editUrl={`/doctor/patients/${data?.id}/edit`}
            showUrl={`/doctor/patients/${data?.id}`}
            deleteMessage={t("delete_profile_warning")}
          ></ActionsButtons>
        ),
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await PatientsService.make<PatientsService>("doctor")
        .setHeaders({ filtered: true })
        .indexWithPagination(page, search, sortCol, sortDir, perPage, params),
  };
  return <DataTable {...tableData} />;
};

export default Page;
