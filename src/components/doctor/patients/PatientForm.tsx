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
import { PatientsService } from "@/services/PatientsService";
import { AddOrUpdateCustomer } from "@/Models/Customer";
import Gallery from "@/components/common/ui/Gallery";
import SelectPopOverFrom from "@/components/common/ui/Selects/SelectPopOverForm";
import BloodArray from "@/enum/blood";
import Textarea from "@/components/common/ui/textArea/Textarea";
import OtherDataInput from "@/components/admin/patient-profiles/OtherDataInput";
import PageCard from "@/components/common/ui/PageCard";

const PatientForm = ({
  defaultValues = undefined,
  id,
  type = "store",
  appointment = false,
  close = undefined
}: {
  defaultValues?: AddOrUpdateCustomer;
  id?: number;
  type?: "store" | "update";
  appointment?: boolean,
  close?: () => void
}) => {
  const handleSubmit = async (data: any) => {
    console.log(data);
    if (
      type === "update" &&
      (defaultValues?.id != undefined || id != undefined)
    ) {
      return PatientsService.make<PatientsService>("doctor")
        .update(defaultValues?.id ?? id, data)
        .then((res) => {
          console.log(res);
          return res;
        });
    } else {
      return await PatientsService.make<PatientsService>("doctor")
        .store(data)
        .then((res) => {
          console.log(res);
          return res;
        });
    }
  };
  const onSuccess = () => {
    if (appointment && close) {
      return close()
    } else {
      Navigate(`/doctor/patients`);
    }
  };
  console.log(defaultValues);
  const [locale, setLocale] = useState<"en" | "ar">("en");
  return (
    <div className={"mt-4"}>
      <Form
        handleSubmit={handleSubmit}
        onSuccess={onSuccess}
        defaultValues={defaultValues}
        setLocale={setLocale}
      >
        <PageCard>
          {appointment?<h2 className="card-title">Add Patient</h2>:""}
          <Grid md={"2"}>
            {type != "update" ?
              <TranslatableInput
                required={true}
                locales={["en", "ar"]}
                type={"text"}
                placeholder={"John"}
                label={`First Name :`}
                name={"first_name"}
                locale={locale}
              /> :
              <label className="label justify-start text-xl">
                First Name :{" "}
                <span className="ml-2 badge badge-outline  ">
                  {TranslateClient(defaultValues?.first_name)}
                </span>
              </label>}
            {type != "update" ? <TranslatableInput
              required={true}
              locales={["en", "ar"]}
              type={"text"}
              placeholder={"John"}
              label={`Middle Name :`}
              name={"middle_name"}
              locale={locale}
            /> :
              <label className="label justify-start text-xl">
                Middle Name :{" "}
                <span className="ml-2 badge badge-outline  ">
                  {TranslateClient(defaultValues?.middle_name)}
                </span>
              </label>}
            {type != "update" ?
              <TranslatableInput
                required={true}
                locales={["en", "ar"]}
                type={"text"}
                placeholder={"John"}
                label={`Last Name :`}
                locale={locale}
                name={"last_name"}
              /> :
              <label className="label justify-start text-xl">
                Last Name :{" "}
                <span className="ml-2 badge badge-outline  ">
                  {TranslateClient(defaultValues?.last_name)}
                </span>
              </label>}
            {appointment ? "" : type == "update" ? <label className="label justify-start text-xl">
              Blood Group :{" "}
              <span className="ml-2 badge badge-outline  ">
                {defaultValues?.blood_group}
              </span>
            </label> :
              <SelectPopOverFrom
                name={"blood_group"}
                label={"Blood Group"}
                ArraySelect={BloodArray()}
                handleSelect={() => undefined}
                status={defaultValues?.blood_group ?? ""}
              />
            }
            {type != "update" ?
              <div className={`flex gap-5 p-2 items-center`}>
                <label className={`bg-pom p-2 rounded-md text-white`}>
                  Gender:
                </label>
                <Input
                  name={"gender"}
                  label="Male"
                  type="radio"
                  className="radio radio-info"
                  value={"male"}
                  defaultChecked={
                    defaultValues?.gender ? defaultValues?.gender == "male" : true
                  }
                />

                <Input
                  name={"gender"}
                  label={"Female"}
                  type="radio"
                  className="radio radio-info"
                  value={"female"}
                  defaultChecked={defaultValues?.gender == "female"}
                />
              </div> :
              <label className="label justify-start text-xl">
                Gender :{" "}
                <span className="ml-2 badge badge-outline  ">
                  {defaultValues?.gender}
                </span>
              </label>}
            {appointment ? "" : type == "update" ?
              <label className="label justify-start text-xl">
                Birth Date :{" "}
                <span className="ml-2 badge badge-outline  ">
                  {defaultValues?.birth_date}
                </span>
              </label> :
              <Datepicker
                name={"birth_date"}
                label={"Birth Date :"}

              />}
          </Grid>


          <Grid md={2}>

            {type !="update"?<TranslatableInput
              required={true}
              locales={["en", "ar"]}
              type={"text"}
              placeholder={"John"}
              label={`Address :`}
              name={"address.name"}
              locale={locale}
              defaultValue={defaultValues ? defaultValues?.address?.name : ""}
            />:
            <label className="label justify-start text-xl">
              Address :{" "}
              <span className="ml-2 badge badge-outline  ">
                {TranslateClient(defaultValues?.address?.name)}
              </span>
            </label>}
            {type !="update"?
            <ApiSelect
            required={true}
            name={"address.city_id"}
            label={"City :"}
            placeHolder={"Select City Name ..."}
            api={(page?: number | undefined, search?: string | undefined) =>
              CityService.make<CityService>("doctor").getAllCities(
                page,
                search,
              )
            }
            getOptionLabel={(item) => TranslateClient(item.name)}
            optionValue={"id"}
            defaultValues={
              defaultValues?.address?.city
                ? [defaultValues?.address?.city]
                : []
            }
          />
        :
        <label className="label justify-start text-xl">
              City :{" "}
              <span className="ml-2 badge badge-outline  ">
                {TranslateClient(defaultValues?.address?.city?.name)}
              </span>
            </label>}

          </Grid>
          {type !="update"?
          <MultiInput
          type={"tel"}
          name={"phone_numbers"}
          placeholder={"Enter Clinic Phone Number"}
          label={"Phones :"}
          required={true}
        />:
        <label className="label justify-start text-xl">
              Phone number :{" "}
              <span className="ml-2 badge badge-outline  ">
                {defaultValues?.phone_numbers?.map(e=>{
                  return e
                })}
              </span>
            </label>
            }
        </PageCard>
        {appointment ? "" :
          <PageCard>
            <OtherDataInput
              defaultValues={defaultValues?.other_data ?? undefined}
            />
          </PageCard>}
        <PageCard>
          <Textarea name={"medical_condition"} label={"Medical Condition"} />
          {appointment ? "" :
            <>
              <Textarea name={"note"} label={"Note"} />

              {type == "update" ? (
                <div className={"col-span-2"}>
                  {defaultValues?.images?.length != 0 ? (
                    <Gallery
                      media={defaultValues?.images ? defaultValues?.images : []}
                    />
                  ) : (
                    <div className="flex items-center">
                      <label className="label"> Image : </label>
                      <span className="text-lg badge badge-neutral">No Data</span>
                    </div>
                  )}
                </div>
              ) : (
                ""
              )}

              <ImageUploader name={"images"} isMultiple={true} label={'Supplemental Images'} />
            </>}
        </PageCard>
      </Form>
    </div>
  );
};

export default PatientForm;