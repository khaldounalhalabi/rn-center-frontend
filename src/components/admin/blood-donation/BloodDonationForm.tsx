"use client";
import Form from "@/components/common/ui/Form";
import React from "react";
import { Navigate } from "@/Actions/navigate";
import Grid from "@/components/common/ui/Grid";
import Input from "@/components/common/ui/Inputs/Input";
import SelectPopOverFrom from "@/components/common/ui/Selects/SelectPopOverForm";
import { BloodDonationService } from "@/services/BloodDonationService";
import Textarea from "@/components/common/ui/textArea/Textarea";
import { CityService } from "@/services/CityService";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import ApiSelect from "@/components/common/ui/Selects/ApiSelect";
import BloodArray from "@/enum/blood";
import DateTimePickerRang from "@/components/common/ui/Date/DateTimePickerRang";
import { BloodDonation } from "@/Models/BloodDonation";

const BloodDonationForm = ({
  defaultValues = undefined,
  id,
  type = "store",
}: {
  defaultValues?: BloodDonation;
  id?: number;
  type?: "store" | "update";
}) => {
  const handleSubmit = async (data: any) => {
    if (
      type === "update" &&
      (defaultValues?.id != undefined || id != undefined)
    ) {
      console.log(data);
      return BloodDonationService.make<BloodDonationService>("admin")
        .update(defaultValues?.id ?? id, data)
        .then((res) => {
          return res;
        });
    } else {
      return await BloodDonationService.make<BloodDonationService>(
        "admin",
      ).store(data);
    }
  };
  const onSuccess = () => {
    Navigate(`/admin/blood-donation`);
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
          label={`Full Name`}
          name={"full_name"}
        />
        <Input
          required={true}
          type={"tel"}
          placeholder={"John"}
          label={`Phone`}
          name={"contact_phone"}
        />

        <Input
          required={true}
          type={"text"}
          placeholder={"John"}
          label={`Nearest Hospital`}
          name={"nearest_hospital"}
        />
        <DateTimePickerRang name={"can_wait_until"} label={"Can Wait Until"} />
        <SelectPopOverFrom
          label={"Blood Group"}
          handleSelect={()=>undefined}
          status={defaultValues?.blood_group ?? ""}
          ArraySelect={BloodArray()}
          name={"blood_group"}
        />
        <Input
          required={true}
          type={"text"}
          placeholder={"John"}
          label={`Address`}
          name={"address"}
        />
        <ApiSelect
          required={true}
          name={"city_id"}
          label={"City"}
          placeHolder={"Select City Name ..."}
          api={(page?: number | undefined, search?: string | undefined) =>
            CityService.make<CityService>().indexWithPagination(page, search)
          }
          getOptionLabel={(item) => TranslateClient(item.name)}
          optionValue={"id"}
          defaultValues={defaultValues?.city ? [defaultValues?.city] : []}
        />
      </Grid>
      <Textarea name={"notes"} label={"Notes"} />
    </Form>
  );
};

export default BloodDonationForm;