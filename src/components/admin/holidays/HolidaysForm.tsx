"use client";
import Form from "@/components/common/ui/Form";
import React from "react";
import { HolidayService } from "@/services/HolidayService";
import { Holiday } from "@/Models/Holiday";
import { Navigate } from "@/Actions/navigate";
import Grid from "@/components/common/ui/Grid";
import { useTranslations } from "next-intl";
import FormDatepicker from "@/components/common/ui/date-time-pickers/FormDatepicker";
import FormTextarea from "@/components/common/ui/text-inputs/FormTextarea";

const HolidaysForm = ({
  defaultValues = undefined,
  type = "store",
}: {
  defaultValues?: Holiday;
  type?: "store" | "update";
}) => {
  const t = useTranslations("holidays");
  const handleSubmit = async (data: any) => {
    if (type === "update" && defaultValues?.id) {
      return HolidayService.make<HolidayService>().update(
        defaultValues.id,
        data,
      );
    } else {
      return await HolidayService.make<HolidayService>().store(data);
    }
  };

  return (
    <Form
      handleSubmit={handleSubmit}
      onSuccess={() => {
        Navigate(`/admin/holidays`);
      }}
      defaultValues={defaultValues}
    >
      <Grid md={2}>
        <FormDatepicker required={true} name={"from"} label={t("from")} />
        <FormDatepicker required={true} name={"to"} label={t("to")} />
      </Grid>
      <div className="my-3">
        <FormTextarea
          required={true}
          defaultValue={defaultValues?.reason}
          label={t("reason")}
          name={"reason"}
        />
      </div>
    </Form>
  );
};

export default HolidaysForm;
