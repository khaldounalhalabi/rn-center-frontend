import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import React from "react";
import { CustomerService } from "@/services/CustomerService";
import { Recent } from "@/Models/Customer";
import {TranslateClient} from "@/Helpers/TranslationsClient";

const TableRecent = () => {
  const tableData: DataTableData<Recent> = {
    title: `Recent Patients Registration`,
    schema: [
      {
        name: "id",
        label: `id`,
        sortable: true,
      },
      {
        name: "user",
        label: `Patient Name`,
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
        label: `Total Appointments`,
        sortable: true,
      },
      {
        name: "created_at",
        label: `Registered On`,
        sortable: true,
      },
      {
        label: `${"Actions"}`,
        render: (_undefined, data, setHidden) => (
          <ActionsButtons
            id={data?.id}
            buttons={["edit", "show"]}
            baseUrl={`/admin/`}
            editUrl={`/admin/patients/${data?.id}/edit`}
            showUrl={`/admin/patients/${data?.id}`}
            setHidden={setHidden}
          >
          </ActionsButtons>
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

export default TableRecent