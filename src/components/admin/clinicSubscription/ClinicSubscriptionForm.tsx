"use client";
import Form from "@/components/common/ui/Form";
import React, { useState } from "react";
import { Navigate } from "@/Actions/navigate";
import Grid from "@/components/common/ui/Grid";
import { SubscriptionsService } from "@/services/SubscriptionsService";
import { Subscriptions } from "@/Models/Subscriptions";
import Input from "@/components/common/ui/Inputs/Input";
import Textarea from "@/components/common/ui/textArea/Textarea";
import { ClinicSubscription } from "@/Models/ClinicSubscription";
import { ClinicSubscriptionService } from "@/services/ClinicSubscriptionServic";
import ApiSelect from "@/components/common/ui/Selects/ApiSelect";
import { ApiResponse } from "@/Http/Response";
import { Clinic } from "@/Models/Clinic";
import { ClinicService } from "@/services/ClinicService";
import { translate } from "@/Helpers/Translations";
import SelectPopOver from "@/components/common/ui/Selects/SelectPopOver";
import SubscriptionArray from "@/enm/TypeSubscription";
import Select from "@/components/common/ui/Selects/Select";
import SelectPopOverFrom from "@/components/common/ui/Selects/SelectPopOverForm";

const ClinicSubscriptionForm = ({
  defaultValues = undefined,
  id,
  type = "store",
}: {
  defaultValues?: ClinicSubscription;
  id?: number;
  type?: "store" | "update";
}) => {
  const [typeSelect, setType] = useState("");
  console.log(defaultValues)
  const handleSubmit = async (data: any) => {
    const dataSend = {
      clinic_id:id,
      subscription_id:data.subscription_id,
      type:data.type
    }
    const dataSendTow = {
      clinic_id:id,
      subscription_id:data.subscription_id,
      type:data.type,
      deduction_cost:data.deduction_cost
    }
    const send = typeSelect == "Booking Cost Based Subscription" || defaultValues?.type == "Booking Cost Based Subscription" ? dataSendTow:dataSend
    console.log(send);
    if (
      type === "update" &&
      (defaultValues?.id != undefined || id != undefined)
    ) {
      return ClinicSubscriptionService.make<ClinicSubscriptionService>("admin")
        .update(defaultValues?.id ?? id, send)
        .then((res) => {
          console.log(res);

          return res;
        });
    } else {
      return await ClinicSubscriptionService.make<ClinicSubscriptionService>(
        "admin",
      )
        .store(send)
        .then((res) => {
          console.log(res);

          return res;
        });
    }
  };
  const onSuccess = () => {
    Navigate(`/admin/clinics/${id}`);
  };
  console.log(typeSelect);
  return (
    <Form
      handleSubmit={handleSubmit}
      onSuccess={onSuccess}
      defaultValues={defaultValues}
    >
      <Grid md={"2"}>
        <ApiSelect
          required={true}
          api={(page, search): Promise<ApiResponse<Subscriptions[]>> =>
            SubscriptionsService.make<SubscriptionsService>().indexWithPagination(
              page,
              search,
            )
          }
          placeHolder={"Select Subscription Name ..."}
          label={`Subscription :`}
          getOptionLabel={(item) => item.name}
          optionValue={"id"}
          name={"subscription_id"}
          defaultValues={
            defaultValues?.subscription ? [defaultValues?.subscription] : []
          }
        />
        <SelectPopOverFrom
          required={true}
          id={2}
          name={"type"}
          label={"Type :"}
          status={defaultValues?.type ?? ""}
          ArraySelect={SubscriptionArray()}
          handleSelect={(e: any) => {
            setType(e);
          }}
        />
        {typeSelect == "Booking Cost Based Subscription" || defaultValues?.type == "Booking Cost Based Subscription"? (
          <Input
            required={true}
            unit={"%"}
            type={"number"}
            placeholder={"John"}
            label={`Deduction Cost`}
            name={"deduction_cost"}
          />
        ) : (
          ""
        )}
      </Grid>
    </Form>
  );
};

export default ClinicSubscriptionForm;