"use client";
import Form from "@/components/common/ui/Form";
import React from "react";
import Grid from "@/components/common/ui/Grid";
import FormInput from "@/components/common/ui/inputs/FormInput";
import { Navigate } from "@/actions/Navigate";
import { TransactionService } from "@/services/TransactionService";
import { Transaction } from "@/models/Transaction";
import FormTextarea from "@/components/common/ui/text-inputs/FormTextarea";
import { useTranslations } from "next-intl";
import { RoleEnum } from "@/enums/RoleEnum";
import FormSelect from "@/components/common/ui/selects/FormSelect";
import { getEnumValues } from "@/helpers/Enums";
import TransactionTypeEnum from "@/enums/TransactionTypeEnum";

const TransactionForm = ({
  defaultValues = undefined,
  type = "store",
  role,
}: {
  defaultValues?: Transaction;
  type?: "store" | "update";
  role: RoleEnum;
}) => {
  const t = useTranslations("common.transaction.create");

  const handleSubmit = async (data: any) => {
    const service = TransactionService.make(role);
    if (type === "update") {
      return await service.update(defaultValues?.id, data);
    }
    return await service.store(data);
  };
  const onSuccess = () => {
    Navigate(`/${role}/transaction`);
  };

  return (
    <Form
      handleSubmit={handleSubmit}
      onSuccess={onSuccess}
      defaultValues={defaultValues}
    >
      <Grid md={"2"}>
        <FormSelect
          name={"type"}
          items={getEnumValues(TransactionTypeEnum)}
          label={`${t("type")}`}
          defaultValue={defaultValues?.type}
        />
        <FormInput
          name={"amount"}
          label={t("amount")}
          required={true}
          type="number"
        />
        <FormInput
          required={true}
          name={"date"}
          label={`${t("date")} :`}
          type={"datetime-local"}
        />
      </Grid>
      <FormTextarea
        label={t("notes")}
        name={"description"}
        defaultValue={defaultValues?.description ?? ""}
      />
    </Form>
  );
};

export default TransactionForm;
