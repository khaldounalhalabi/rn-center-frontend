import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import React from "react";
import { CustomerService } from "@/services/CustomerService";
import { Recent } from "@/Models/Customer";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import {useTranslations} from "next-intl";

const TableRecent = () => {
  const t = useTranslations('common.dashboard')

  const tableData: DataTableData<Recent> = {
    title: `${t("recentPatientsRegistration")}`,
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
        name: "total_appointments",
        label: `${t("totalAppointments")}`,
        sortable: true,
      },
      {
        name: "created_at",
        label: `${t("registeredOn")}`,
        sortable: true,
      },
      {
        label: `${t("actions")}`,
        render: (_undefined, data, setHidden) => (
          <ActionsButtons
            id={data?.id}
            buttons={["edit", "show"]}
            baseUrl={`/admin/`}
            editUrl={`/admin/patients/${data?.id}/edit`}
            showUrl={`/admin/patients/${data?.id}`}
            setHidden={setHidden}
          ></ActionsButtons>
        ),
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await CustomerService.make<CustomerService>("admin").getRecent(
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

export default TableRecent;