"use client";
import { Appointment } from "@/models/Appointment";
import { getEnumValues } from "@/helpers/Enums";
import { AppointmentStatusEnum } from "@/enums/AppointmentStatusEnum";
import TranslatableEnum from "@/components/common/ui/labels-and-values/TranslatableEnum";
import { useState } from "react";
import DialogPopup from "@/components/common/ui/DialogPopup";
import Form from "@/components/common/ui/Form";
import { useTranslations } from "next-intl";
import { Label } from "@/components/common/ui/labels-and-values/Label";
import { AppointmentService } from "@/services/AppointmentService";
import LoadingSpin from "@/components/icons/LoadingSpin";

const AppointmentStatusColumn = ({
  appointment,
}: {
  appointment: Appointment;
}) => {
  const [open, setOpen] = useState(false);
  const [cancellationReason, setCancellationReason] = useState<
    string | undefined
  >(undefined);
  const [selectedStatus, setSelectedStatus] = useState<AppointmentStatusEnum>(
    appointment.status,
  );
  const [loading, setLoading] = useState(false);
  const t = useTranslations("components");
  const handleSelect = (status: AppointmentStatusEnum) => {
    if (status == AppointmentStatusEnum.CANCELLED) {
      setOpen(true);
    } else {
      handleChange(status);
    }
    setSelectedStatus(status);
  };

  const handleChange = async (status: AppointmentStatusEnum) => {
    setLoading(true);
    const response =
      await AppointmentService.make<AppointmentService>().toggleStatus(
        appointment.id,
        status,
        cancellationReason,
      );

    setLoading(false);
    return response;
  };

  return loading ? (
    <LoadingSpin className={"h-6 w-6"} />
  ) : (
    <>
      <DialogPopup open={open}>
        <Form
          handleSubmit={() => {
            setOpen(false);
            return handleChange(selectedStatus);
          }}
        >
          <Label label={t("cancellation_reason")} col>
            <textarea
              name={"cancellation_reason"}
              defaultValue={""}
              className={"textarea w-full"}
              onChange={(e) => {
                setCancellationReason(e.target.value);
              }}
            />
          </Label>
        </Form>
      </DialogPopup>
      <select
        defaultValue={selectedStatus}
        className={"select select-bordered w-fit text-sm font-medium"}
        onChange={(event) => {
          handleSelect(event.target.value as AppointmentStatusEnum);
        }}
      >
        {getEnumValues(AppointmentStatusEnum).map((status, index) => (
          <option value={status} key={index}>
            <TranslatableEnum value={status} />
          </option>
        ))}
      </select>
    </>
  );
};

export default AppointmentStatusColumn;
