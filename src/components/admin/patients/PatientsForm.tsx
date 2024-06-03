"use client";
import Form from "@/components/common/ui/Form";
import React, {useState} from "react";
import TranslatableInput from "@/components/common/ui/Inputs/TranslatableInput";
import { Navigate } from "@/Actions/navigate";
import Grid from "@/components/common/ui/Grid";
import Input from "@/components/common/ui/Inputs/Input";
import Datepicker from "@/components/common/ui/Datepicker";
import InputTags from "@/components/common/ui/InputTags";
import MultiInput from "@/components/common/ui/Inputs/MultiInput";
import { CityService } from "@/services/CityService";
import { translate } from "@/Helpers/Translations";
import ApiSelect from "@/components/common/ui/Selects/ApiSelect";
import ImageUploader from "@/components/common/ui/ImageUploader";
import dayjs from "dayjs";
import { PatientsService } from "@/services/PatientsService";
import { Customer, SendPatient } from "@/Models/Customer";
import Gallery from "@/components/common/ui/Gallery";
import SelectPopOverFrom from "@/components/common/ui/Selects/SelectPopOverForm";
import BloodArray from "@/enm/blood";

const PatientsForm = ({
  defaultValues = undefined,
  id,
  type = "store",
}: {
  defaultValues?: Customer;
  id?: number;
  type?: "store" | "update";
}) => {
  const handleSubmit = async (data: any) => {
    const sendCreate: SendPatient = {
      first_name: data.user.first_name,
      middle_name: data.user.middle_name,
      last_name: data.user.last_name,
      address: data.user.address,
      birth_date: data.user.birth_date,
      blood_group: data.user.blood_group,
      phone_numbers: data.user.phone_numbers,
      gender: data.user.gender,
      password: data.password,
      password_confirmation: data.password_confirmation,
      tags: data.tags,
      image: data.image,
      email: data.user.email,
    };
    console.log(sendCreate);
    if (
      type === "update" &&
      (defaultValues?.id != undefined || id != undefined)
    ) {
      return PatientsService.make<PatientsService>("admin")
        .update(defaultValues?.id ?? id, sendCreate)
        .then((res) => {
          console.log(res);
          return res;
        });
    } else {
      return await PatientsService.make<PatientsService>("admin")
        .store(sendCreate)
        .then((res) => {
          console.log(res);
          return res;
        });
    }
  };
  const onSuccess = () => {
    Navigate(`/admin/patients`);
  };
  const [locale,setLocale] = useState<"en"|"ar">('en')
  return (
    <Form
      handleSubmit={handleSubmit}
      onSuccess={onSuccess}
      defaultValues={defaultValues}
      setLocale={setLocale}
    >
      <Grid md={"2"}>
        <TranslatableInput
          required={true}
          locales={["en", "ar"]}
          type={"text"}
          placeholder={"John"}
          label={`First Name :`}
          name={"user.first_name"}
          locale={locale}
        />
        <TranslatableInput
          required={true}
          locales={["en", "ar"]}
          type={"text"}
          placeholder={"John"}
          label={`Middle Name :`}
          name={"user.middle_name"}
          locale={locale}

        />
        <TranslatableInput
          required={true}
          locales={["en", "ar"]}
          type={"text"}
          placeholder={"John"}
          label={`Last Name :`}
          locale={locale}

          name={"user.last_name"}
        />
        <SelectPopOverFrom
         name={'user.blood_group'}
         id={1}
         required={true}
         label={'Blood Group'}
         ArraySelect={BloodArray()}
         status={defaultValues?.user.blood_group ?? ""}
        />
      </Grid>
      <Input
        name={"user.email"}
        type={"email"}
        label={"Email :"}
        required={true}
      />
      <Grid md={2} gap={5}>
        <Input
          name={"password"}
          type={"password"}
          label={"Password :"}
          required={true}
        />
        <Input
          name={"password_confirmation"}
          type={"password"}
          label={"Password Confirmation :"}
          required={true}
        />
        <div className={`flex gap-5 p-2 items-center`}>
          <label className={`bg-pom p-2 rounded-md text-white`}>Gender:</label>
          <Input
            name={"user.gender"}
            label="Male"
            type="radio"
            className="radio radio-info"
            value={"male"}
            defaultChecked={
              defaultValues?.user.gender
                ? defaultValues?.user.gender == "male"
                : true
            }
          />

          <Input
            name={"gender"}
            label={"Female"}
            type="radio"
            className="radio radio-info"
            value={"female"}
            defaultChecked={defaultValues?.user.gender == "female"}
          />
        </div>
        <InputTags
          name={"tags"}
          label={"Tags :"}
          defaultValue={
            defaultValues?.user.tags ? [defaultValues.user.tags] : []
          }
        />
      </Grid>
      <MultiInput
        type={"tel"}
        name={"user.phone_numbers"}
        placeholder={"Enter Clinic Phone Number"}
        label={"Phones :"}
        required={true}
      />
      <Grid md={2}>
        <TranslatableInput
          required={true}
          locales={["en", "ar"]}
          type={"text"}
          placeholder={"John"}
          label={`Address :`}
          name={"user.address.name"}
          locale={locale}

          defaultValue={defaultValues ? defaultValues?.user?.address?.name : ""}
        />
        <ApiSelect
          required={true}
          name={"user.address.city_id"}
          label={"City :"}
          placeHolder={"Select City Name ..."}
          api={(page?: number | undefined, search?: string | undefined) =>
            CityService.make<CityService>().indexWithPagination(page, search)
          }
          getOptionLabel={(item) => translate(item.name)}
          optionValue={"id"}
          defaultValues={
            defaultValues?.user.address?.city
              ? [defaultValues?.user.address?.city]
              : []
          }
        />
        <Datepicker
          name={"user.birth_date"}
          label={"Birth Date :"}
          required={true}
          shouldDisableDate={(day) => {
            return !day.isBefore(dayjs().subtract(20, "year"));
          }}
        />
      </Grid>
      {type == "update" ? (
        <div className={"col-span-2"}>
          {defaultValues?.user.image?.length != 0 ? (
            <Gallery
              media={
                defaultValues?.user.image ? defaultValues?.user.image : [""]
              }
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
      <ImageUploader name={"image"} />
    </Form>
  );
};

export default PatientsForm;