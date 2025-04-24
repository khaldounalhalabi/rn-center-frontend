"use client";
import { Appointment } from "@/Models/Appointment";
import { useTranslations } from "next-intl";
import Grid from "@/components/common/ui/Grid";
import ApiSelect from "@/components/common/ui/Selects/ApiSelect";
import React, { useEffect, useState } from "react";
import { Customer } from "@/Models/Customer";
import { CustomerService } from "@/services/CustomerService";
import Form from "@/components/common/ui/Form";
import { ClinicsService } from "@/services/ClinicsService";
import { Clinic } from "@/Models/Clinic";
import { ServiceService } from "@/services/ServiceService";
import { Service } from "@/Models/Service";
import Input from "@/components/common/ui/Inputs/Input";
import dayjs, { Dayjs } from "dayjs";
import Datepicker from "@/components/common/ui/Date/Datepicker";
import { useQuery } from "@tanstack/react-query";
import { AppointmentService } from "@/services/AppointmentService";
import Select from "@/components/common/ui/Selects/Select";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { getEnumValues } from "@/Helpers/Enums";
import { AppointmentStatusEnum } from "@/enum/AppointmentStatusEnum";
import Textarea from "@/components/common/ui/textArea/Textarea";
import { Navigate } from "@/Actions/navigate";

const AppointmentForm = ({
  defaultValues = undefined,
  type,
}: {
  defaultValues?: Appointment;
  type?: "store" | "update";
}) => {
  const t = useTranslations("common.appointment.create");
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [clinicId, setClinicId] = useState<number | undefined>(
    defaultValues?.clinic_id,
  );
  const [clinic, setClinic] = useState<Clinic | undefined>(
    defaultValues?.clinic,
  );

  const [serviceId, setServiceId] = useState<number | undefined>(
    defaultValues?.service_id,
  );
  const [extras, setExtras] = useState({
    extra_fees: defaultValues?.extra_fees ?? 0,
    discount: defaultValues?.discount ?? 0,
  });

  const [service, setService] = useState<Service | undefined>(
    defaultValues?.service,
  );

  const [totalCost, setTotalCost] = useState<number>(
    defaultValues?.total_cost ?? 0,
  );

  useEffect(() => {
    if (clinicId) {
      ClinicsService.make<ClinicsService>()
        .show(clinicId)
        .then((res) => {
          setClinic(res.data);
        });
    }

    if (serviceId) {
      ServiceService.make<ServiceService>()
        .show(serviceId)
        .then((res) => {
          setService(res?.data);
        });
    }
  }, [clinicId, serviceId]);

  useEffect(() => {
    setTotalCost(
      (service?.price ?? 0) +
        (extras?.extra_fees ?? 0) -
        (extras?.discount ?? 0) +
        (clinic?.appointment_cost ?? 0),
    );
  }, [clinicId, service, extras]);

  const { data: availableTimes, isLoading: isLoadingAvailableTimes } = useQuery(
    {
      queryKey: ["available_times", clinicId, date],
      queryFn: async () => {
        return await AppointmentService.make<AppointmentService>().getAvailableTimes(
          clinicId ?? 0,
          date?.format("YYYY-MM-DD") ?? "",
        );
      },
    },
  );
  const handleSubmit = (data: any) => {
    const dateTime = date?.format("YYYY-MM-DD") + " " + data.time;
    const service = AppointmentService.make();

    if (type == "store") {
      return service.store({ ...data, date_time: dateTime });
    } else {
      return service.update(defaultValues?.id ?? 0, {
        ...defaultValues,
        ...data,
        date_time: dateTime,
      });
    }
  };
  return (
    <Form
      handleSubmit={handleSubmit}
      onSuccess={() => {
        Navigate("/admin/appointment");
      }}
    >
      <Grid>
        {type == "store" && (
          <>
            <ApiSelect
              required={true}
              name={"customer_id"}
              label={t("patient")}
              api={(page?: number | undefined, search?: string | undefined) =>
                CustomerService.make<CustomerService>().indexWithPagination(
                  page,
                  search,
                )
              }
              getOptionLabel={(option: Customer) => option?.user?.full_name}
              optionValue={"id"}
              defaultValues={
                defaultValues?.customer ? [defaultValues.customer] : []
              }
              isMultiple={false}
              closeOnSelect={false}
            />

            <ApiSelect
              required={true}
              name={"clinic_id"}
              label={t("clinicName")}
              api={(page?: number | undefined, search?: string | undefined) =>
                ClinicsService.make<ClinicsService>().indexWithPagination(
                  page,
                  search,
                )
              }
              getOptionLabel={(option: Clinic) => option?.user?.full_name}
              optionValue={"id"}
              defaultValues={
                defaultValues?.clinic ? [defaultValues.clinic] : []
              }
              isMultiple={false}
              closeOnSelect={false}
              onChange={(event) => {
                // @ts-ignore
                setClinicId(event.target?.value);
              }}
            />
          </>
        )}
        <ApiSelect
          required={true}
          name={"service_id"}
          label={t("service")}
          api={(page?: number | undefined, search?: string | undefined) =>
            ServiceService.make<ServiceService>().indexWithPagination(
              page,
              search,
            )
          }
          getOptionLabel={(option: Service) => option?.name}
          optionValue={"id"}
          defaultValues={defaultValues?.service ? [defaultValues.service] : []}
          isMultiple={false}
          closeOnSelect={false}
          onChange={(e) => {
            //@ts-ignore
            setServiceId(e.target?.value);
          }}
        />

        <Select
          items={getEnumValues(AppointmentStatusEnum)}
          label={t("status")}
          name={"status"}
          defaultValue={defaultValues?.status}
        />
        <Input
          type={"number"}
          name={"extra_fees"}
          label={t("extraFees")}
          onInput={(e) => {
            console.log("asdasd");
            setExtras((prev) => ({
              ...prev,
              //@ts-ignore
              extra_fees: parseFloat(e.target?.value),
            }));
          }}
          defaultValue={defaultValues?.extra_fees ?? 0}
        />
        <Input
          type={"number"}
          name={"discount"}
          label={t("discount")}
          onInput={(e) => {
            setExtras((prev) => ({
              ...prev,
              //@ts-ignore
              discount: parseFloat(e.target?.value),
            }));
          }}
          defaultValue={defaultValues?.discount ?? 0}
        />
        <div className={"col-span-2 flex items-center justify-between"}>
          <span className={"badge badge-ghost"}>{t("totalCost")}</span>
          <span>{totalCost}</span>
        </div>
        <Datepicker
          label={t("date")}
          onChange={(e) => {
            setDate(e);
          }}
          df={date?.format("YYYY-MM-DD")}
          name={"date"}
        />
        {isLoadingAvailableTimes ? (
          <div className={"flex items-center justify-center"}>
            <LoadingSpin className={"w-8 h-8"} />
          </div>
        ) : (
          <Select
            label={t("time")}
            items={availableTimes?.data ?? []}
            name={"time"}
            defaultValue={defaultValues?.status}
          />
        )}
      </Grid>

      <Textarea
        name={"note"}
        label={t("note")}
        defaultValue={defaultValues?.note}
      />
    </Form>
  );
};

export default AppointmentForm;
