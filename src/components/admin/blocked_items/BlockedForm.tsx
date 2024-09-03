"use client";
import Form from "@/components/common/ui/Form";
import React from "react";
import { Navigate } from "@/Actions/navigate";
import Grid from "@/components/common/ui/Grid";
import Input from "@/components/common/ui/Inputs/Input";
import { BlockedItemService } from "@/services/BlockedItemService";
import { BlockedItem } from "@/Models/BlockedItem";
import SelectPopOverFrom from "@/components/common/ui/Selects/SelectPopOverForm";
import {useTranslations} from "next-intl";

const BlockedForm = ({
  defaultValues = undefined,
  id,
  type = "store",
}: {
  defaultValues?: BlockedItem;
  id?: number;
  type?: "store" | "update";
}) => {
  const t = useTranslations("admin.block")

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
          label={t("type")}
          required={true}
          ArraySelect={types}
          name={"type"}
          status={defaultValues?.type ?? "email"}
          handleSelect={() => undefined}
        />
        <Input
          required={true}
          type={"text"}
          placeholder={"John"}
          label={t("value")}
          name={"value"}
        />
      </Grid>
    </Form>
  );
};

export default BlockedForm;