"use client";
import Form from "@/components/common/ui/Form";
import React from "react";
import Grid from "@/components/common/ui/Grid";
import Input from "@/components/common/ui/Inputs/Input";
import { Navigate } from "@/Actions/navigate";
import { TransactionService } from "@/services/TransactionService";
import { Transaction } from "@/Models/Transaction";
import DateTimePickerRang from "@/components/common/ui/date-time-pickers/DateTimePickerRang";
import Textarea from "@/components/common/ui/textArea/Textarea";
import { useTranslations } from "next-intl";
import { RoleEnum } from "@/enum/RoleEnum";
import FormSelect from "@/components/common/ui/selects/FormSelect";
import { getEnumValues } from "@/Helpers/Enums";
import TransactionTypeEnum from "@/enum/TransactionTypeEnum";

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
        <Input
          placeholder={"amount ... "}
          name={"amount"}
          label={t("amount")}
          required={true}
          type="number"
          unit={"iqd"}
        />
        <DateTimePickerRang
          required={true}
          name={"date"}
          label={`${t("date")} :`}
        />
      </Grid>
      <Textarea
        label={t("notes")}
        name={"description"}
        defaultValue={defaultValues?.description ?? ""}
      />
    </Form>
  );
};

export default TransactionForm;
