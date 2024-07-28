"use client";
import { Appointment } from "@/Models/Appointment";
import AppointmentStatuses, {
  AppointmentStatusEnum,
} from "@/enum/AppointmentStatus";
import { AppointmentService } from "@/services/AppointmentService";
import { toast } from "react-toastify";
import { swal } from "@/Helpers/UIHelpers";
import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Form from "@/components/common/ui/Form";
import Textarea from "@/components/common/ui/textArea/Textarea";

const AppointmentStatusColumn = ({
  appointment,
  userType = "admin",
}: {
  appointment?: Appointment;
  revalidate?: () => void;
  userType?: "admin" | "doctor";
}) => {
  const [appointmentState, setAppointment] = useState(appointment);
  const [selected, setSelected] = useState(appointmentState?.status);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectStatus = (
    status: string,
    id: number,
    setSelected: React.Dispatch<string | undefined>,
  ) => {
    if (status == AppointmentStatusEnum.CHECKIN) {
      swal
        .fire({
          title: "Are you sure?",
          text: "marking this appointment as checkin will cause all previous appointments which marked as checkin to be checkout!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            return AppointmentService.make<AppointmentService>(userType)
              .toggleStatus(id, {
                status: status,
              })
              .then((res) => {
                setSelected(res.data.status);

                toast.success("Status Changed!");
              });
          } else {
            setSelected(appointmentState?.status);
          }
        });
    } else {
      return AppointmentService.make<AppointmentService>(userType)
        .toggleStatus(id, {
          status: status,
        })
        .then((res) => {
          toast.success("Status Changed!");
        });
    }
  };

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
    return await AppointmentService.make<AppointmentService>(userType)
      .toggleStatus(appointmentState?.id ?? 0, sendData)
      .then((res) => {
        if (res.code == 200) {
          closeModal();
          toast.success("Status Changed!");
        }
        return res;
      });
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={() => {
            if (selected == "cancelled") {
              setSelected(selected);
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
                  label={"Cancellation Reason"}
                />
              </Form>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
      <select
        defaultValue={selected}
        className={`select select-bordered text-sm font-medium w-fit `}
        onChange={(e) => {
          setSelected(e.target?.value);
          return e.target.value == AppointmentStatusEnum.CANCELLED
            ? openModal()
            : handleSelectStatus(
                e.target.value,
                appointmentState?.id ?? 0,
                setSelected,
              );
        }}
      >
        {AppointmentStatuses().map((e, index) => {
          return (
            <option
              key={index}
              className={`block truncate   ${
                e == AppointmentStatusEnum.CHECKOUT
                  ? "text-neutral"
                  : e == AppointmentStatusEnum.CANCELLED
                    ? "text-warning"
                    : e == AppointmentStatusEnum.PENDING
                      ? "text-primary"
                      : e == AppointmentStatusEnum.CHECKIN
                        ? "text-success"
                        : e == AppointmentStatusEnum.BOOKED
                          ? "text-error"
                          : e == "completed"
                            ? "text-info"
                            : ""
              }`}
            >
              {e}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default AppointmentStatusColumn;
