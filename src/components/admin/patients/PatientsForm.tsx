"use client";
import Form from "@/components/common/ui/Form";
import React, { useState } from "react";
import TranslatableInput from "@/components/common/ui/Inputs/TranslatableInput";
import { Navigate } from "@/Actions/navigate";
import Grid from "@/components/common/ui/Grid";
import Input from "@/components/common/ui/Inputs/Input";
import Datepicker from "@/components/common/ui/Date/Datepicker";
import MultiInput from "@/components/common/ui/Inputs/MultiInput";
import { CityService } from "@/services/CityService";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import ApiSelect from "@/components/common/ui/Selects/ApiSelect";
import ImageUploader from "@/components/common/ui/ImageUploader";
import dayjs from "dayjs";
import { PatientsService } from "@/services/PatientsService";
import { AddOrUpdateCustomer } from "@/Models/Customer";
import Gallery from "@/components/common/ui/Gallery";
import SelectPopOverFrom from "@/components/common/ui/Selects/SelectPopOverForm";
import BloodArray from "@/enum/blood";
import { useTranslations } from "next-intl";

const PatientsForm = ({
  defaultValues = undefined,
  id,
  type = "store",
}: {
  defaultValues?: AddOrUpdateCustomer;
  id?: number;
  type?: "store" | "update";
}) => {
  const t = useTranslations("common.patient.create");
  const handleSubmit = async (data: any) => {
    if (
      type === "update" &&
      (defaultValues?.id != undefined || id != undefined)
    ) {
      return PatientsService.make<PatientsService>("admin").update(
        defaultValues?.id ?? id,
        data
      );
    } else {
      return await PatientsService.make<PatientsService>("admin").store(data);
    }
  };
  const onSuccess = () => {
    Navigate(`/admin/patients`);
  };
  const [locale, setLocale] = useState<"en" | "ar">("en");
  const { images, image, ...res } = defaultValues ?? {
    images: undefined,
    image: undefined,
  };
  return (
    <Form
      handleSubmit={handleSubmit}
      onSuccess={onSuccess}
      defaultValues={res}
      setLocale={setLocale}
    >
      <Grid md={"2"}>
        <TranslatableInput
          required={true}
          locales={["en", "ar"]}
          type={"text"}
          placeholder={"John"}
          label={t("firstName")}
          name={"first_name"}
          locale={locale}
        />
        <TranslatableInput
          required={true}
          locales={["en", "ar"]}
          type={"text"}
          placeholder={"John"}
          label={t("middleName")}
          name={"middle_name"}
          locale={locale}
        />
        <TranslatableInput
          required={true}
          locales={["en", "ar"]}
          type={"text"}
          placeholder={"John"}
          label={t("lastName")}
          locale={locale}
          name={"last_name"}
        />
        <SelectPopOverFrom
          name={"blood_group"}
          handleSelect={() => undefined}
          required={true}
          label={t("blood")}
          ArraySelect={BloodArray()}
          status={defaultValues?.blood_group ?? ""}
        />
      </Grid>
      <Input name={"email"} type={"text"} label={t("email")} required={true} />
      <Grid md={2} gap={5}>
        <Input
          name={"password"}
          type={"text"}
          label={t("password")}
          required={true}
        />
        <Input
          name={"password_confirmation"}
          type={"text"}
          label={t("confirm-password")}
          required={true}
        />
        <div className={`flex gap-5 p-2 items-center`}>
          <label className={`bg-pom p-2 rounded-md text-white`}>
            {t("gender")}:
          </label>{" "}
          <Input
            name={"gender"}
            label={t("male")}
            type="radio"
            className="radio radio-info"
            value={"male"}
            defaultChecked={
              defaultValues?.gender ? defaultValues?.gender == "male" : true
            }
          />
          <Input
            name={"gender"}
            label={t("female")}
            type="radio"
            className="radio radio-info"
            value={"female"}
            defaultChecked={defaultValues?.gender == "female"}
          />
        </div>
      </Grid>
      <MultiInput
        type={"tel"}
        name={"phone_numbers"}
        placeholder={"Enter Clinic Phone Number"}
        label={t("phone")}
        required={true}
        maxFields={2}
      />
      <Grid md={2}>
        <TranslatableInput
          required={true}
          locales={["en", "ar"]}
          type={"text"}
          placeholder={"John"}
          label={t("address")}
          name={"address.name"}
          locale={locale}
          defaultValue={defaultValues ? defaultValues?.address?.name : ""}
        />
        <ApiSelect
          required={true}
          name={"address.city_id"}
          label={t("city")}
          placeHolder={"Select City Name ..."}
          api={(page?: number | undefined, search?: string | undefined) =>
            CityService.make<CityService>().indexWithPagination(page, search)
          }
          getOptionLabel={(item) => TranslateClient(item.name)}
          optionValue={"id"}
          defaultValues={
            defaultValues?.address?.city ? [defaultValues?.address?.city] : []
          }
        />
        <Datepicker
          name={"birth_date"}
          label={t("birth-date")}
          shouldDisableDate={(day) => {
            return !day.isBefore(dayjs().subtract(20, "year"));
          }}
        />
      </Grid>
      {type == "update" ? (
        <div className={"col-span-2"}>
          {defaultValues?.image?.length != 0 ? (
            <Gallery
              media={defaultValues?.image ? defaultValues?.image : [""]}
            />
          ) : (
            <div className="flex items-center">
              <label className="label"> {t("image")} : </label>
              <span className="text-lg badge badge-neutral">{t("noData")}</span>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
      <ImageUploader name={"image"} label={t("image")} />
    </Form>
  );
};

export default PatientsForm;
