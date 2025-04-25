"use client";
import InputLoginCustomer from "@/components/common/ui/Inputs/InputLoginCustomer";
import Form from "@/components/common/ui/Form";
import { useTranslations } from "next-intl";
import AuthSubmitButton from "@/components/common/Auth/Customer/AuthSubmitButton";
import React, { useState } from "react";
import { AppointmentService } from "@/services/AppointmentService";
import { ApiResponse } from "@/Http/Response";
import { Appointment } from "@/Models/Appointment";
import { Navigate } from "@/Actions/navigate";
import { RoleEnum } from "@/enum/RoleEnum";

const CheckAppointmentForm = () => {
  const t = useTranslations("landing");
  const [error, setError] = useState<string | undefined>(undefined);
  return (
    <div className={"flex justify-center items-center w-full"}>
      <Form
        handleSubmit={(data: { code: string }) => {
          return AppointmentService.make<AppointmentService>(RoleEnum.PUBLIC)
            .getByCode(data.code)
            .then((res) => {
              if (!res.data) {
                setError(t("wrong_code"));
              }
              return res;
            });
        }}
        onSuccess={(res: ApiResponse<Appointment>) => {
          if (res.data) {
            Navigate(`/check-appointment/#`);
          }
        }}
        className={"w-full flex flex-col justify-center items-center"}
        defaultButton={false}
        otherSubmitButton={(isSubmitting) => (
          <AuthSubmitButton
            isSubmitting={isSubmitting}
            className={"py-2 px-8"}
            disabled={isSubmitting}
          >
            {t("search")}
          </AuthSubmitButton>
        )}
      >
        <InputLoginCustomer
          label={t("input_label")}
          type={"text"}
          name={"code"}
          conClass={"w-[75%] md:w-[33%]"}
        />
        {error && <p className={"text-error"}>{error}</p>}
      </Form>
    </div>
  );
};
export default CheckAppointmentForm;
