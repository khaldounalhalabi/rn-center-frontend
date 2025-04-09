"use client";
import Form from "@/components/common/ui/Form";
import React from "react";
import { ClinicHolidayService } from "@/services/ClinicHolidayService";
import { ClinicHoliday } from "@/Models/ClinicHoliday";
import Grid from "@/components/common/ui/Grid";
import TranslatableTextArea from "@/components/common/ui/textArea/TranslatableTextarea";
import Datepicker from "@/components/common/ui/Date/Datepicker";
import { useTranslations } from "next-intl";
import { Navigate } from "@/Actions/navigate";

const HolidayForm = ({
  defaultValues = undefined,
  type = "store",
}: {
  defaultValues?: ClinicHoliday;
  id?: number;
  type?: "store" | "update";
}) => {
  const t = useTranslations("doctor.holidays.create");
  const handleSubmit = async (data: any) => {
    if (type === "update" && defaultValues?.id) {
      return ClinicHolidayService.make<ClinicHolidayService>("doctor").update(
        defaultValues.id,
        data,
      );
    } else {
      return await ClinicHolidayService.make<ClinicHolidayService>(
        "doctor",
      ).store(data);
    }
  };

  const onSuccess = () => {
    Navigate(`/doctor/clinic/holidays`);
  };
  return (
    <Form
      handleSubmit={handleSubmit}
      onSuccess={onSuccess}
      defaultValues={defaultValues}
    >
      <Grid md={2}>
        <Datepicker
          required={true}
          name={"start_date"}
          label={t("startHoliday")}
        />
        <Datepicker required={true} name={"end_date"} label={t("endHoliday")} />
      </Grid>
      <div className="my-3">
        <TranslatableTextArea
          required={true}
          defaultValue={defaultValues?.reason}
          label={t("reason")}
          name={"reason"}
          locales={["en", "ar"]}
        />
      </div>
    </Form>
  );
};

export default HolidayForm;
