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
import {Customer} from "@/Models/Customer";

const PrescriptionsTable = ({
  appointment,
    userType="admin",
                              patient
}: {
  appointment?: Appointment | null | undefined;
  userType?: "admin"|"doctor"|"customer"
  patient?:Customer|undefined
}) => {




  const tableData: DataTableData<Prescription> = userType == "admin" ?
      {
    createUrl: `/${userType}/appointment/${appointment?.id}/prescriptions/create`,
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
        label: "Patient",
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
        label: "Next Visit",
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
        label: `Actions`,
        render: (_undefined, data, setHidden) => (
          <ActionsButtons
            id={data?.id}
            buttons={["edit", "delete", "show"]}
            baseUrl={`/${userType}/prescriptions`}
            editUrl={`/${userType}/appointment/${appointment?.id}/prescriptions/${data?.id}/edit`}
            showUrl={`/${userType}/appointment/${appointment?.id}/prescriptions/${data?.id}`}
            setHidden={setHidden}
          />
        ),
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await PrescriptionService.make<PrescriptionService>(
        userType,
      ).getAllAppointmentPrescriptions(
        appointment?.id ?? 0,
        page,
        search,
        sortCol,
        sortDir,
        perPage,
        params,
      ),
  }:userType == "doctor"?
          {
    createUrl: `/${userType}/appointment/${appointment?.id}/prescriptions/create`,
    title: `Prescriptions`,
    schema: [
      {
        name: "id",
        label: `id`,
        sortable: true,
      },
      {
        name: "customer.user.first_name",
        sortable: true,
        label: "Patient",
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
        label: "Next Visit",
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
        label: `Actions`,
        render: (_undefined, data, setHidden) => (
            <ActionsButtons
                id={data?.id}
                buttons={["edit", "delete", "show"]}
                baseUrl={`/${userType}/prescriptions`}
                editUrl={`/${userType}/appointment/${appointment?.id}/prescriptions/${data?.id}/edit`}
                showUrl={`/${userType}/appointment/${appointment?.id}/prescriptions/${data?.id}`}
                setHidden={setHidden}
            />
        ),
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
        await PrescriptionService.make<PrescriptionService>(
            userType,
        ).getAllAppointmentPrescriptions(
            appointment?.id ?? 0,
            page,
            search,
            sortCol,
            sortDir,
            perPage,
            params,
        ),
  }:
          {
    createUrl: `/doctor/patients/${patient?.id}/prescriptions/create`,
    title: `Prescriptions`,
    schema: [
      {
        name: "id",
        label: `id`,
        sortable: true,
      },
      {
        name: "customer.user.first_name",
        sortable: true,
        label: "Patient",
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
        label: "Next Visit",
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
        label: `Actions`,
        render: (_undefined, data, setHidden) => (
            <ActionsButtons
                id={data?.id}
                buttons={["edit", "delete", "show"]}
                baseUrl={`/doctor/prescriptions`}
                editUrl={`/doctor/patients/${patient?.id}/prescriptions/${data?.id}/edit`}
                showUrl={`/doctor/patients/${patient?.id}/prescriptions/${data?.id}`}
                setHidden={setHidden}
            />
        ),
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
        await PrescriptionService.make<PrescriptionService>(
            "doctor",
        ).getAllPatientPrescriptions(
            patient?.id ?? 0,
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