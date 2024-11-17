"use client";
import Form from "@/components/common/ui/Form";
import React, { Fragment, useState } from "react";
import { Navigate } from "@/Actions/navigate";
import { Prescription, PrescriptionsDataSend } from "@/Models/Prescriptions";
import { PrescriptionService } from "@/services/PrescriptionsServise";
import PageCard from "@/components/common/ui/PageCard";
import MultiMedicinesInput from "@/components/common/prescriptions/MultiMedicinesInput";
import PhysicalForm from "@/components/common/prescriptions/PhysicalForm";
import TestForm from "@/components/common/prescriptions/TestForm";
import { Appointment } from "@/Models/Appointment";
import MedicinesForm from "@/components/common/Medicine/MedicinesForm";
import { Dialog, Transition } from "@headlessui/react";
import { useTranslations } from "next-intl";
import HandleGetUserData from "@/hooks/HandleGetUserAndClinic";

const PrescriptionsForm = ({
  userType = "admin",
  defaultValues = undefined,
  appointment,
  id,
  customerId,
  type = "store",
}: {
  userType?: "admin" | "doctor";
  defaultValues?: Prescription;
  appointment?: Appointment;
  id?: number;
  customerId?: number;
  type?: "store" | "update";
}) => {
  const t = useTranslations("common.prescription.create");
  const clinicId = HandleGetUserData();
  const handleSubmit = async (data: PrescriptionsDataSend) => {
    const sendData: PrescriptionsDataSend = customerId
      ? {
          clinic_id: clinicId?.clinic?.id,
          customer_id: customerId,
          physical_information: data.physical_information,
          problem_description: data.problem_description,
          next_visit: (data?.next ?? 0) + (data?.visit ?? ""),
          test: data.test,
          medicines: data.medicines,
        }
      : {
          appointment_id: appointment?.id ?? 0,
          clinic_id: appointment?.clinic_id ?? 0,
          customer_id: appointment?.customer_id ?? 0,
          physical_information: data.physical_information,
          problem_description: data.problem_description,
          next_visit: (data?.next ?? 0) + (data?.visit ?? ""),
          test: data.test,
          medicines: data.medicines,
        };
    if (
      type === "update" &&
      (defaultValues?.id != undefined || id != undefined)
    ) {
      return await PrescriptionService.make<PrescriptionService>(
        userType
      ).update(defaultValues?.id ?? id, sendData);
    } else {
      return await PrescriptionService.make<PrescriptionService>(
        userType
      ).store(sendData);
    }
  };
  const onSuccess = () => {
    if (customerId) {
      Navigate(`/${userType}/patients/${customerId}`);
    } else {
      Navigate(`/${userType}/appointment/${appointment?.id}`);
    }
  };
  let [isOpen, setIsOpen] = useState(false);
  let [reloadSelect, setReloadSelect] = useState("");

  function closeModal(data?: string) {
    setReloadSelect(data ?? "");
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => closeModal("")}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex justify-center items-center p-4 min-h-full text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="bg-white shadow-xl p-6 rounded-2xl w-full max-w-md text-left transform transition-all overflow-hidden align-middle">
                  <div className="p-4">
                    <h2 className="card-title">{t("newMedicine")}</h2>
                    <MedicinesForm
                      typePage={"doctor"}
                      type={"prescription"}
                      closeModal={closeModal}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Form
        handleSubmit={handleSubmit}
        onSuccess={onSuccess}
        defaultValues={defaultValues}
      >
        <PageCard>
          <div className="flex flex-row justify-between my-4">
            <h2 className="card-title">{t("medicines")}</h2>
            <button
              type={"button"}
              className="btn btn-info"
              onClick={openModal}
            >
              {t("newMedicine")}
            </button>
          </div>
          <MultiMedicinesInput
            userType={userType}
            defaultValues={defaultValues?.medicines_data ?? undefined}
            type={type}
            reloadSelect={reloadSelect}
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
    </>
  );
};

export default PrescriptionsForm;
