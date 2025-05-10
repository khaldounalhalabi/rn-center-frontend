"use client";
import Form from "@/components/common/ui/Form";
import React from "react";
import { Navigate } from "@/Actions/navigate";
import { PatientService } from "@/services/PatientService";
import { Customer } from "@/Models/Customer";
import { useTranslations } from "next-intl";
import { RoleEnum } from "@/enum/RoleEnum";
import Grid from "@/components/common/ui/Grid";
import FormInput from "@/components/common/ui/inputs/FormInput";
import Radio from "@/components/common/ui/inputs/Radio";
import { getEnumValues } from "@/Helpers/Enums";
import GenderEnum from "@/enum/GenderEnum";
import TranslatableEnum from "@/components/common/ui/TranslatableEnum";
import FormDatepicker from "@/components/common/ui/date-time-pickers/FormDatepicker";
import FormSelect from "@/components/common/ui/selects/FormSelect";
import BloodGroupEnum from "@/enum/BloodGroupEnum";
import KeyValueMultipleInput from "@/components/common/ui/inputs/KeyValueMultipleInput";
import Textarea from "@/components/common/ui/text-inputs/Textarea";
import ImageUploader from "@/components/common/ui/ImageUploader";

const PatientsForm = ({
  customer = undefined,
  id,
  type = "store",
}: {
  customer?: Customer;
  id?: number;
  type?: "store" | "update";
}) => {
  const t = useTranslations("common.patient.create");
  const handleSubmit = async (data: any) => {
    if (type === "update" && (customer?.id != undefined || id != undefined)) {
      return PatientService.make<PatientService>(RoleEnum.ADMIN).update(
        customer?.id ?? id,
        data,
      );
    } else {
      return await PatientService.make<PatientService>(RoleEnum.ADMIN).store(
        data,
      );
    }
  };
  const onSuccess = () => {
    Navigate(`/admin/patients`);
  };
  return (
    <Form
      handleSubmit={handleSubmit}
      onSuccess={onSuccess}
      defaultValues={customer}
    >
      <Grid>
        <FormInput
          type={"text"}
          name={"first_name"}
          defaultValue={customer?.user?.first_name}
          label={t("firstName")}
        />
        <FormInput
          type={"text"}
          name={"last_name"}
          defaultValue={customer?.user?.last_name}
          label={t("lastName")}
        />
        <FormInput
          type={"tel"}
          name={"phone"}
          defaultValue={customer?.user?.phone}
          label={t("phone")}
        />
        <Radio
          label={t("gender")}
          name={"gender"}
          options={getEnumValues(GenderEnum).map((gender) => ({
            label: <TranslatableEnum value={gender} />,
            value: gender,
          }))}
        />
        <FormDatepicker
          name={"birth_date"}
          label={t("birthDate")}
          df={customer?.birth_date}
        />
        <FormSelect
          name={"blood_group"}
          items={getEnumValues(BloodGroupEnum)}
          defaultValue={customer?.blood_group}
          label={t("blood")}
        />
      </Grid>
      <KeyValueMultipleInput name={"other_data"} label={t("otherData")} />
      <Textarea
        name={"health_status"}
        label={t("healthStatus")}
        defaultValue={customer?.health_status}
      />

      <Textarea
        name={"notes"}
        label={t("notes")}
        defaultValue={customer?.notes}
      />

      <ImageUploader
        name={"attachments"}
        label={t("attachments")}
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
    </Form>
  );
};

export default PatientsForm;
