"use client";
import Form from "@/components/common/ui/Form";
import React from "react";
import { Navigate } from "@/Actions/navigate";
import {
  Prescriptions,
  PrescriptionsData,
  PrescriptionsDataSend,
} from "@/Models/Prescriptions";
import { PrescriptionsService } from "@/services/PrescriptionsServise";
import PageCard from "@/components/common/ui/PageCard";
import MultiMedicinesInput from "@/components/admin/prescriptions/MultiMedicinesInput";
import PhysicalForm from "@/components/admin/prescriptions/PhysicalForm";
import TestForm from "@/components/admin/prescriptions/TestForm";
import { Appointment } from "@/Models/Appointment";

const PrescriptionsForm = ({
  defaultValues = undefined,
  appointment,
  id,
  type = "store",
}: {
  defaultValues?: Prescriptions;
  appointment: Appointment;
  id?: number;
  type?: "store" | "update";
}) => {
  console.log(defaultValues);
  const handleSubmit = async (data: PrescriptionsData) => {
    const sendData: PrescriptionsDataSend = {
      appointment_id: appointment.id,
      clinic_id: appointment.clinic_id,
      customer_id: appointment.customer_id,
      physical_information: data.physical_information,
      problem_description: data.problem_description,
      next_visit: data.next + data.visit,
      test: data.test,
      medicines: data.medicines,
    };
    console.log(sendData);
    if (
      type === "update" &&
      (defaultValues?.id != undefined || id != undefined)
    ) {
      return PrescriptionsService.make<PrescriptionsService>("admin")
        .update(defaultValues?.id ?? id, sendData)
        .then((res) => {
          console.log(res);
          return res;
        });
    } else {
      return await PrescriptionsService.make<PrescriptionsService>("admin")
        .store(sendData)
        .then((res) => {
          console.log(res);
          return res;
        });
    }
  };
  const onSuccess = () => {
    Navigate(`/admin/appointment/${appointment?.id}`);
  };
  return (
    <Form
      handleSubmit={handleSubmit}
      onSuccess={onSuccess}
      defaultValues={defaultValues}
    >
      <PageCard>
        <MultiMedicinesInput
          defaultValues={defaultValues?.medicines_data ?? undefined}
          type={type}
        />
      </PageCard>
      <PageCard>
        <PhysicalForm
          defaultValue={defaultValues?.physical_information ?? undefined}
        />
      </PageCard>
      <PageCard>
        <TestForm defaultValue={defaultValues ?? undefined} />
      </PageCard>
    </Form>
  );
};

export default PrescriptionsForm;


