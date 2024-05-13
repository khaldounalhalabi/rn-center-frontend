"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { translate } from "@/Helpers/Translations";
import { Prescription } from "@/Models/Prescriptions";
import { PrescriptionService } from "@/services/PrescriptionsServise";
import { Appointment } from "@/Models/Appointment";

const PrescriptionsTable = ({
  appointment,
}: {
  appointment?: Appointment | null | undefined;
}) => {
  const tableData: DataTableData<Prescription> = {
    createUrl: `/admin/appointment/${appointment?.id}/prescriptions/create`,
    title: `Prescriptions`,
    schema: [
      {
        name: "id",
        label: `id`,
        sortable: true,
      },
      {
        name: "clinic.name",
        sortable: true,
        label: "Clinic Name",
        translatable: true,
      },
      {
        name: "clinic.user.first_name",
        sortable: true,
        label: "Doctor Name",
        render: (_first_name, prescriptions) => {
          return (
            <p>
              {translate(prescriptions?.clinic?.user?.first_name)}{" "}
              {translate(prescriptions?.clinic?.user?.middle_name)}{" "}
              {translate(prescriptions?.clinic?.user?.last_name)}
            </p>
          );
        },
      },
      {
        name: "customer.user.first_name",
        sortable: true,
        label: "Patient",
        render: (_first_name, prescriptions) => {
          return (
            <div className={`flex flex-col items-start`}>
              <p>
                {translate(prescriptions?.customer?.user?.first_name)}{" "}
                {translate(prescriptions?.customer?.user?.middle_name)}{" "}
                {translate(prescriptions?.customer?.user?.last_name)}
              </p>
            </div>
          );
        },
      },
      {
        name: "next_visit",
        label: "Next Visit",
      },
      {
        label: `Actions`,
        render: (_undefined, data, setHidden) => (
          <ActionsButtons
            id={data?.id}
            buttons={["edit", "delete", "show"]}
            baseUrl={`/admin/prescriptions`}
            editUrl={`/admin/appointment/${appointment?.id}/prescriptions/${data?.id}/edit`}
            showUrl={`/admin/appointment/${appointment?.id}/prescriptions/${data?.id}`}
            setHidden={setHidden}
          />
        ),
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await PrescriptionService.make<PrescriptionService>(
        "admin",
      ).getAllPrescriptions(
        appointment?.id ?? 0,
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

export default PrescriptionsTable;
