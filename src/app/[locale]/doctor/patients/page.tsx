"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { PatientsService } from "@/services/PatientsService";
import { Customer } from "@/Models/Customer";
import { TranslateClient } from "@/Helpers/TranslationsClient";

const Page = () => {
  const tableData: DataTableData<Customer> = {
    createUrl: `/doctor/patients/create`,
    title: `Patients`,
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
        name: "user.email",
        label: `Email`,
        sortable: true,
      },
      {
        name: "user.age",
        label: `Age`,
        sortable: true,
      },
      {
        name: "is_blocked",
        sortable: true,
        label: "is Blocked",
        render: (_is_blocked, user) => {
          return (
            <div className={`flex flex-col items-start`}>
              {user?.user?.is_blocked ? (
                <span className="badge badge-error">Blocked</span>
              ) : (
                <span className="badge badge-success">Not Blocked</span>
              )}
            </div>
          );
        },
      },
      {
        name: "is_archived",
        sortable: true,
        label: "is Archived",
        render: (_is_archived, user) => {
          return (
            <div className={`flex flex-col items-start`}>
              {user?.user?.is_archived ? (
                <span className="badge badge-neutral">Archived</span>
              ) : (
                <span className="badge badge-warning">Not Archived</span>
              )}
            </div>
          );
        },
      },
      {
        label: `Actions`,
        render: (_undefined, data, setHidden, revalidate) => (
          <ActionsButtons
            id={data?.id}
            buttons={["edit", "delete", "show"]}
            baseUrl={`/doctor/customers`}
            editUrl={`/doctor/patients/${data?.id}/edit`}
            showUrl={`/doctor/patients/${data?.id}`}
            setHidden={setHidden}
          ></ActionsButtons>
        ),
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await PatientsService.make<PatientsService>("doctor").indexWithPagination(
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

export default Page;
