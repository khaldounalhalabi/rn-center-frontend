"use client";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import PageCard from "@/components/common/ui/PageCard";
import UpdatePatientForm from "@/components/doctor/patients/UpdatePatientForm";
import Pencil from "@/components/icons/Pencil";
import { Button } from "@/components/ui/shadcn/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/shadcn/sheet";
import { RoleEnum } from "@/enums/RoleEnum";
import { Customer } from "@/models/Customer";
import { PatientService } from "@/services/PatientService";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Revalidate } from "@/actions/Revalidate";
import DownloadPatientReportButton from "@/components/doctor/patients/DownloadPatientReportButton";

const Page = () => {
  const t = useTranslations("common.patient");
  const tableData: DataTableData<Customer> = {
    schema: [
      {
        name: "id",
        label: `id`,
        sortable: true,
      },
      {
        name: "user.full_name",
        label: `${t("table.patientName")}`,
        sortable: true,
      },
      {
        name: "user.phone",
        label: `${t("table.phone")}`,
      },
      {
        name: "user.gender",
        label: `${t("table.gender")}`,
      },
      {
        name: "blood_group",
        label: `${t("table.blood_group")}`,
        sortable: true,
      },
      {
        name: "age",
        label: `${t("table.age")}`,
      },
      {
        label: `${t("table.actions")}`,
        render: (_undefined, data, setHidden, revalidate) => {
          return (
            <ActionsButtons
              id={data?.id}
              buttons={["show"]}
              baseUrl={`/doctor/customers`}
              showUrl={`/doctor/patients/${data?.id}`}
              setHidden={setHidden}
            >
              <UpdatePatientSheet patient={data} revalidate={revalidate} />
              <DownloadPatientReportButton patient={data} />
            </ActionsButtons>
          );
        },
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await PatientService.make(RoleEnum.DOCTOR).indexWithPagination(
        page,
        search,
        sortCol,
        sortDir,
        perPage,
        params,
      ),
  };
  return (
    <PageCard title={t("table.patients")}>
      <DataTable {...tableData} />
    </PageCard>
  );
};

export default Page;

const UpdatePatientSheet = ({
  patient,
  revalidate,
}: {
  patient?: Customer;
  revalidate?: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const t = useTranslations("common.patient");
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant={"secondary"} size={"icon"} type={"button"}>
          <Pencil />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetTitle>{t("create.editPatient")}</SheetTitle>
        <UpdatePatientForm
          patient={patient}
          onSuccess={() => {
            if (revalidate) {
              revalidate();
            }
            setOpen(false);
            Revalidate(`/doctor/patients/${patient?.id}`)
          }}
        />
      </SheetContent>
    </Sheet>
  );
};
