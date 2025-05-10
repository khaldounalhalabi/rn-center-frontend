"use client";
import Form from "@/components/common/ui/Form";
import React from "react";
import Grid from "@/components/common/ui/Grid";
import FormInput from "@/components/common/ui/inputs/FormInput";
import { Navigate } from "@/actions/Navigate";
import { TransactionService } from "@/services/TransactionService";
import { Transaction } from "@/models/Transaction";
import FormDateTimePicker from "@/components/common/ui/date-time-pickers/FormDateTimePicker";
import FormTextarea from "@/components/common/ui/text-inputs/FormTextarea";
import { useTranslations } from "next-intl";
import { RoleEnum } from "@/enums/RoleEnum";
import FormSelect from "@/components/common/ui/selects/FormSelect";
import { getEnumValues } from "@/helpers/Enums";
import TransactionTypeEnum from "@/enums/TransactionTypeEnum";

const TransactionForm = ({
  defaultValues = undefined,
  type = "store",
}: {
  defaultValues?: Transaction;
  type?: "store" | "update";
}) => {
  const t = useTranslations("common.transaction.create");

  const handleSubmit = async (data: any) => {
    const service = TransactionService.make(RoleEnum.ADMIN);
    if (type === "update") {
      return await service.update(defaultValues?.id, data);
    }
    return await service.store(data);
  };
  const onSuccess = () => {
    Navigate(`/admin/transaction`);
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
          placeholder={"amount ... "}
          name={"amount"}
          label={t("amount")}
          required={true}
          type="number"
          unit={"iqd"}
        />
        <FormDateTimePicker
          required={true}
          name={"date"}
          label={`${t("date")} :`}
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
