"use client";
import Form from "@/components/common/ui/Form";
import React from "react";
import { Navigate } from "@/Actions/navigate";
import Grid from "@/components/common/ui/Grid";
import Input from "@/components/common/ui/Inputs/Input";
import { Setting } from "@/Models/setting";
import { SettingService } from "@/services/SettingService";

const SettingForm = ({ defaultValues }: { defaultValues: Setting }) => {
  const handleSubmit = async (data: any) => {
    return await SettingService.make<SettingService>("admin")
      .update(defaultValues?.id, data)
      .then((res) => {
        if (res.code == 200) {
          Navigate(`/admin/setting`);
        }
        return res;
      });
  };

  return (
    <Form handleSubmit={handleSubmit} defaultValues={defaultValues}>
      <Grid md={2}>
        <Input
          required={true}
          name={"value"}
          label={defaultValues?.label?.replace(/_/g, " ")}
          placeholder={"value ...."}
          type="text"
          defaultValue={defaultValues ? defaultValues?.value : undefined}
        />
      </Grid>
    </Form>
  );
};

export default SettingForm;
