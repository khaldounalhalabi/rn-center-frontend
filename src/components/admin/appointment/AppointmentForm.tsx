"use client";
import { Navigate } from "@/actions/Navigate";
import Form from "@/components/common/ui/Form";
import Grid from "@/components/common/ui/Grid";
import FormDatepicker from "@/components/common/ui/date-time-pickers/FormDatepicker";
import FormInput from "@/components/common/ui/inputs/FormInput";
import ApiSelect from "@/components/common/ui/selects/ApiSelect";
import FormSelect from "@/components/common/ui/selects/FormSelect";
import FormTextarea from "@/components/common/ui/text-inputs/FormTextarea";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { AppointmentStatusEnum } from "@/enums/AppointmentStatusEnum";
import { getEnumValues } from "@/helpers/Enums";
import { useAppointmentForm } from "@/hooks/AppointmentFormHook";
import useIsHoliday from "@/hooks/IsHoliday";
import useIsVacation from "@/hooks/IsVacation";
import useUser from "@/hooks/UserHook";
import { Appointment } from "@/models/Appointment";
import { Clinic } from "@/models/Clinic";
import { Customer } from "@/models/Customer";
import { Service } from "@/models/Service";
import { AppointmentService } from "@/services/AppointmentService";
import { ClinicsService } from "@/services/ClinicsService";
import { PatientService } from "@/services/PatientService";
import { ServiceService } from "@/services/ServiceService";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import React, { memo, useCallback, useMemo } from "react";

interface AppointmentFormProps {
  defaultValues?: Appointment;
  type?: "store" | "update";
  defaultClinicId?: number;
  defaultCustomerId?: number;
  redirect: string;
}

const AppointmentForm = memo(
  ({
    defaultValues = undefined,
    type,
    defaultClinicId,
    redirect = "/admin/appointment",
    defaultCustomerId,
  }: AppointmentFormProps) => {
    const t = useTranslations("common.appointment.create");
    const { role } = useUser();

    const {
      date,
      setDate,
      clinicId,
      setClinicId,
      setServiceId,
      setExtraFees,
      setDiscount,
      totalCost,
      handleSubmit,
      clinic,
    } = useAppointmentForm({
      defaultValues,
      defaultClinicId,
      defaultCustomerId,
      type,
      redirect,
    });

    const isHoliday = useIsHoliday({ role: role });
    const isVacation = useIsVacation({
      role: role,
      userId: clinic?.user_id,
    });

    const { data: availableTimes, isLoading: isLoadingAvailableTimes } =
      useQuery({
        queryKey: ["available_times", clinicId, date?.format("YYYY-MM-DD")],
        queryFn: async () => {
          return await AppointmentService.make(role).getAvailableTimes(
            clinicId ?? 0,
            date?.format("YYYY-MM-DD") ?? "",
          );
        },
        enabled: !!clinicId && !!date,
      });

    const handleExtraFeesChange = useCallback(
      (e: React.FormEvent<HTMLInputElement>) => {
        const value = parseFloat((e.target as HTMLInputElement).value);
        setExtraFees(isNaN(value) ? 0 : value);
      },
      [setExtraFees],
    );

    const handleDiscountChange = useCallback(
      (e: React.FormEvent<HTMLInputElement>) => {
        const value = parseFloat((e.target as HTMLInputElement).value);
        setDiscount(isNaN(value) ? 0 : value);
      },
      [setDiscount],
    );

    const handleClinicChange = useCallback(
      (event: any) => {
        setClinicId(event.target?.value);
      },
      [setClinicId],
    );

    const handleServiceChange = useCallback(
      (e: any) => {
        setServiceId(e.target?.value);
      },
      [setServiceId],
    );

    const handleDateChange = useCallback(
      (newDate: any) => {
        setDate(newDate);
      },
      [setDate],
    );

    const showCustomerSelect = useMemo(
      () => type === "store" && !defaultCustomerId,
      [type, defaultCustomerId],
    );

    const showClinicSelect = useMemo(
      () => type === "store" && !defaultClinicId,
      [type, defaultClinicId],
    );

    const timeSelector = useMemo(() => {
      if (isLoadingAvailableTimes) {
        return (
          <div className="flex items-center justify-center">
            <LoadingSpin className="h-8 w-8" />
          </div>
        );
      }

      return (
        <FormSelect
          label={t("time")}
          items={availableTimes?.data ?? []}
          name="date_time"
          defaultValue={
            defaultValues?.date_time
              ? dayjs(defaultValues?.date_time).format("HH:mm")
              : undefined
          }
        />
      );
    }, [
      isLoadingAvailableTimes,
      availableTimes?.data,
      t,
      defaultValues?.date_time,
      dayjs,
    ]);

    return (
      <Form
        handleSubmit={handleSubmit}
        onSuccess={async () => {
          await Navigate(redirect);
        }}
        defaultValues={defaultValues}
      >
        <Grid className={"items-end"}>
          {showCustomerSelect && (
            <ApiSelect
              required={true}
              name="customer_id"
              label={t("patient")}
              api={(page?: number, search?: string) =>
                PatientService.make(role).indexWithPagination(page, search)
              }
              getOptionLabel={(option: Customer) => option?.user?.full_name}
              optionValue="id"
              defaultValues={
                defaultValues?.customer ? [defaultValues.customer] : []
              }
              isMultiple={false}
            />
          )}

          {showClinicSelect && (
            <ApiSelect
              required={true}
              name="clinic_id"
              label={t("clinicName")}
              api={(page?: number, search?: string) =>
                ClinicsService.make(role).indexWithPagination(page, search)
              }
              getOptionLabel={(option: Clinic) => option?.user?.full_name}
              optionValue="id"
              defaultValues={
                defaultValues?.clinic ? [defaultValues.clinic] : []
              }
              isMultiple={false}
              onChange={handleClinicChange}
            />
          )}
          <ApiSelect
            required={true}
            name="service_id"
            label={t("serviceName")}
            api={(page?: number, search?: string) =>
              ServiceService.make(role).getClinicService(clinicId, page, search)
            }
            getOptionLabel={(option: Service) => option?.name}
            optionValue="id"
            defaultValues={
              defaultValues?.service ? [defaultValues.service] : []
            }
            isMultiple={false}
            onChange={handleServiceChange}
            revalidate={clinicId}
          />

          <FormSelect
            items={getEnumValues(AppointmentStatusEnum).filter((i) =>
              type == "update" ? true : i != AppointmentStatusEnum.CANCELLED,
            )}
            label={t("status")}
            name="status"
            defaultValue={defaultValues?.status}
            translatable={true}
          />
          <FormInput
            type="number"
            name="extra_fees"
            label={t("extraFees")}
            onChange={handleExtraFeesChange}
            defaultValue={defaultValues?.extra_fees ?? 0}
          />
          <FormInput
            type="number"
            name="discount"
            label={t("discount")}
            onChange={handleDiscountChange}
            defaultValue={defaultValues?.discount ?? 0}
          />
          <div className="flex items-center justify-between md:col-span-2 border border-primary p-1 rounded-md">
            <span className="badge badge-ghost">{t("totalCost")}</span>
            <span>{totalCost}</span>
          </div>
          <FormDatepicker
            label={t("date")}
            onChange={handleDateChange}
            df={date?.format("YYYY-MM-DD")}
            name="date"
            shouldDisableDate={(date) =>
              isHoliday(date) || date?.isBefore(dayjs()) || isVacation(date)
            }
          />
          {timeSelector}
        </Grid>

        <FormTextarea
          name="note"
          label={t("note")}
          defaultValue={defaultValues?.note}
        />
      </Form>
    );
  },
);

AppointmentForm.displayName = "AppointmentForm";

export default AppointmentForm;
