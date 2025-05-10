import DataTable, {
  DataTableData,
  DataTableSchema,
} from "@/components/common/Datatable/DataTable";
import { Prescription } from "@/models/Prescriptions";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { PrescriptionService } from "@/services/PrescriptionsServise";
import { RoleEnum } from "@/enum/RoleEnum";

const PrescriptionTable = ({ patientId }: { patientId: number }) => {
  const t = useTranslations("common.prescription.table");
  const schema: DataTableSchema<Prescription>[] = [
    {
      name: "clinic.user.full_name",
      render: (fullName, prescription) => (
        <Link
          href={`/admin/clinics/${prescription?.clinic_id}`}
          className={"btn"}
        >
          {fullName}
        </Link>
      ),
      label: t("doctorName"),
    },
    {
      name: "appointment.date_time",
      label: t("appointment_date"),
      render: (appointmentDate, prescription) =>
        appointmentDate && (
          <Link
            href={`/admin/clinics/${prescription?.appointment_id}`}
            className={"btn"}
          >
            {appointmentDate}
          </Link>
        ),
      sortable: true,
    },
    {
      name: "created_at",
      label: t("prescribed_at"),
      sortable: true,
    },
    {
      name: "next_visit",
      label: t("nextVisit"),
      sortable: true,
    },
    {
      label: t("actions"),
      render: (_data, fullObject) => (
        <ActionsButtons
          buttons={["show"]}
          baseUrl={"/admin/customers/prescriptions"}
          showUrl={`/admin/prescriptions/${fullObject?.id}`}
        />
      ),
    },
  ];

  const table: DataTableData<Prescription> = {
    schema: schema,
    api: (page, search, sortCol, sortDir, perPage, params) =>
      PrescriptionService.make(RoleEnum.ADMIN).getAllPatientPrescriptions(
        patientId,
        page,
        search,
        sortCol,
        sortDir,
        perPage,
        params,
      ),
  };

  return <DataTable {...table} />;
};

export default PrescriptionTable;
