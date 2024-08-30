"use client";
import React from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { PatientsService } from "@/services/PatientsService";
import { Customer } from "@/Models/Customer";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import ArchiveButton from "@/components/common/ArchiveButton";
import { UsersService } from "@/services/UsersService";
import BlockButton from "@/components/common/BlockButton";
import {useTranslations} from "next-intl";

const Page = () => {
  const t = useTranslations("common.patient.table")
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
        render: (_undefined, data, setHidden, revalidate) => (
          <ActionsButtons
            id={data?.id}
            buttons={["edit", "delete", "show"]}
            baseUrl={`/admin/customers`}
            editUrl={`/admin/patients/${data?.id}/edit`}
            showUrl={`/admin/patients/${data?.id}`}
            setHidden={setHidden}
          >
            <>
              <ArchiveButton
                data={data}
                id={data?.user_id}
                api={UsersService}
                revalidate={revalidate}
                user={"admin"}
              />
              <BlockButton
                data={data}
                id={data?.user_id}
                api={UsersService}
                revalidate={revalidate}
                user={"admin"}
              />
            </>
          </ActionsButtons>
        ),
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await PatientsService.make<PatientsService>("admin").indexWithPagination(
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