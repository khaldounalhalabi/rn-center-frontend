import ActionsButtons, {
  Buttons,
} from "@/components/common/Datatable/ActionsButtons";
import DataTable, {
  DataTableData,
  DataTableSchema,
} from "@/components/common/Datatable/DataTable";
import MedicalRecordFormSheet from "@/components/common/medical-records/MedicalRecordFormSheet";
import MedicalRecordShowSheet from "@/components/common/medical-records/MedicalRecordShowSheet";
import { RoleEnum } from "@/enums/RoleEnum";
import MedicalRecord from "@/models/MedicalRecord";
import MedicalRecordService from "@/services/MedicalRecordService";
import { useTranslations } from "next-intl";

const MedicalRecordsTable = ({
  patientId,
  role,
}: {
  patientId: number;
  role: RoleEnum;
}) => {
  const t = useTranslations("medical_records");
  const schema: DataTableSchema<MedicalRecord>[] = [
    {
      name: "id",
      label: "ID",
      sortable: true,
    },
    {
      name: "summary",
      label: t("summary"),
      sortable: true,
    },
    {
      label: t("actions"),
      render: (data, fullObject, setHidden, revalidate) => {
        let options: Buttons[] = [];

        if (fullObject?.can_delete) {
          options.push("delete");
        }

        return (
          <ActionsButtons
            buttons={options}
            baseUrl={`/${role}/medical-records`}
            data={fullObject}
            setHidden={setHidden}
            reverse
          >
            {fullObject?.can_update && (
              <MedicalRecordFormSheet
                patientId={patientId}
                type={"update"}
                medicalRecord={fullObject}
                success={revalidate}
              />
            )}
            <MedicalRecordShowSheet medicalRecord={fullObject} />
          </ActionsButtons>
        );
      },
    },
  ];

  const datatable: DataTableData<MedicalRecord> = {
    schema: schema,
    api: (page, search, sortCol, sortDir, perPage, params) =>
      MedicalRecordService.make(role).getByPatient(
        patientId,
        page,
        search,
        sortCol,
        sortDir,
        perPage,
        params,
      ),
    extraButton: (revalidate) =>
      role == RoleEnum.DOCTOR && (
        <MedicalRecordFormSheet
          patientId={patientId}
          type={"store"}
          success={revalidate}
        />
      ),
  };
  return <DataTable {...datatable} />;
};

export default MedicalRecordsTable;
