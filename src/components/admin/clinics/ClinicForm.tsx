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
import { Clinic } from "@/models/Clinic";
import Radio from "@/components/common/ui/inputs/Radio";
import { getEnumValues } from "@/helpers/Enums";
import GenderEnum from "@/enums/GenderEnum";
import TranslatableEnum from "@/components/common/ui/labels-and-values/TranslatableEnum";
import FormulaService from "@/services/FormulaService";

const ClinicForm = ({
  type = "store",
  defaultValues = undefined,
}: {
  type: "store" | "update";
  defaultValues?: Clinic | undefined;
}) => {
  let onSubmit = async (data: any) => {
    return await ClinicsService.make().store(data);
  };

  if (type == "update") {
    onSubmit = async (data: any) => {
      return await ClinicsService.make().update(
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
              label={t("password")}
              required={true}
            />
            <FormInput
              name={"user.password_confirmation"}
              type={"text"}
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
        <FormInput
          name={"appointment_cost"}
          type={"number"}
          label={t("cost")}
          required={true}
        />
        <FormInput
          name={"max_appointments"}
          type={"number"}
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
            SpecialityService.make().indexWithPagination(
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
        <Radio
          label={t("gender")}
          name={"user.gender"}
          options={getEnumValues(GenderEnum).map((item) => ({
            label: <TranslatableEnum value={item} />,
            value: item,
          }))}
          defaultChecked={GenderEnum.MALE}
        />
        <ApiSelect
          api={(page, search) =>
            FormulaService.make().indexWithPagination(page, search)
          }
          name={"user.formula_id"}
          label={t("formula")}
          optionLabel={"name"}
          optionValue={"id"}
          defaultValues={
            defaultValues?.user?.formula ? [defaultValues?.user?.formula] : []
          }
        />
      </Grid>
    </Form>
  );
};

export default ClinicForm;
