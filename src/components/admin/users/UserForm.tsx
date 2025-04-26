"use client";
import Form from "@/components/common/ui/Form";
import React, { useState } from "react";
import TranslatableInput from "@/components/common/ui/Inputs/TranslatableInput";
import { Navigate } from "@/Actions/navigate";
import Grid from "@/components/common/ui/Grid";
import { User } from "@/Models/User";
import { UsersService } from "@/services/UsersService";
import Input from "@/components/common/ui/Inputs/Input";
import Datepicker from "@/components/common/ui/Date/Datepicker";
import MultiInput from "@/components/common/ui/Inputs/MultiInput";
import { CityService } from "@/services/CityService";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import ApiSelect from "@/components/common/ui/Selects/ApiSelect";
import ImageUploader from "@/components/common/ui/ImageUploader";
import dayjs from "dayjs";
import Roles from "@/enum/RoleEnum";
import Gallery from "@/components/common/ui/Gallery";
import SelectPopOverFrom from "@/components/common/ui/Selects/SelectPopOverForm";
import { useTranslations } from "next-intl";

const UserForm = ({
  defaultValues = undefined,
  id,
  type = "store",
}: {
  defaultValues?: User;
  id?: number;
  type?: "store" | "update";
}) => {
  const t = useTranslations("admin.users");
  const handleSubmit = async (data: any) => {
    if (
      type === "update" &&
      (defaultValues?.id != undefined || id != undefined)
    ) {
      return UsersService.make<UsersService>("admin").update(
        defaultValues?.id ?? id,
        data,
      );
    } else {
      return await UsersService.make<UsersService>("admin").store(data);
    }
  };
  const onSuccess = () => {
    Navigate(`/admin/user`);
  };
  const [locale, setLocale] = useState<"en" | "ar">("en");
  const { image, ...res } = defaultValues ?? { image: undefined };
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
          label={t("first-Name")}
          name={"first_name"}
          locale={locale}
        />
        <TranslatableInput
          required={true}
          locales={["en", "ar"]}
          type={"text"}
          placeholder={"John"}
          label={t("middle-name")}
          name={"middle_name"}
          locale={locale}
        />
        <TranslatableInput
          required={true}
          locales={["en", "ar"]}
          type={"text"}
          placeholder={"John"}
          label={t("last-name")}
          name={"last_name"}
          locale={locale}
        />
        <SelectPopOverFrom
          required={true}
          label={t("role")}
          name={"role"}
          status={defaultValues?.role?.[0]?.name}
          ArraySelect={Roles()}
          handleSelect={() => undefined}
        />
      </Grid>
      <Input
        name={"email"}
        type={"text"}
        label={t("email")}
        required={true}
        defaultValue={defaultValues?.email ?? ""}
      />
      <Grid md={2} gap={5}>
        <Input
          name={"password"}
          type={"text"}
          label={t("password")}
          required={true}
          defaultValue={defaultValues?.password ?? ""}
        />
        <Input
          name={"password_confirmation"}
          type={"text"}
          label={t("confirm-password")}
          required={true}
          defaultValue={defaultValues?.password_confirmation ?? ""}
        />
        <div className={`flex gap-5 p-2 items-center`}>
          <label className={`bg-pom p-2 rounded-md text-white`}>
            {t("gender")}:
          </label>
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
            label={"Female"}
            type="radio"
            className="radio radio-info"
            value={t("female")}
            defaultChecked={defaultValues?.gender == "female"}
          />
        </div>
      </Grid>
      <MultiInput
        type={"tel"}
        name={"phone_numbers"}
        placeholder={"Enter Clinic Phone Number"}
        label={t("phones")}
        required={true}
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
          defaultValue={defaultValues?.address?.name ?? ""}
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
        <div className={"md:col-span-2"}>
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

export default UserForm;
