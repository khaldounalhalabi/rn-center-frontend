"use client";
import React, { useState } from "react";
import Grid from "@/components/common/ui/Grid";
import TranslatableInput from "@/components/common/ui/Inputs/TranslatableInput";
import Input from "@/components/common/ui/Inputs/Input";
import MultiInput from "@/components/common/ui/Inputs/MultiInput";
import { HospitalService } from "@/services/HospitalService";
import { SpecialityService } from "@/services/SpecialityService";
import { CityService } from "@/services/CityService";
import ImageUploader from "@/components/common/ui/ImageUploader";
import { ClinicsService } from "@/services/ClinicsService";
import Form from "@/components/common/ui/Form";
import { AddOrUpdateClinicForm } from "@/Models/Clinic";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import { useTranslations } from "next-intl";
import Gallery from "@/components/common/ui/Gallery";
import TextAreaMap from "@/components/common/ui/textArea/TextAreaMap";
import { Navigate } from "@/Actions/navigate";
import ApiSelect from "@/components/common/ui/Selects/ApiSelect";
import { ApiResponse } from "@/Http/Response";
import { Hospital } from "@/Models/Hospital";
import Datepicker from "@/components/common/ui/Datepicker";
import { Subscriptions } from "@/Models/Subscriptions";
import { SubscriptionsService } from "@/services/SubscriptionsService";
import SelectPopOverFrom from "@/components/common/ui/Selects/SelectPopOverForm";
import SubscriptionArray, { SubscriptionType } from "@/enum/SubscriptionType";
import dayjs from "dayjs";

const ClinicForm = ({
  type = "store",
  defaultValues = undefined,
  id = undefined,
}: {
  type: "store" | "update";
  defaultValues?: AddOrUpdateClinicForm | undefined | null;
  id?: number | undefined;
}) => {
  const [typeSelect, setType] = useState("");

  let onSubmit = async (data: AddOrUpdateClinicForm) => {
    const { deduction_cost, ...subscriptionData } = data;
    const sendData =
      typeSelect == SubscriptionType.BOOKING_COST ? data : subscriptionData;
    return await ClinicsService.make<ClinicsService>()
      .store(sendData)
      .then((r) => {
        console.log(r);
        return r;
      });
  };

  if (type == "update" && id) {
    onSubmit = async (data: any) => {
      return await ClinicsService.make<ClinicsService>().update(id, data);
    };
  }
  const t = useTranslations("admin.clinic.create-edit");
  const [locale, setLocale] = useState<"en" | "ar">("en");

  return (
    <Form
      handleSubmit={onSubmit}
      defaultValues={defaultValues}
      onSuccess={() => {
        Navigate(`/admin/clinics`);
      }}
      setLocale={setLocale}
    >
      <Grid md={3}>
        <TranslatableInput
          locales={["en", "ar"]}
          type={"text"}
          placeholder={"John"}
          label={t("first-Name")}
          name={"user.first_name"}
          required={true}
          locale={locale}
        />
        <TranslatableInput
          type={"text"}
          placeholder={`Mark`}
          locales={["en", "ar"]}
          label={t("middle-name")}
          name={"user.middle_name"}
          required={true}
          locale={locale}
        />

        <TranslatableInput
          type={"text"}
          placeholder={`Deep`}
          locales={["en", "ar"]}
          label={t("last-name")}
          name={"user.last_name"}
          required={true}
          locale={locale}
        />
      </Grid>

      <Grid>
        <TranslatableInput
          locales={["en", "ar"]}
          type={"text"}
          placeholder={`Clinic Name`}
          label={t("clinicName")}
          name={"name"}
          required={true}
          locale={locale}
        />
        <Input
          name={"user.email"}
          type={"text"}
          placeholder={"Enter The Doctor Email"}
          label={t("email")}
          required={true}
        />
        <Input
          name={"user.password"}
          type={"text"}
          placeholder={"Password"}
          label={t("password")}
          required={true}
        />
        <Input
          name={"user.password_confirmation"}
          type={"text"}
          placeholder={"Confirm Password"}
          label={t("confirm-password")}
          required={true}
        />
        <Datepicker
          name={"user.birth_date"}
          label={t("birth-date")}
          required={true}
          shouldDisableDate={(day) => {
            return !day.isBefore(dayjs().subtract(20, "year"));
          }}
        />
        <Input
          name={"appointment_cost"}
          type={"number"}
          unit={"IQD"}
          step={"any"}
          placeholder={"Appointment Cost i.e : 5"}
          label={t("cost")}
          required={true}
        />

        <Input
          name={"max_appointments"}
          type={"number"}
          step={"any"}
          placeholder={"Doctor Max Appointments Per Day Are ?"}
          label={t("max-appointments")}
          required={true}
        />
        <Input
          name={"approximate_appointment_time"}
          unit={"min"}
          type={"number"}
          step={"any"}
          placeholder={"Doctor Approximate Appointment Time Are ?"}
          label={"Approximate Appointment Time"}
          required={true}
        />
      </Grid>

      <MultiInput
        type={"tel"}
        name={"phone_numbers"}
        placeholder={"Enter Clinic Phone Number"}
        label={t("phones")}
        required={true}
      />

      <Grid>
        <div className={`flex gap-5  p-2 items-center`}>
          <label className={`bg-pom p-2 rounded-md text-white`}>Status:</label>
          <Input
            name={"status"}
            label={t("active")}
            type="radio"
            className="radio radio-info"
            value={"active"}
            defaultChecked={
              defaultValues ? defaultValues?.status == "active" : true
            }
          />
          <Input
            name={"status"}
            label={t("in-active")}
            type="radio"
            className="radio radio-info"
            value={"in-active"}
            defaultChecked={defaultValues?.status == "in-active"}
          />
        </div>

        <div className={`flex gap-5 p-2 items-center`}>
          <label className={`bg-pom p-2 rounded-md text-white`}>Gender:</label>
          <Input
            name={"user.gender"}
            label={t("male")}
            type="radio"
            className="radio radio-info"
            value={"male"}
            defaultChecked={
              defaultValues?.user?.gender
                ? defaultValues?.user?.gender == "male"
                : true
            }
          />

          <Input
            name={"user.gender"}
            label={t("female")}
            type="radio"
            className="radio radio-info"
            value={"female"}
            defaultChecked={defaultValues?.user?.gender == "female"}
          />
        </div>
        <ApiSelect
          label={t("hospital")}
          name="hospital_id"
          placeHolder={"Select Hospital Name ..."}
          api={(page, search): Promise<ApiResponse<Hospital[]>> =>
            HospitalService.make<HospitalService>()
              .setHeaders({ filtered: true })
              .indexWithPagination(page, search)
          }
          getOptionLabel={(item) => TranslateClient(item.name)}
          optionValue={"id"}
          defaultValues={
            defaultValues?.hospital ? [defaultValues?.hospital] : []
          }
        />

        <ApiSelect
          required={true}
          name={"speciality_ids"}
          label={t("specialities")}
          placeHolder={"Select Speciality Name ..."}
          api={(page?: number | undefined, search?: string | undefined) =>
            SpecialityService.make<SpecialityService>().indexWithPagination(
              page,
              search
            )
          }
          getOptionLabel={(item) => TranslateClient(item.name)}
          optionValue={"id"}
          defaultValues={defaultValues?.specialities ?? []}
          isMultiple={true}
          closeOnSelect={false}
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

        <TranslatableInput
          required={true}
          name={"address.name"}
          type={"text"}
          label={t("address")}
          locale={locale}
        />

        <TextAreaMap
          className={"col-span-2"}
          name="address.map_iframe"
          label={t("mapIframe")}
          required={true}
        />
        {type != "update" ? (
          <>
            <ApiSelect
              required={true}
              api={(page, search): Promise<ApiResponse<Subscriptions[]>> =>
                SubscriptionsService.make<SubscriptionsService>().indexWithPagination(
                  page,
                  search
                )
              }
              placeHolder={"Select Subscription Name ..."}
              label={`Subscription :`}
              optionLabel={"name"}
              optionValue={"id"}
              name={"subscription_id"}
            />
            <SelectPopOverFrom
              required={true}
              id={2}
              name={"subscription_type"}
              label={"Subscription Type :"}
              status={""}
              ArraySelect={SubscriptionArray()}
              handleSelect={(e: any) => {
                setType(e);
              }}
            />
            {typeSelect == "Booking Cost Based Subscription" ? (
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
          </>
        ) : (
          ""
        )}
        {type == "update" ? (
          defaultValues?.user?.photo &&
          defaultValues?.user?.photo?.length > 0 ? (
            <Gallery
              media={
                defaultValues?.user?.photo ? defaultValues?.user?.photo : [""]
              }
            />
          ) : (
            <div className="flex justify-between items-center">
              <label className="label"> {t("image")} : </label>
              <span className="text-lg badge badge-neutral">
                {t("noImage")}
              </span>
            </div>
          )
        ) : (
          ""
        )}
      </Grid>
      <ImageUploader name={"user.image"} label={'Image'}/>
    </Form>
  );
};

export default ClinicForm;