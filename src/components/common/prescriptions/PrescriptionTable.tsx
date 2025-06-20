import ActionsButtons, {
  Buttons,
} from "@/components/common/Datatable/ActionsButtons";
import DataTable, {
  DataTableData,
  DataTableSchema,
} from "@/components/common/Datatable/DataTable";
import TranslatableEnum from "@/components/common/ui/labels-and-values/TranslatableEnum";
import LoadingSpin from "@/components/icons/LoadingSpin";
import Pencil from "@/components/icons/Pencil";
import { Button } from "@/components/ui/shadcn/button";
import { RoleEnum } from "@/enums/RoleEnum";
import useUser from "@/hooks/UserHook";
import { Prescription } from "@/models/Prescriptions";
import { Link } from "@/navigation";
import { PrescriptionService } from "@/services/PrescriptionsServise";
import { useTranslations } from "next-intl";

const PrescriptionTable = ({ patientId }: { patientId: number }) => {
  const t = useTranslations("common.prescription.table");
  const { user } = useUser();
  const schema: DataTableSchema<Prescription>[] = [
    {
      name: "clinic.user.full_name",
      label: t("doctorName"),
    },
    {
      name: "appointment.date_time",
      label: t("appointment_date"),
      render: (appointmentDate, prescription) =>
        appointmentDate &&
        (prescription?.appointment?.clinic_id == user?.clinic?.id ||
          user?.role == RoleEnum.ADMIN) ? (
          <Link
            href={`/${user?.role}/appointment/${prescription?.appointment_id}`}
            className={"btn"}
          >
            <Button variant={"outline"} type={"button"}>
              {appointmentDate}
            </Button>
          </Link>
        ) : (
          appointmentDate ?? <TranslatableEnum value={"no_data"} />
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
      render: (_data, fullObject, setHidden, revalidate) => {
        let actions: Buttons[];
        if (
          user?.role == RoleEnum.DOCTOR &&
          fullObject?.clinic_id == user?.clinic?.id
        ) {
          actions = ["show", "delete"];
        } else {
          actions = ["show"];
        }
        return (
          <ActionsButtons
            buttons={actions}
            baseUrl={`/${user?.role}/customers/prescriptions`}
            showUrl={`/${user?.role}/patients/${fullObject?.customer_id}/prescriptions/${fullObject?.id}`}
            deleteUrl={`/${user?.role}/prescriptions/${fullObject?.id}`}
            setHidden={setHidden}
            data={fullObject}
            deleteHandler={() => (revalidate ? revalidate() : null)}
          >
            {user?.role == RoleEnum.DOCTOR &&
              fullObject?.clinic_id == user?.clinic?.id && (
                <Link
                  href={`/doctor/patients/${patientId}/prescriptions/${fullObject?.id}/edit`}
                >
                  <Button size={"icon"} type={"button"} variant={"secondary"}>
                    <Pencil />
                  </Button>
                </Link>
              )}
          </ActionsButtons>
        );
      },
    },
  ];

  const table: DataTableData<Prescription> = {
    createUrl:
      user?.role == RoleEnum.DOCTOR
        ? `/doctor/patients/${patientId}/prescriptions/create`
        : undefined,
    schema: schema,
    api: (page, search, sortCol, sortDir, perPage, params) =>
      PrescriptionService.make(user?.role).getAllPatientPrescriptions(
        patientId,
        page,
        search,
        sortCol,
        sortDir,
        perPage,
        params,
      ),
  };

  return user?.role && user.role != RoleEnum.PUBLIC ? (
    <DataTable {...table} />
  ) : (
    <LoadingSpin />
  );
};

export default PrescriptionTable;
