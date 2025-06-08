"use client";
import { Navigate } from "@/actions/Navigate";
import Form from "@/components/common/ui/Form";
import Grid from "@/components/common/ui/Grid";
import FormDatepicker from "@/components/common/ui/date-time-pickers/FormDatepicker";
import KeyValueMultipleInput from "@/components/common/ui/inputs/KeyValueMultipleInput";
import FormSelect from "@/components/common/ui/selects/FormSelect";
import PrescriptionMedicinesInput from "@/components/doctor/prescriptions/PrescriptionMedicinesInput";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { RoleEnum } from "@/enums/RoleEnum";
import useIsHoliday from "@/hooks/IsHoliday";
import useIsVacation from "@/hooks/IsVacation";
import { Appointment } from "@/models/Appointment";
import { Prescription } from "@/models/Prescriptions";
import { AppointmentService } from "@/services/AppointmentService";
import { PrescriptionService } from "@/services/PrescriptionsServise";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { useState } from "react";

const PrescriptionForm = ({
  appointment,
  clinicId,
  prescription = undefined,
  type = "store",
  customerId = undefined,
}: {
  appointment?: Appointment;
  clinicId: number;
  prescription?: Prescription;
  type: "store" | "update";
  customerId?: number;
}) => {
  const t = useTranslations("common.prescription");
  const [date, setDate] = useState(
    prescription?.next_visit ? dayjs(prescription?.next_visit) : dayjs(),
  );
  const isHoliday = useIsHoliday({ role: RoleEnum.DOCTOR });
  const isVacation = useIsVacation({ role: RoleEnum.DOCTOR });

  const { data: availableTimes, isLoading: isLoadingAvailableTimes } = useQuery(
    {
      queryKey: ["available_times", clinicId, date?.format("YYYY-MM-DD")],
      queryFn: async () => {
        return await AppointmentService.make(RoleEnum.DOCTOR).getAvailableTimes(
          clinicId ?? 0,
          date?.format("YYYY-MM-DD") ?? "",
        );
      },
      enabled: !!clinicId && !!date,
    },
  );

  const onSubmit = async (data: Record<string, any>) => {
    if (appointment?.customer_id) {
      data.customer_id = appointment?.customer_id;
    }

    if (customerId) {
      data.customer_id = customerId;
    }
    if (appointment?.id) {
      data.appointment_id = appointment?.id;
    }

    if (data.next_visit && data?.next_visit != prescription?.next_visit) {
      data.next_visit = date?.format("YYYY-MM-DD") + " " + data?.next_visit;
    }

    if (type == "store") {
      return await PrescriptionService.make(RoleEnum.DOCTOR).store(data);
    }

    return await PrescriptionService.make(RoleEnum.DOCTOR).update(
      prescription?.id,
      data,
    );
  };

  const onSuccess = async () => {
    if (appointment) {
      await Navigate(`/doctor/appointment/${appointment?.id}`);
    } else if (customerId) {
      await Navigate(`/doctor/patients/${customerId}`);
    }
  };

  return (
    <Form
      handleSubmit={onSubmit}
      defaultValues={prescription}
      onSuccess={onSuccess}
    >
      <Grid md={2} className={"items-end"}>
        <div className={"md:col-span-2"}>
          <PrescriptionMedicinesInput prescription={prescription} />
        </div>
        <div className={"md:col-span-2"}>
          <KeyValueMultipleInput
            name={"other_data"}
            label={t("other_data")}
            keyPlaceholder={t("info")}
            valuePlaceholder={t("data")}
          />
        </div>
        <FormDatepicker
          onChange={(value) => {
            setDate(value ?? dayjs());
          }}
          label={t("next_visit")}
          df={date?.format("YYYY-MM-DD")}
          shouldDisableDate={(date) =>
            isHoliday(date) || date?.isBefore(dayjs()) || isVacation(date)
          }
          name={"date"}
        />
        {isLoadingAvailableTimes ? (
          <div className="flex items-center justify-center">
            <LoadingSpin className="h-8 w-8" />
          </div>
        ) : (
          <FormSelect
            label={t("time")}
            items={availableTimes?.data ?? []}
            name="next_visit"
            defaultValue={
              prescription?.next_visit
                ? dayjs(prescription?.next_visit).format("HH:mm")
                : undefined
            }
          />
        )}
      </Grid>
    </Form>
  );
};

export default PrescriptionForm;
