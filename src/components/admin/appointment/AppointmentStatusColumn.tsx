"use client";
import { Appointment } from "@/Models/Appointment";
import { getEnumValues } from "@/Helpers/Enums";
import { AppointmentStatusEnum } from "@/enum/AppointmentStatusEnum";
import TranslatableEnum from "@/components/common/ui/labels-and-values/TranslatableEnum";
import { useState } from "react";
import Dialog from "@/components/common/ui/Dialog";
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
    <LoadingSpin className={"w-6 h-6"} />
  ) : (
    <>
      <Dialog open={open}>
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
              className={"w-full textarea"}
              onChange={(e) => {
                setCancellationReason(e.target.value);
              }}
            />
          </Label>
        </Form>
      </Dialog>
      <select
        defaultValue={selectedStatus}
        className={"select select-bordered text-sm font-medium w-fit"}
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
