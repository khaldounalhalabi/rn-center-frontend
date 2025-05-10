"use client";
import React from "react";
import Grid from "@/components/common/ui/Grid";
import FormInput from "@/components/common/ui/inputs/FormInput";
import { SpecialityService } from "@/services/SpecialityService";
import { ClinicsService } from "@/services/ClinicsService";
import Form from "@/components/common/ui/Form";
import { useTranslations } from "next-intl";
import { Navigate } from "@/actions/Navigate";
import ApiSelect from "@/components/common/ui/selects/ApiSelect";
import FormDatepicker from "@/components/common/ui/date-time-pickers/FormDatepicker";
import dayjs from "dayjs";
import { Clinic } from "@/models/Clinic";

const ClinicForm = ({
  type = "store",
  defaultValues = undefined,
}: {
  type: "store" | "update";
  defaultValues?: Clinic | undefined;
}) => {
  let onSubmit = async (data: any) => {
    return await ClinicsService.make<ClinicsService>().store(data);
  };

  if (type == "update") {
    onSubmit = async (data: any) => {
      return await ClinicsService.make<ClinicsService>().update(
        defaultValues?.id,
        data,
      );
    };
  }
  const t = useTranslations("admin.clinic.create-edit");

  return (
    <Form
      handleSubmit={onSubmit}
      defaultValues={defaultValues}
      onSuccess={() => {
        Navigate(`/admin/clinics`);
      }}
    >
      <Grid md={2}>
        <FormInput
          type={"text"}
          label={t("first-Name")}
          name={"user.first_name"}
          required={true}
        />
        <FormInput
          type={"text"}
          label={t("last-name")}
          name={"user.last_name"}
          required={true}
        />
        {type == "store" && (
          <>
            <FormInput
              name={"user.password"}
              type={"text"}
              placeholder={"Password"}
              label={t("password")}
              required={true}
            />
            <FormInput
              name={"user.password_confirmation"}
              type={"text"}
              placeholder={"Confirm Password"}
              label={t("confirm-password")}
              required={true}
            />
          </>
        )}

        <FormInput
          name={"user.phone"}
          type={"tel"}
          label={t("phone")}
          required={true}
        />
        <FormDatepicker
          name={"user.birth_date"}
          label={t("birth-date")}
          required={true}
          shouldDisableDate={(day) => {
            return !day.isBefore(dayjs().subtract(20, "year"));
          }}
        />
        <FormInput
          name={"appointment_cost"}
          type={"number"}
          unit={"iqd"}
          step={"any"}
          label={t("cost")}
          required={true}
        />
        <FormInput
          name={"max_appointments"}
          type={"number"}
          step={"any"}
          label={t("max-appointments")}
          required={true}
        />
        <FormInput
          name={"working_start_year"}
          type={"year"}
          label={t("working_start_year")}
          required={true}
        />
        <ApiSelect
          required={true}
          name={"speciality_ids"}
          label={t("specialities")}
          api={(page?: number | undefined, search?: string | undefined) =>
            SpecialityService.make<SpecialityService>().indexWithPagination(
              page,
              search,
            )
          }
          optionLabel={"name"}
          optionValue={"id"}
          defaultValues={defaultValues?.specialities ?? []}
          isMultiple={true}
          closeOnSelect={false}
        />
        <div className={`flex items-center gap-5`}>
          <label className={`rounded-md bg-pom p-2 text-white`}>
            {t("gender")}:
          </label>
          <FormInput
            name={"user.gender"}
            label={t("male")}
            type="radio"
            className="radio-info radio"
            value={"male"}
            defaultChecked={
              defaultValues?.user?.gender
                ? defaultValues?.user?.gender == "male"
                : true
            }
          />
          <FormInput
            name={"user.gender"}
            label={t("female")}
            type="radio"
            className="radio-info radio"
            value={"female"}
            defaultChecked={defaultValues?.user?.gender == "female"}
          />
        </div>
      </Grid>
    </Form>
  );
};

export default ClinicForm;
