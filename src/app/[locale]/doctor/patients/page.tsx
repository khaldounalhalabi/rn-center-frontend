"use client"
import React from "react";
import { useTranslations } from "next-intl";
import DataTable, { DataTableData } from "@/components/common/Datatable/DataTable";
import { Customer } from "@/models/Customer";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { PatientService } from "@/services/PatientService";
import { RoleEnum } from "@/enums/RoleEnum";
import PageCard from "@/components/common/ui/PageCard";

const Page = () => {
  const t = useTranslations("common.patient.table");
  const tableData: DataTableData<Customer> = {
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
            buttons={["show"]}
            baseUrl={`/doctor/customers`}
            showUrl={`/doctor/patients/${data?.id}`}
            setHidden={setHidden}
          />
        ),
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await PatientService.make(
        RoleEnum.DOCTOR,
      ).indexWithPagination(page, search, sortCol, sortDir, perPage, params),
  };
  return (
    <PageCard title={t("patients")}>
      <DataTable {...tableData} />
    </PageCard>
  );
};

export default Page;