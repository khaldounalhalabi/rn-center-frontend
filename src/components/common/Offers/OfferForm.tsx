"use client";
import Form from "@/components/common/ui/Form";
import React, { useState } from "react";
import TranslatableInput from "@/components/common/ui/Inputs/TranslatableInput";
import Grid from "@/components/common/ui/Grid";
import { Offers } from "@/Models/Offers";
import { OffersService } from "@/services/OffersService";
import ApiSelect from "@/components/common/ui/Selects/ApiSelect";
import { ClinicsService } from "@/services/ClinicsService";
import { Clinic } from "@/Models/Clinic";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import SelectPopOverFrom from "@/components/common/ui/Selects/SelectPopOverForm";
import Input from "@/components/common/ui/Inputs/Input";
import Datepicker from "@/components/common/ui/Datepicker";
import TranslatableTextArea from "@/components/common/ui/textArea/TranslatableTextarea";
import dayjs from "dayjs";
import OffersArray from "@/enum/OfferType";
import { Navigate } from "@/Actions/navigate";

const OfferForm = ({
  defaultValues = undefined,
  typePage = "admin",
  id,
  type = "store",
}: {
  defaultValues?: Offers;
  typePage?: "admin" | "doctor" | "customer";
  id?: number;
  type?: "store" | "update";
}) => {
  const handleSubmit = async (data: any) => {
    console.log(data);

    if (
      type === "update" &&
      (defaultValues?.id != undefined || id != undefined)
    ) {
      return OffersService.make<OffersService>(typePage)
        .update(defaultValues?.id ?? id, data)
        .then((res) => {
          console.log(res);
          return res;
        });
    } else {
      return await OffersService.make<OffersService>(typePage)
        .store(data)
        .then((res) => {
          console.log(res);
          return res;
        });
    }
  };
  const onSuccess = () => {
    Navigate(`/${typePage}/offer`);
  };
  const [locale, setLocale] = useState<"en" | "ar">("en");
  const [typeOffers, setTypeOffers] = useState(
    defaultValues?.type ?? "percentage",
  );
  return (
    <Form
      handleSubmit={handleSubmit}
      onSuccess={onSuccess}
      defaultValues={defaultValues}
      setLocale={setLocale}
    >
      <Grid md={"2"}>
        {typePage == "admin" ? (
          <ApiSelect
            required={true}
            placeHolder={"Select Clinic name ..."}
            name={"clinic_id"}
            api={(page, search) =>
              ClinicsService.make<ClinicsService>().indexWithPagination(
                page,
                search,
              )
            }
            defaultValues={defaultValues?.clinic ? [defaultValues?.clinic] : []}
            label={"Clinic Name"}
            optionValue={"id"}
            getOptionLabel={(data: Clinic) => TranslateClient(data.name)}
          />
        ) : (
          ""
        )}
        <TranslatableInput
          required={true}
          locales={["en", "ar"]}
          type={"text"}
          placeholder={"John"}
          label={`Title :`}
          name={"title"}
          locale={locale}
        />
        <SelectPopOverFrom
          name={"type"}
          id={1}
          handleSelect={(type: string) => {
            setTypeOffers(type);
          }}
          status={defaultValues?.type ?? "percentage"}
          ArraySelect={OffersArray()}
          required={true}
          label={"Type :"}
        />
        <Input
          placeholder={"Price : "}
          name={"value"}
          label={"Value"}
          required={true}
          type="number"
          unit={typeOffers == "percentage" ? "%" : "IQD"}
        />
        {typePage == "doctor" ? (
          <div className={`flex gap-5 p-2 items-center`}>
            <label className={`bg-pom p-2 rounded-md text-white`}>
              {"Status"}
            </label>
            <Input
              name={"is_active"}
              label={"Active"}
              type="radio"
              className="radio radio-info"
              value={"active"}
              defaultChecked={defaultValues ? defaultValues?.is_active : true}
            />
            <Input
              name={"is_active"}
              label={"in Active"}
              type="radio"
              className="radio radio-info"
              value={"in-active"}
              defaultChecked={!defaultValues?.is_active}
            />
          </div>
        ) : (
          ""
        )}
        <Datepicker
          shouldDisableDate={(day) => {
            return dayjs().isAfter(day.add(1, "day"));
          }}
          required={true}
          name={"start_at"}
          label={"Start At"}
        />
        <Datepicker required={true} name={"end_at"} label={"End At"} />
      </Grid>
      <TranslatableTextArea
        name={"note"}
        locale={locale}
        defaultValue={defaultValues?.note ?? ""}
      />
    </Form>
  );
};

export default OfferForm;