"use client";
import Form from "@/components/common/ui/Form";
import React, { useState } from "react";
import { Navigate } from "@/Actions/navigate";
import Grid from "@/components/common/ui/Grid";
import { SubscriptionsService } from "@/services/SubscriptionsService";
import { Subscriptions } from "@/Models/Subscriptions";
import Input from "@/components/common/ui/Inputs/Input";
import Textarea from "@/components/common/ui/textArea/Textarea";
import SelectPopOverFrom from "@/components/common/ui/Selects/SelectPopOverForm";
import SubscriptionPeriodUnitArray from "@/enum/SubscriptionPeriodUnit";
import { useTranslations } from "next-intl";

const SubscriptionForm = ({
  defaultValues = undefined,
  id,
  type = "store",
}: {
  defaultValues?: Subscriptions;
  id?: number;
  type?: "store" | "update";
}) => {
  const t = useTranslations("admin.subscription.create");

  const handleSubmit = async (data: any) => {
    if (
      type === "update" &&
      (defaultValues?.id != undefined || id != undefined)
    ) {
      return SubscriptionsService.make<SubscriptionsService>("admin").update(
        defaultValues?.id ?? id,
        data,
      );
    } else {
      return await SubscriptionsService.make<SubscriptionsService>(
        "admin",
      ).store(data);
    }
  };
  const onSuccess = () => {
    Navigate(`/admin/subscriptions`);
  };
  const [unit, setUnit] = useState<"month" | "day">("day");

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
          label={t("subscriptionName")}
          name={"name"}
        />
        <Input
          required={true}
          type={"number"}
          placeholder={"John"}
          label={t("allowPeriod")}
          name={"allow_period"}
          defaultValue={defaultValues?.allow_period ?? 0}
          unit={"day"}
        />
        <SelectPopOverFrom
          status={"day"}
          name={"period_unit"}
          ArraySelect={SubscriptionPeriodUnitArray()}
          handleSelect={(status: "month" | "day") => setUnit(status)}
          label={t("periodUnit")}
          required={true}
        />
        <div>
          <Input
            required={true}
            type={"number"}
            placeholder={"12"}
            label={t("period")}
            name={"period"}
            min={-1}
            unit={unit}
          />
          <p className={"text-sm my-1"}>{t("forLifetime")}</p>
        </div>

        <Input
          required={true}
          unit={"iqd"}
          type={"number"}
          placeholder={"John"}
          label={t("cost")}
          name={"cost"}
        />
      </Grid>
      <Textarea name={"description"} required={true} label={t("description")} />
    </Form>
  );
};

export default SubscriptionForm;
