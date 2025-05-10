"use client";
import Form from "@/components/common/ui/Form";
import React from "react";
import Grid from "@/components/common/ui/Grid";
import { Medicine } from "@/Models/Medicine";
import FormInput from "@/components/common/ui/inputs/FormInput";
import Textarea from "@/components/common/ui/text-inputs/Textarea";
import { useTranslations } from "next-intl";
import { MedicineService } from "@/services/MedicinesSevice";
import { RoleEnum } from "@/enum/RoleEnum";
import { Navigate } from "@/Actions/navigate";

const MedicineForm = ({
  defaultValues = undefined,
  type = "store",
}: {
  defaultValues?: Medicine;
  type?: "store" | "update" | "prescription";
}) => {
  const t = useTranslations("common.medicine.create");
  const handleSubmit = async (data: any) => {
    const service = MedicineService.make(RoleEnum.ADMIN);

    if (type == "store") {
      return await service.store(data);
    }

    return await service.update(defaultValues?.id, data);
  };

  return (
    <Form
      handleSubmit={handleSubmit}
      defaultValues={defaultValues}
      onSuccess={() => {
        Navigate("/admin/medicines");
      }}
    >
      <Grid md={"2"}>
        <FormInput name={"name"} label={t("medicineName")} type="text" />
        <FormInput type={"number"} name={"quantity"} label={t("quantity")} />
        <FormInput type={"text"} name={"barcode"} label={t("barcode_value")} />
      </Grid>
      <Textarea
        label={t("description")}
        name={"description"}
        defaultValue={defaultValues ? defaultValues?.description : undefined}
      />
    </Form>
  );
};

export default MedicineForm;
