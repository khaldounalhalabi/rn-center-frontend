"use client";
import Form from "@/components/common/ui/Form";
import React from "react";
import { Navigate } from "@/Actions/navigate";
import Grid from "@/components/common/ui/Grid";
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
          placeholder={"Subscription Name"}
          label={`Name`}
          name={"name"}
        />
        <div>
          <Input
            required={true}
            type={"number"}
            placeholder={"12"}
            label={`Period`}
            name={"period"}
            unit={"month"}
            min={-1}
          />
          <p className={"text-sm my-1"}>for lifetime period put -1</p>
        </div>
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
