"use client";
import Form from "@/components/common/ui/Form";
import Grid from "@/components/common/ui/Grid";
import ImageUploader from "@/components/common/ui/images/ImageUploader";
import KeyValueMultipleInput from "@/components/common/ui/inputs/KeyValueMultipleInput";
import FormSelect from "@/components/common/ui/selects/FormSelect";
import FormTextarea from "@/components/common/ui/text-inputs/FormTextarea";
import BloodGroupEnum from "@/enums/BloodGroupEnum";
import { RoleEnum } from "@/enums/RoleEnum";
import { getEnumValues } from "@/helpers/Enums";
import { Customer } from "@/models/Customer";
import { PatientService } from "@/services/PatientService";
import { useTranslations } from "next-intl";

const UpdatePatientForm = ({
  patient,
  onSuccess,
}: {
  patient?: Customer;
  onSuccess?: () => void;
}) => {
  const t = useTranslations("common.patient");
  const onSubmit = async (data: any) => {
    return PatientService.make(RoleEnum.DOCTOR).update(patient?.id, data);
  };
  return (
    <Form handleSubmit={onSubmit} onSuccess={onSuccess} defaultValues={patient}>
      <Grid>
        <FormSelect
          name={"blood_group"}
          items={getEnumValues(BloodGroupEnum)}
          defaultValue={patient?.blood_group}
          label={t("table.blood_group")}
        />
        <div className={"md:col-span-2"}>
          <KeyValueMultipleInput
            name={"other_data"}
            label={t("create.otherData")}
          />
        </div>
        <div className={"col-span-2"}>
          <FormTextarea
            name={"health_status"}
            label={t("create.healthStatus")}
          />
        </div>

        <div className={"col-span-2"}>
          <FormTextarea name={"notes"} label={t("create.notes")} />
        </div>

        <div className={"col-span-2"}>
          <ImageUploader
            name={"attachments"}
            label={t("create.attachments")}
            isMultiple={true}
            acceptedFileTypes={[
              "image/jpeg",
              "image/png",
              "image/jpeg",
              "application/pdf",
              "image/webp",
              "application/zip",
              "application/vnd.rar",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              "text/plain",
            ]}
          />
        </div>
      </Grid>
    </Form>
  );
};

export default UpdatePatientForm;
