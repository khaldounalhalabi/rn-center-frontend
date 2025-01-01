"use client";
import Form from "@/components/common/ui/Form";
import React, { useContext, useState } from "react";
import TranslatableInput from "@/components/common/ui/Inputs/TranslatableInput";
import { Navigate } from "@/Actions/navigate";
import Grid from "@/components/common/ui/Grid";
import Input from "@/components/common/ui/Inputs/Input";
import Datepicker from "@/components/common/ui/Date/Datepicker";
import MultiInput from "@/components/common/ui/Inputs/MultiInput";
import { CityService } from "@/services/CityService";
import {
  TranslateClient,
  TranslateStatusOrTypeClient,
} from "@/Helpers/TranslationsClient";
import ApiSelect from "@/components/common/ui/Selects/ApiSelect";
import ImageUploader from "@/components/common/ui/ImageUploader";
import { PatientsService } from "@/services/PatientsService";
import { AddOrUpdateCustomer, Customer } from "@/Models/Customer";
import Gallery from "@/components/common/ui/Gallery";
import SelectPopOverFrom from "@/components/common/ui/Selects/SelectPopOverForm";
import BloodArray from "@/enum/blood";
import Textarea from "@/components/common/ui/textArea/Textarea";
import OtherDataInput from "@/components/admin/patient-profiles/OtherDataInput";
import { useTranslations } from "next-intl";
import { User } from "@/Models/User";
import { CreatedPatientContext } from "@/components/doctor/appointment/AppointmentForm";
import { ApiResponse } from "@/Http/Response";
import { LabelValue } from "@/components/common/ui/LabelsValues/LabelValue";
import { Label } from "@/components/common/ui/LabelsValues/Label";
import { Value } from "@/components/common/ui/LabelsValues/Value";
import TranslatableEnum from "@/components/common/ui/TranslatableEnum";

const PatientForm = ({
  defaultValues = undefined,
  id,
  type = "store",
  appointment = false,
  close = undefined,
  doctor = undefined,
}: {
  defaultValues?: AddOrUpdateCustomer;
  id?: number;
  type?: "store" | "update";
  appointment?: boolean;
  close?: () => void;
  doctor?: User;
}) => {
  const t = useTranslations("common.patient.create");
  const createdPatientContext = useContext(CreatedPatientContext);

  const handleSubmit = async (data: any) => {
    if (
      type === "update" &&
      (defaultValues?.id != undefined || id != undefined)
    ) {
      return PatientsService.make<PatientsService>("doctor").update(
        defaultValues?.id ?? id,
        data,
      );
    } else {
      return await PatientsService.make<PatientsService>("doctor").store(data);
    }
  };
  const onSuccess = (res: ApiResponse<Customer>) => {
    if (appointment && close) {
      if (
        res.data &&
        createdPatientContext &&
        createdPatientContext.setCreatedPatient
      ) {
        createdPatientContext.setCreatedPatient(res.data);
      }
      return close();
    } else {
      Navigate(`/doctor/patients`);
    }
  };
  const [locale, setLocale] = useState<"en" | "ar">("en");
  const { images, ...res } = defaultValues ?? { images: [] };
  return (
    <Form
      handleSubmit={handleSubmit}
      onSuccess={onSuccess}
      defaultValues={res}
      setLocale={setLocale}
    >
      {appointment ? (
        <h2 className="card-title my-5">{t("addPatient")}</h2>
      ) : (
        ""
      )}
      <Grid md={"2"}>
        {type != "update" ? (
          <TranslatableInput
            required={true}
            locales={["en", "ar"]}
            type={"text"}
            label={t("firstName")}
            name={"first_name"}
            locale={locale}
          />
        ) : (
          <LabelValue
            label={t("firstName")}
            value={TranslateClient(defaultValues?.first_name)}
            color={"pom"}
          />
        )}
        {type != "update" ? (
          <TranslatableInput
            required={true}
            locales={["en", "ar"]}
            type={"text"}
            label={t("middleName")}
            name={"middle_name"}
            locale={locale}
          />
        ) : (
          <LabelValue
            label={t("middleName")}
            value={TranslateClient(defaultValues?.middle_name)}
            color={"primary"}
          />
        )}
        {type != "update" ? (
          <TranslatableInput
            required={true}
            locales={["en", "ar"]}
            type={"text"}
            label={t("lastName")}
            locale={locale}
            name={"last_name"}
          />
        ) : (
          <LabelValue
            label={t("lastName")}
            value={TranslateClient(defaultValues?.last_name)}
            color={"warning"}
          />
        )}
        {appointment ? (
          ""
        ) : type == "update" ? (
          <LabelValue
            label={t("blood")}
            value={defaultValues?.blood_group}
            color={"error"}
          />
        ) : (
          <SelectPopOverFrom
            name={"blood_group"}
            label={t("blood")}
            ArraySelect={BloodArray()}
            handleSelect={() => undefined}
            status={defaultValues?.blood_group ?? ""}
          />
        )}
        {type != "update" ? (
          <div
            className={`flex md:flex-row flex-col justify-between w-full items-center py-10`}
          >
            <label className={`bg-pom p-2 rounded-md text-white`}>
              {t("gender")}:
            </label>
            <Input
              name={"gender"}
              label={t("male")}
              type="radio"
              className="radio radio-info "
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
        ) : (
          <LabelValue
            label={t("gender")}
            value={TranslateStatusOrTypeClient(defaultValues?.gender)}
            color={"secondary"}
          />
        )}
        {appointment ? (
          ""
        ) : type == "update" ? (
          <LabelValue
            label={t("birthDate")}
            value={defaultValues?.birth_date}
            color={"info"}
          />
        ) : (
          <Datepicker name={"birth_date"} label={t("birthDate")} />
        )}
      </Grid>

      <Grid md={2}>
        {type != "update" ? (
          <TranslatableInput
            required={false}
            locales={["en", "ar"]}
            type={"text"}
            label={t("address")}
            name={"address.name"}
            locale={locale}
            defaultValue={defaultValues ? defaultValues?.address?.name : ""}
          />
        ) : (
          <LabelValue
            label={t("address")}
            value={TranslateClient(defaultValues?.address?.name)}
            color={"neutral"}
          />
        )}
        {type != "update" ? (
          <ApiSelect
            required={true}
            name={"address.city_id"}
            label={t("city")}
            placeHolder={"Select City Name ..."}
            api={(page?: number | undefined, search?: string | undefined) =>
              CityService.make<CityService>("doctor").getAllCities(page, search)
            }
            getOptionLabel={(item) => TranslateClient(item.name)}
            optionValue={"id"}
            defaultValues={
              defaultValues?.address?.city
                ? [defaultValues?.address?.city]
                : doctor?.address?.city
                  ? [doctor?.address?.city]
                  : []
            }
          />
        ) : (
          <LabelValue
            label={t("city")}
            value={TranslateClient(defaultValues?.address?.city?.name)}
          />
        )}
      </Grid>
      {type != "update" ? (
        <MultiInput
          type={"tel"}
          name={"phone_numbers"}
          label={t("phone")}
          required={true}
          maxFields={2}
        />
      ) : (
        <Label label={t("phone")} col={true}>
          {defaultValues?.phone_numbers?.map((e) => {
            return <Value color={"warning-content"}>{e}</Value>;
          })}
        </Label>
      )}
      {appointment ? (
        ""
      ) : (
        <OtherDataInput
          defaultValues={defaultValues?.other_data ?? undefined}
        />
      )}
      <Textarea
        name={"medical_condition"}
        label={t("medicalCondition")}
        required={false}
      />
      {appointment ? (
        ""
      ) : (
        <>
          <Textarea name={"note"} label={t("note")} />

          {type == "update" ? (
            <div className={"col-span-2"}>
              {defaultValues?.images?.length != 0 ? (
                <Gallery
                  media={defaultValues?.images ? defaultValues?.images : []}
                />
              ) : (
                <div className="flex items-center">
                  <label className="label"> {t("image")} : </label>
                  <span className="text-lg badge badge-neutral">
                    <TranslatableEnum value={"no_data"} />
                  </span>
                </div>
              )}
            </div>
          ) : (
            ""
          )}
          <ImageUploader
            name={"images"}
            isMultiple={true}
            label={t("supplementalImages")}
          />
        </>
      )}
    </Form>
  );
};

export default PatientForm;
