"use client";
import Form from "@/components/common/ui/Form";
import React from "react";
import TranslatableInput from "@/components/common/ui/Inputs/TranslatableInput";
import { Navigate } from "@/Actions/navigate";
import Grid from "@/components/common/ui/Grid";
import { useTranslations } from "next-intl";
import { SubscriptionsService } from "@/services/SubscriptionsService";
import { Subscriptions } from "@/Models/Subscriptions";
import Input from "@/components/common/ui/Inputs/Input";
import Textarea from "@/components/common/ui/textArea/Textarea";

const SubscriptionForm = ({
  defaultValues = undefined,
  id,
  type = "store",
}: {
  defaultValues?: Subscriptions;
  id?: number;
  type?: "store" | "update";
}) => {
  const handleSubmit = async (data: any) => {
    if (
      type === "update" &&
      (defaultValues?.id != undefined || id != undefined)
    ) {
      console.log(data);
      return SubscriptionsService.make<SubscriptionsService>("admin")
        .update(defaultValues?.id ?? id, data)
        .then((res) => {
          return res;
        });
    } else {
      return await SubscriptionsService.make<SubscriptionsService>(
        "admin",
      ).store(data);
    }
  };
  const onSuccess = () => {
    Navigate(`/admin/subscriptions`);
  };
  return (
    <Form
      handleSubmit={handleSubmit}
      onSuccess={onSuccess}
      defaultValues={defaultValues}
    >
      <Grid md={"2"}>
        <Input
          required={true}
          type={"text"}
          placeholder={"John"}
          label={`Name`}
          name={"name"}
        />
        <Input
          required={true}
          type={"number"}
          placeholder={"John"}
          label={`Period`}
          name={"period"}
          unit={"month"}
        />
        <Input
          type={"number"}
          placeholder={"John"}
          label={`Allow Period`}
          name={"allow_period"}
          unit={"day"}
        />
        <Input
          required={true}
          unit={"IQD"}
          type={"number"}
          placeholder={"John"}
          label={`Cost`}
          name={"cost"}
        />
      </Grid>
      <Textarea name={"description"} required={true} label={"Description"} />
    </Form>
  );
};

export default SubscriptionForm;
