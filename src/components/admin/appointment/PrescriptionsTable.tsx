"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import { Prescription } from "@/Models/Prescriptions";
import { PrescriptionService } from "@/services/PrescriptionsServise";
import { Appointment } from "@/Models/Appointment";
import { useTranslations } from "next-intl";

const PrescriptionsTable = ({
  appointment,
}: {
  appointment?: Appointment | null | undefined;
}) => {
  const t = useTranslations("common.prescription.table");
  console.log(appointment?.id);

  const tableData: DataTableData<Prescription> = {
    createUrl: `/admin/appointment/${appointment?.id}/prescriptions/create`,
    title: `${t("prescriptions")}`,
    schema: [
      {
        name: "id",
        label: `id`,
        sortable: true,
      },
      {
        name: "clinic.name",
        sortable: true,
        label: `${t("clinicName")}`,
        translatable: true,
      },
      {
        name: "clinic.user.first_name",
        sortable: true,
        label: `${t("doctorName")}`,
        render: (_first_name, prescriptions) => {
          return (
            <p>
              {TranslateClient(prescriptions?.clinic?.user?.first_name)}{" "}
              {TranslateClient(prescriptions?.clinic?.user?.middle_name)}{" "}
              {TranslateClient(prescriptions?.clinic?.user?.last_name)}
            </p>
          );
        },
      },
      {
        name: "customer.user.first_name",
        sortable: true,
        label: `${t("patientName")}`,
        render: (_first_name, prescriptions) => {
          return (
            <div className={`flex flex-col items-start`}>
              <p>
                {TranslateClient(prescriptions?.customer?.user?.first_name)}{" "}
                {TranslateClient(prescriptions?.customer?.user?.middle_name)}{" "}
                {TranslateClient(prescriptions?.customer?.user?.last_name)}
              </p>
            </div>
          );
        },
      },
      {
        name: "next_visit",
        label: `${t("nextVisit")}`,
        render: (_next_visit, prescriptions) => {
          const Next = prescriptions?.next_visit;
          return (
            <p>
              {Next?.replace(/\D/g, "")} {Next?.replace(/\d/g, "")}
            </p>
          );
        },
      },
      {
        label: `${t("actions")}`,
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
      ).getAllAppointmentPrescriptions(
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
