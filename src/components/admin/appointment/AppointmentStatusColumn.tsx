"use client";
import { Appointment } from "@/models/Appointment";
import { getEnumValues } from "@/helpers/Enums";
import { AppointmentStatusEnum } from "@/enums/AppointmentStatusEnum";
import { useState } from "react";
import DialogPopup from "@/components/common/ui/DialogPopup";
import Form from "@/components/common/ui/Form";
import { useTranslations } from "next-intl";
import { Label } from "@/components/common/ui/labels-and-values/Label";
import { AppointmentService } from "@/services/AppointmentService";
import LoadingSpin from "@/components/icons/LoadingSpin";
import Select from "@/components/common/ui/selects/Select";
import { Textarea } from "@/components/ui/shadcn/textarea";

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
      setSelectedStatus(status)
    } else {
      handleChange(status);
    }
  };

  const handleChange = async (status: AppointmentStatusEnum) => {
    setLoading(true);
    const response = await AppointmentService.make()
      .toggleStatus(appointment.id, status, cancellationReason)
      .then((res) => {
        if (res.ok()) {
          setSelectedStatus(status);
        }
        return res;
      });

    setLoading(false);
    return response;
  };

  return loading ? (
    <LoadingSpin className={"h-6 w-6"} />
  ) : (
    <>
      <DialogPopup open={open} onClose={()=>setOpen(false)}>
        <Form
          handleSubmit={() => {
            setOpen(false);
            return handleChange(selectedStatus);
          }}
        >
          <Label label={t("cancellation_reason")} col>
            <Textarea
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
      <Select
        data={getEnumValues(AppointmentStatusEnum)}
        onChange={(value) => {
          handleSelect(value as AppointmentStatusEnum);
        }}
        translated={true}
        selected={selectedStatus}
      />
    </>
  );
};

export default AppointmentStatusColumn;
