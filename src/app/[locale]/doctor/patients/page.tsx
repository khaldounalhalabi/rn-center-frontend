"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { PatientsService } from "@/services/PatientsService";
import { Customer } from "@/Models/Customer";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import SelectFilter from "@/components/common/ui/Selects/SelectFilter";
import {AppointmentStatusEnum} from "@/enum/AppointmentStatus";
import DatepickerFilter from "@/components/common/ui/Date/DatePickerFilter";
import {useTranslations} from "next-intl";

const Page = () => {
  const t = useTranslations('common.patient.table')
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
        name: "is_blocked",
        sortable: true,
        label: `${t("isBlocked")}`,
        render: (_is_blocked, user) => {
          return (
            <div className={`flex flex-col items-start`}>
              {user?.user?.is_blocked ? (
                <span className="badge badge-error">{t("blocked")}</span>
              ) : (
                <span className="badge badge-success">{t("notBlocked")}</span>
              )}
            </div>
          );
        },
      },
      {
        name: "is_archived",
        sortable: true,
        label: `${t("isArchived")}`,
        render: (_is_archived, user) => {
          return (
            <div className={`flex flex-col items-start`}>
              {user?.user?.is_archived ? (
                <span className="badge badge-neutral">{t("archived")}</span>
              ) : (
                <span className="badge badge-warning">{t("notArchived")}</span>
              )}
            </div>
          );
        },
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
            deleteMessage={'Deleting this record will delete just the stored medical details of this patient not his entire profile'}
          ></ActionsButtons>
        ),
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await PatientsService.make<PatientsService>("doctor").setHeaders({ filtered: true }).indexWithPagination(
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