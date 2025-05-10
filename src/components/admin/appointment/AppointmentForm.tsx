"use client";
import { Appointment } from "@/Models/Appointment";
import { useTranslations } from "next-intl";
import Grid from "@/components/common/ui/Grid";
import ApiSelect from "@/components/common/ui/selects/ApiSelect";
import React, { memo, useCallback, useMemo } from "react";
import { Customer } from "@/Models/Customer";
import { CustomerService } from "@/services/CustomerService";
import Form from "@/components/common/ui/Form";
import { ClinicsService } from "@/services/ClinicsService";
import { Clinic } from "@/Models/Clinic";
import { ServiceService } from "@/services/ServiceService";
import { Service } from "@/Models/Service";
import Input from "@/components/common/ui/Inputs/Input";
import Datepicker from "@/components/common/ui/Date/Datepicker";
import { useQuery } from "@tanstack/react-query";
import { AppointmentService } from "@/services/AppointmentService";
import FormSelect from "@/components/common/ui/selects/FormSelect";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { getEnumValues } from "@/Helpers/Enums";
import { AppointmentStatusEnum } from "@/enum/AppointmentStatusEnum";
import Textarea from "@/components/common/ui/textArea/Textarea";
import { Navigate } from "@/Actions/navigate";
import useIsHoliday from "@/hooks/IsHoliday";
import { useAppointmentForm } from "@/hooks/AppointmentFormHook";

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
    const isHoliday = useIsHoliday();

    const {
      date,
      setDate,
      clinicId,
      setClinicId,
      serviceId,
      setServiceId,
      extras,
      setExtraFees,
      setDiscount,
      totalCost,
      clinic,
      service,
      handleSubmit,
    } = useAppointmentForm({
      defaultValues,
      defaultClinicId,
      defaultCustomerId,
      type,
      redirect,
    });

    const { data: availableTimes, isLoading: isLoadingAvailableTimes } =
      useQuery({
        queryKey: ["available_times", clinicId, date?.format("YYYY-MM-DD")],
        queryFn: async () => {
          return await AppointmentService.make<AppointmentService>().getAvailableTimes(
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
            <LoadingSpin className="w-8 h-8" />
          </div>
        );
      }

      return (
        <FormSelect
          label={t("time")}
          items={availableTimes?.data ?? []}
          name="time"
          defaultValue={defaultValues?.status}
        />
      );
    }, [
      isLoadingAvailableTimes,
      availableTimes?.data,
      t,
      defaultValues?.status,
    ]);

    return (
      <Form
        handleSubmit={handleSubmit}
        onSuccess={() => {
          Navigate(redirect);
        }}
      >
        <Grid>
          {showCustomerSelect && (
            <ApiSelect
              required={true}
              name="customer_id"
              label={t("patient")}
              api={(page?: number, search?: string) =>
                CustomerService.make<CustomerService>().indexWithPagination(
                  page,
                  search,
                )
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
                ClinicsService.make<ClinicsService>().indexWithPagination(
                  page,
                  search,
                )
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
              ServiceService.make<ServiceService>().getClinicService(
                clinicId,
                page,
                search,
              )
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
            items={getEnumValues(AppointmentStatusEnum)}
            label={t("status")}
            name="status"
            defaultValue={defaultValues?.status}
            translatable={true}
          />
          <Input
            type="number"
            name="extra_fees"
            label={t("extraFees")}
            onInput={handleExtraFeesChange}
            defaultValue={defaultValues?.extra_fees ?? 0}
          />
          <Input
            type="number"
            name="discount"
            label={t("discount")}
            onInput={handleDiscountChange}
            defaultValue={defaultValues?.discount ?? 0}
          />
          <div className="md:col-span-2 flex items-center justify-between">
            <span className="badge badge-ghost">{t("totalCost")}</span>
            <span>{totalCost}</span>
          </div>
          <Datepicker
            label={t("date")}
            onChange={handleDateChange}
            df={date?.format("YYYY-MM-DD")}
            name="date"
            shouldDisableDate={isHoliday}
          />
          {timeSelector}
        </Grid>

        <Textarea
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
