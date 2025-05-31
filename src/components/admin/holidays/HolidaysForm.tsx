"use client";
import { Navigate } from "@/actions/Navigate";
import Form from "@/components/common/ui/Form";
import Grid from "@/components/common/ui/Grid";
import FormDatepicker from "@/components/common/ui/date-time-pickers/FormDatepicker";
import FormTextarea from "@/components/common/ui/text-inputs/FormTextarea";
import { Holiday } from "@/models/Holiday";
import { HolidayService } from "@/services/HolidayService";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";

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
      return HolidayService.make().update(defaultValues.id, data);
    } else {
      return await HolidayService.make().store(data);
    }
  };

  return (
    <Form
      handleSubmit={handleSubmit}
      onSuccess={async () => {
        await Navigate(`/admin/holidays`);
      }}
      defaultValues={defaultValues}
    >
      <Grid md={2}>
        <FormDatepicker
          required={true}
          name={"from"}
          label={t("from")}
          shouldDisableDate={(date) => date?.isBefore(dayjs())}
        />
        <FormDatepicker
          required={true}
          name={"to"}
          label={t("to")}
          shouldDisableDate={(date) => date?.isBefore(dayjs())}
        />
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
