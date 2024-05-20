import React, { Fragment, useState } from "react";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import Form from "@/components/common/ui/Form";
import Textarea from "@/components/common/ui/textArea/Textarea";
import { AppointmentService } from "@/services/AppointmentService";
import { AppointmentStatusEnum } from "@/enm/AppointmentStatus";
import { useFormContext } from "react-hook-form";

export default function SelectPopOver({
  id,
  required = false,

  status,
  ArraySelect,
  handleSelect = undefined,
  label,
  name,
}: {
  required?: boolean;

  id: number | undefined;
  status: string | undefined;
  ArraySelect: string[];
  handleSelect?: any;
  label?: string;
  name?: string;
}) {
  const [selected, setSelected] = useState(status);
  let [isOpen, setIsOpen] = useState(false);

  if (name) {
    const { setValue } = useFormContext();
    setValue(name, selected);
  }

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
        }
        return res;
      });
  };

  return (
    <div className=" w-full">
      {label ? (
        <label className="label w-fit">
          {label}
          {required ? <span className="ml-1 text-red-600">*</span> : false}
        </label>
      ) : (
        false
      )}
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mb-1">
          <Listbox.Button className="relative input input-bordered cursor-pointer w-full  rounded-lg bg-white  text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span
              className={`block truncate ${selected == "checkout" ? "text-neutral" : selected == "cancelled" ? "text-warning" : selected == "pending" ? "text-primary" : selected == "checkin" ? "text-success" : selected == "booked" ? "text-error" : selected == "completed" ? "text-info" : ""}`}
            >
              {selected}
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
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
                    } else {
                      handleSelect(person, id);
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
                        {person}
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
          className="relative z-10"
          onClose={() => {
            if (selected == "cancelled") {
              setSelected(status);
            }
            closeModal();
          }}
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
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Form handleSubmit={HandleCancel}>
                    <Textarea
                      name={"cancellation_reason"}
                      required={true}
                      label={"Cancellation Reason"}
                    />
                  </Form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
