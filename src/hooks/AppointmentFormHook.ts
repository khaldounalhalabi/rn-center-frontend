import { Appointment } from "@/models/Appointment";
import { Clinic } from "@/models/Clinic";
import { Service } from "@/models/Service";
import { AppointmentService } from "@/services/AppointmentService";
import { ClinicsService } from "@/services/ClinicsService";
import { ServiceService } from "@/services/ServiceService";
import dayjs, { Dayjs } from "dayjs";
import { useCallback, useEffect, useState } from "react";

interface UseAppointmentFormProps {
  defaultValues?: Appointment;
  defaultClinicId?: number;
  defaultCustomerId?: number;
  type?: "store" | "update";
  redirect: string;
}

export const useAppointmentForm = ({
  defaultValues,
  defaultClinicId,
  defaultCustomerId,
  type,
}: UseAppointmentFormProps) => {
  // Date state
  const [date, setDate] = useState<Dayjs | null>(
    defaultValues?.date_time ? dayjs(defaultValues.date_time) : dayjs(),
  );

  // Clinic state
  const [clinicId, setClinicId] = useState<number | undefined>(
    defaultClinicId ?? defaultValues?.clinic_id,
  );
  const [clinic, setClinic] = useState<Clinic | undefined>(
    defaultValues?.clinic,
  );

  // Service state
  const [serviceId, setServiceId] = useState<number | undefined>(
    defaultValues?.service_id,
  );
  const [service, setService] = useState<Service | undefined>(
    defaultValues?.service,
  );

  // Extra fees and discounts
  const [extras, setExtras] = useState({
    extra_fees: defaultValues?.extra_fees ?? 0,
    discount: defaultValues?.discount ?? 0,
  });

  // Total cost calculation
  const [totalCost, setTotalCost] = useState<number>(
    defaultValues?.total_cost ?? 0,
  );

  // Fetch clinic data when clinicId changes
  useEffect(() => {
    let isMounted = true;

    if (clinicId) {
      ClinicsService.make()
        .show(clinicId)
        .then((res) => {
          if (isMounted) {
            setClinic(res.data);
          }
        });
    }

    return () => {
      isMounted = false;
    };
  }, [clinicId]);

  // Fetch service data when serviceId changes
  useEffect(() => {
    let isMounted = true;

    if (serviceId) {
      ServiceService.make()
        .show(serviceId)
        .then((res) => {
          if (isMounted) {
            setService(res?.data);
          }
        });
    }

    return () => {
      isMounted = false;
    };
  }, [serviceId]);

  // Calculate total cost when dependencies change
  useEffect(() => {
    setTotalCost(
      (service?.price ?? 0) +
        (extras?.extra_fees ?? 0) -
        (extras?.discount ?? 0) +
        (clinic?.appointment_cost ?? 0),
    );
  }, [service, extras, clinic]);

  // Set extra fees
  const setExtraFees = useCallback((value: number) => {
    setExtras((prev) => ({
      ...prev,
      extra_fees: value,
    }));
  }, []);

  // Set discount
  const setDiscount = useCallback((value: number) => {
    setExtras((prev) => ({
      ...prev,
      discount: value,
    }));
  }, []);

  // Form submission handler
  const handleSubmit = useCallback(
    (data: any) => {
      const service = AppointmentService.make();
      if (data?.date_time && data?.date_time != defaultValues?.date_time) {
        data.date_time =
          date?.format("YYYY-MM-DD") +
          " " +
          data?.date_time;
      }

      if (defaultClinicId) {
        data = { ...data, clinic_id: defaultClinicId };
      }

      if (defaultCustomerId) {
        data = { ...data, customer_id: defaultCustomerId };
      }

      if (type === "store") {
        return service.store({ ...data });
      } else {
        return service.update(defaultValues?.id ?? 0, {
          ...data,
        });
      }
    },
    [date, defaultClinicId, defaultCustomerId, defaultValues, type],
  );

  return {
    date,
    setDate,
    clinicId,
    setClinicId,
    clinic,
    serviceId,
    setServiceId,
    service,
    extras,
    setExtraFees,
    setDiscount,
    totalCost,
    handleSubmit,
  };
};
