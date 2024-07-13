"use client";
import Form from "@/components/common/ui/Form";
import React from "react";
import { Navigate } from "@/Actions/navigate";
import Grid from "@/components/common/ui/Grid";
import { MedicineService } from "@/services/MedicinesSevice";
import { Medicine } from "@/Models/Medicines";
import ApiSelect from "@/components/common/ui/Selects/ApiSelect";
import { ClinicsService } from "@/services/ClinicsService";
import { Clinic } from "@/Models/Clinic";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import Input from "@/components/common/ui/Inputs/Input";
import Textarea from "@/components/common/ui/textArea/Textarea";
import { Setting } from "@/Models/setting";
import { SettingService } from "@/services/SettingService";

const SettingForm = ({ defaultValues }: { defaultValues: Setting }) => {
  const handleSubmit = async (data: any) => {
    return await SettingService.make<SettingService>("admin")
      .update(defaultValues?.id, data)
      .then((res) => {
        if (res.code == 200) {
          Navigate(`/admin/medicines`);
        }
        return res;
      });
  };

  return (
    <Form handleSubmit={handleSubmit} defaultValues={defaultValues}>
      <Grid md={"2"}>
        <label className="label">
          Label :
          <span className="bg-base-200 px-2 rounded-xl text-lg">
            {defaultValues?.label}
          </span>
        </label>
        <Input
          required={true}
          name={"value"}
          label={"Value :"}
          placeholder={"value ...."}
          type="text"
          defaultValue={defaultValues ? defaultValues?.value : undefined}
        />
      </Grid>
    </Form>
  );
};

export default SettingForm;