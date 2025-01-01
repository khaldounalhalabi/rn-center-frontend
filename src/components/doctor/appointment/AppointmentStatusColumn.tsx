"use client";
import { Appointment } from "@/Models/Appointment";
import { AppointmentService } from "@/services/AppointmentService";
import { toast } from "react-toastify";
import { swal } from "@/Helpers/UIHelpers";
import React, { Fragment, useEffect, useState, useTransition } from "react";
import { useRouter } from "@/navigation";
import { Dialog, Transition } from "@headlessui/react";
import Form from "@/components/common/ui/Form";
import Textarea from "@/components/common/ui/textArea/Textarea";
import {
  AppointmentStatusEnum,
  AppointmentStatusesFilter,
} from "@/enum/AppointmentStatus";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { TranslateStatusOrTypeClient } from "@/Helpers/TranslationsClient";

const AppointmentStatusColumn = ({
  appointment,
  revalidate,
  userType = "admin",
}: {
  appointment?: Appointment;
  revalidate?: () => void;
  userType?: "admin" | "doctor";
}) => {
  const [appointmentState, setAppointment] = useState<Appointment | undefined>(
    appointment,
  );

  const [loading, setLoading] = useState(false);

  const [isPendingCheckout, setPendingCheckout] = useState<boolean>(false);
  const [isTransitionStartedCheckout, startTransitionCheckout] =
    useTransition();
  const isMutatingCheckout: boolean =
    isPendingCheckout || isTransitionStartedCheckout;
  let rot = useRouter();
  const [selected, setSelected] = useState(appointment?.status);

  const handleSelectStatus = (status: string, id: number) => {
    setLoading(true);
    if (status === AppointmentStatusEnum.CHECKIN) {
      swal
        .fire({
          title: "Are you sure?",
          text: "Marking this appointment as checkin will cause all previous appointments marked as checkin to be checkout!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            return AppointmentService.make<AppointmentService>(userType)
              .toggleStatus(id, { status: status })
              .then((res) => {
                setLoading(false);
                setSelected(res.data.status);
                toast.success("Status Changed!");
              });
          } else {
            setLoading(false);
            setSelected(appointment?.status);
            setPendingCheckout(true);
            startTransitionCheckout(rot.refresh);
            setPendingCheckout(false);
          }
        });
    } else if (status === AppointmentStatusEnum.BOOKED) {
      return AppointmentService.make<AppointmentService>(userType)
        .toggleStatus(id, { status: status })
        .then(() => {
          setLoading(false);
          setSelected(AppointmentStatusEnum.BOOKED);
          toast.success("Status Changed!");
        });
    } else {
      return AppointmentService.make<AppointmentService>(userType)
        .toggleStatus(id, { status: status })
        .then(() => {
          setLoading(false);
          setSelected(status);
          toast.success("Status Changed!");
        });
    }
  };
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setSelected(appointment?.status);
  }, [revalidate, appointment?.status]);

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
      .toggleStatus(appointment?.id ?? 0, sendData)
      .then((res) => {
        if (res.code === 200) {
          closeModal();
          toast.success("Status Changed!");
        }
        return res;
      });
  };

  useEffect(() => {
    setAppointment(appointment);
  }, [appointment]);

  useEffect(() => {
    if (appointmentState?.status) {
      setAppointment({
        ...appointmentState,
        status: selected ?? appointmentState.status,
      });
    }
  }, [selected]);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={() => {
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
      {loading ? (
        <div className={"flex justify-center items-center"}>
          <LoadingSpin className={"w-6 h-6"} />
        </div>
      ) : (
        <>
          {isMutatingCheckout ? (
            "Loading..."
          ) : (appointmentState?.status === AppointmentStatusEnum.CANCELLED ||
              appointmentState?.status === AppointmentStatusEnum.CHECKOUT) &&
            appointmentState?.type == "online" ? (
            <div className={"text-center"}>
              <span
                className={` badge  ${
                  appointmentState?.status === AppointmentStatusEnum.CANCELLED
                    ? "badge-error"
                    : appointmentState?.status ===
                        AppointmentStatusEnum.CHECKOUT
                      ? "badge-warning"
                      : ""
                }`}
              >
                {TranslateStatusOrTypeClient(selected)}
              </span>
            </div>
          ) : (
            <select
              className={`select select-bordered text-sm font-medium w-fit 
          ${
            appointmentState?.status == AppointmentStatusEnum.CHECKOUT
              ? "text-[#0089c1]"
              : appointmentState?.status == AppointmentStatusEnum.CANCELLED
                ? "text-[#ff5861]"
                : appointmentState?.status == AppointmentStatusEnum.PENDING
                  ? "text-[#ffa500]"
                  : appointmentState?.status == AppointmentStatusEnum.CHECKIN
                    ? "text-[#00a96e]"
                    : appointmentState?.status == AppointmentStatusEnum.BOOKED
                      ? "text-[#013567]"
                      : appointmentState?.status == "completed"
                        ? "text-info"
                        : ""
          }`}
              onChange={(e) => {
                e.target.value === AppointmentStatusEnum.CANCELLED
                  ? openModal()
                  : handleSelectStatus(e.target.value, appointment?.id ?? 0);

                setSelected(e.target.value);
              }}
              value={appointmentState?.status}
            >
              {AppointmentStatusesFilter(
                appointment?.type ?? "",
                appointment?.status ?? "",
              ).map((e, index) => (
                <option
                  key={index}
                  className={`block truncate  ${
                    e == AppointmentStatusEnum.CHECKOUT
                      ? "text-[#0089c1]"
                      : e == AppointmentStatusEnum.CANCELLED
                        ? "text-[#ff5861]"
                        : e == AppointmentStatusEnum.PENDING
                          ? "text-[#ffa500]"
                          : e == AppointmentStatusEnum.CHECKIN
                            ? "text-[#00a96e]"
                            : e == AppointmentStatusEnum.BOOKED
                              ? "text-[#013567]"
                              : e == "completed"
                                ? "text-info"
                                : ""
                  }`}
                >
                  {TranslateStatusOrTypeClient(e)}
                </option>
              ))}
            </select>
          )}
        </>
      )}
    </>
  );
};

export default AppointmentStatusColumn;
