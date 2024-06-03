"use client";
import Form from "@/components/common/ui/Form";
import React, {useState} from "react";
import TranslatableInput from "@/components/common/ui/Inputs/TranslatableInput";
import { Navigate } from "@/Actions/navigate";
import Grid from "@/components/common/ui/Grid";
import { CategoryService } from "@/services/CategoryService";
import { ServiceCategory } from "@/Models/ServiceCategory";
import { useTranslations } from "next-intl";
import { User } from "@/Models/User";
import { UsersService } from "@/services/UsersService";
import Input from "@/components/common/ui/Inputs/Input";
import Datepicker from "@/components/common/ui/Datepicker";
import InputTags from "@/components/common/ui/InputTags";
import MultiInput from "@/components/common/ui/Inputs/MultiInput";
import { CityService } from "@/services/CityService";
import { translate } from "@/Helpers/Translations";
import ApiSelect from "@/components/common/ui/Selects/ApiSelect";
import ImageUploader from "@/components/common/ui/ImageUploader";
import dayjs from "dayjs";
import SelectPopOver from "@/components/common/ui/Selects/SelectPopOver";
import Roles from "@/enm/Role";
import { useFormContext } from "react-hook-form";
import Gallery from "@/components/common/ui/Gallery";
import SelectPopOverFrom from "@/components/common/ui/Selects/SelectPopOverForm";

const UserForm = ({
  defaultValues = undefined,
  id,
  type = "store",
}: {
  defaultValues?: User;
  id?: number;
  type?: "store" | "update";
}) => {

  const handleSubmit = async (data: any) => {
    console.log(data);

    if (
      type === "update" &&
      (defaultValues?.id != undefined || id != undefined)
    ) {
      return UsersService.make<UsersService>("admin")
        .update(defaultValues?.id ?? id, data)
        .then((res) => {
          console.log(res);
          return res;
        });
    } else {
      return await UsersService.make<UsersService>("admin")
        .store(data)
        .then((res) => {
          console.log(res);
          return res;
        });
    }
  };
  const onSuccess = () => {
    // Navigate(`/admin/user`);
  };
  const [locale,setLocale] = useState<'en'|"ar">('en')
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
          name={"first_name"}
          locale={locale}
        />
        <TranslatableInput
          required={true}
          locales={["en", "ar"]}
          type={"text"}
          placeholder={"John"}
          label={`Middle Name :`}
          name={"middle_name"}
          locale={locale}

        />
        <TranslatableInput
          required={true}
          locales={["en", "ar"]}
          type={"text"}
          placeholder={"John"}
          label={`Last Name :`}
          name={"last_name"}
          locale={locale}
        />
        <SelectPopOverFrom
          required={true}
          label={"Role :"}
          name={"role"}
          id={1}
          status={"admin"}
          ArraySelect={Roles()}
        />
      </Grid>
      <Input
        name={"email"}
        type={"email"}
        label={"Email :"}
        required={true}
        defaultValue={defaultValues?.email ?? ""}
      />
      <Grid md={2} gap={5}>
        <Input
          name={"password"}
          type={"password"}
          label={"Password :"}
          required={true}
          defaultValue={defaultValues?.password ?? ""}
        />
        <Input
          name={"password_confirmation"}
          type={"password"}
          label={"Password Confirmation :"}
          required={true}
          defaultValue={defaultValues?.password_confirmation ?? ""}
        />
        <div className={`flex gap-5 p-2 items-center`}>
          <label className={`bg-pom p-2 rounded-md text-white`}>Gender:</label>
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
        </div>
        <InputTags
          name={"tags"}
          label={"Tags :"}
          defaultValue={defaultValues?.tags ? [defaultValues.tags] : []}
        />
      </Grid>
      <MultiInput
        type={"tel"}
        name={"phone_numbers"}
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
          name={"address.name"}
          locale={locale}
          defaultValue={defaultValues?.address?.name ?? ""}
        />
        <ApiSelect
          required={true}
          name={"address.city_id"}
          label={"City :"}
          placeHolder={"Select City Name ..."}
          api={(page?: number | undefined, search?: string | undefined) =>
            CityService.make<CityService>().indexWithPagination(page, search)
          }
          getOptionLabel={(item) => translate(item.name)}
          optionValue={"id"}
          defaultValues={
            defaultValues?.address?.city ? [defaultValues?.address?.city] : []
          }
        />
        <Datepicker
          name={"birth_date"}
          label={"Birth Date :"}
          required={true}
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

export default UserForm;