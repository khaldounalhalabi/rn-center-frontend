"use client";
import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import Form from "@/components/common/ui/Form";
import Textarea from "@/components/common/ui/textArea/Textarea";
import { AppointmentService } from "@/services/AppointmentService";
import { AppointmentStatusEnum } from "@/enum/AppointmentStatus";
import { toast } from "react-toastify";
import TranslatableEnum from "@/components/common/ui/TranslatableEnum";
import { useTranslations } from "next-intl";

export default function SelectPopOver({
  id,
  required = false,
  status,
  ArraySelect,
  handleSelect = undefined,
  label,
  fixed = false,
  translatedStatusTypeItem = false,
}: {
  required?: boolean;
  fixed?: boolean;
  id: number | undefined;
  status: string | undefined;
  ArraySelect: string[];
  handleSelect?: any;
  label?: string;
  translatedStatusTypeItem?: boolean;
}) {
  const [selected, setSelected] = useState(status);
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("components");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const HandleCancel = async (data: { cancellation_reason: string }) => {
    const sendData = {
      status: AppointmentStatusEnum.CANCELLED,
      cancellation_reason: data.cancellation_reason ?? "",
    };
    return await AppointmentService.make<AppointmentService>("admin")
      .toggleStatus(id ?? 0, sendData)
      .then((res) => {
        if (res.code == 200) {
          closeModal();
          toast.success(<TranslatableEnum value={"status_changed"} />);
        }
        return res;
      });
  };

  useEffect(() => {
    setSelected(status);
  }, [id, status]);

  return (
    <div className="relative w-full">
      {label && (
        <label className="label w-fit">
          {label}
          {required && <span className="ml-1 text-red-600">*</span>}
        </label>
      )}
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mb-1">
          <Listbox.Button className="relative input input-bordered cursor-pointer w-full rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span
              className={`block truncate ${
                selected == "checkout"
                  ? "text-neutral"
                  : selected == "cancelled"
                    ? "text-warning"
                    : selected == "pending"
                      ? "text-primary"
                      : selected == "checkin"
                        ? "text-success"
                        : selected == "booked"
                          ? "text-error"
                          : selected == "completed"
                            ? "text-info"
                            : ""
              }`}
            >
              {translatedStatusTypeItem ? (
                <TranslatableEnum value={selected} />
              ) : (
                selected
              )}
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Listbox.Options
              className={`absolute overflow-auto
                  z-50 mt-1 max-h-60 w-full  rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm`}
            >
              {ArraySelect.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative select-none py-2 text-center cursor-pointer ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  onClick={() => {
                    if (person == "cancelled") {
                      openModal();
                      setSelected(status);
                    } else {
                      handleSelect(person, id, setSelected);
                      setSelected(status);
                    }
                  }}
                  value={person}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {translatedStatusTypeItem ? (
                          <TranslatableEnum value={person} />
                        ) : (
                          person
                        )}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={() => {
            if (selected == "cancelled") {
              setSelected(status);
            }
            closeModal();
          }}
        >
          <div className="flex items-center justify-center min-h-screen p-4 text-center">
            <Dialog.Panel className="relative w-full max-w-md px-4 py-6 bg-white shadow-lg rounded-lg">
              <Form handleSubmit={HandleCancel} showToastMessage={false}>
                <Textarea
                  name={"cancellation_reason"}
                  required={true}
                  label={t("cancellation_reason")}
                />
              </Form>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
