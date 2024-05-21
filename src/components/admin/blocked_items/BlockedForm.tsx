"use client";
import Form from "@/components/common/ui/Form";
import React from "react";
import { Navigate } from "@/Actions/navigate";
import Grid from "@/components/common/ui/Grid";
import Input from "@/components/common/ui/Inputs/Input";
import { BlockedItemService } from "@/services/BlockedItemService";
import { BlockedItem } from "@/Models/BlockedItem";
import SelectPopOver from "@/components/common/ui/Selects/SelectPopOver";
import SelectPopOverFrom from "@/components/common/ui/Selects/SelectPopOverForm";

const BlockedForm = ({
  defaultValues = undefined,
  id,
  type = "store",
}: {
  defaultValues?: BlockedItem;
  id?: number;
  type?: "store" | "update";
}) => {
  const handleSubmit = async (data: any) => {
    if (
      type === "update" &&
      (defaultValues?.id != undefined || id != undefined)
    ) {
      console.log(data);
      return BlockedItemService.make<BlockedItemService>("admin")
        .update(defaultValues?.id ?? id, data)
        .then((res) => {
          return res;
        });
    } else {
      return await BlockedItemService.make<BlockedItemService>("admin").store(
        data,
      );
    }
  };
  const onSuccess = () => {
    Navigate(`/admin/blocked-item`);
  };

  const types = ["email", "phone", "full_name"];

  return (
    <Form
      handleSubmit={handleSubmit}
      onSuccess={onSuccess}
      defaultValues={defaultValues}
    >
      <Grid md={"2"}>
        <SelectPopOverFrom
          label={"Type"}
          id={2}
          required={true}
          ArraySelect={types}
          name={"type"}
          status={defaultValues?.type ?? "email"}
        />
        <Input
          required={true}
          type={"text"}
          placeholder={"John"}
          label={`Value`}
          name={"value"}
        />
      </Grid>
    </Form>
  );
};

export default BlockedForm;
