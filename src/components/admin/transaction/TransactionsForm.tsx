"use client";
import Form from "@/components/common/ui/Form";
import React from "react";
import Grid from "@/components/common/ui/Grid";
import SelectPopOverFrom from "@/components/common/ui/Selects/SelectPopOverForm";
import Input from "@/components/common/ui/Inputs/Input";
import { Navigate } from "@/Actions/navigate";
import { TransactionService } from "@/services/TransactionService";
import { Transactions } from "@/Models/Transactions";
import TransactionTypeArray, { TransactionType } from "@/enum/TransactionType";
import DateTimePickerRang from "@/components/common/ui/Date/DateTimePickerRang";
import Textarea from "@/components/common/ui/textArea/Textarea";

const OfferForm = ({
  defaultValues = undefined,
  id,
  type = "store",
}: {
  defaultValues?: Transactions;
  id?: number;
  type?: "store" | "update";
}) => {
  const handleSubmit = async (data: any) => {
    console.log(data);

    if (
      type === "update" &&
      (defaultValues?.id != undefined || id != undefined)
    ) {
      return TransactionService.make<TransactionService>("admin")
        .update(defaultValues?.id ?? id, data)
        .then((res) => {
          console.log(res);
          return res;
        });
    } else {
      return await TransactionService.make<TransactionService>("admin")
        .store(data)
        .then((res) => {
          console.log(res);
          return res;
        });
    }
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
        <SelectPopOverFrom
          name={"type"}
          id={1}
          handleSelect={(type: string) => {}}
          status={defaultValues?.type ?? TransactionType.INCOME}
          ArraySelect={TransactionTypeArray()}
          required={true}
          label={"Type :"}
        />
        <Input
          placeholder={"amount ... "}
          name={"amount"}
          label={"Amount"}
          required={true}
          type="number"
          unit={"IQD"}
        />
        <DateTimePickerRang name={"date"} label={"Date :"} />
      </Grid>
      <Textarea
        label={"Description"}
        name={"description"}
        defaultValue={defaultValues?.description ?? ""}
      />
    </Form>
  );
};

export default OfferForm;