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

const AppointmentStatusColumn = ({
  appointment,
  revalidate,
  userType = "admin",
}: {
  appointment?: Appointment;
  revalidate?: () => void;
  userType?: "admin" | "doctor";
}) => {
  const [isPending, setPending] = useState<boolean>(false);
  const [isTransitionStarted, startTransition] = useTransition();
  const isMutating: boolean = isPending || isTransitionStarted;

  const [isPendingCheckout, setPendingCheckout] = useState<boolean>(false);
  const [isTransitionStartedCheckout, startTransitionCheckout] =
    useTransition();
  const isMutatingCheckout: boolean =
    isPendingCheckout || isTransitionStartedCheckout;
  let rot = useRouter();
  const [selected, setSelected] = useState(appointment?.status);

  const handleSelectStatus = (status: string, id: number) => {
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
                setSelected(res.data.status);
                toast.success("Status Changed!");
              });
          } else {
            setSelected(appointment?.status);
            setPendingCheckout(true);
            startTransitionCheckout(rot.refresh);
            setPendingCheckout(false);
          }
        });
    } else if (status === AppointmentStatusEnum.BOOKED) {
      return AppointmentService.make<AppointmentService>(userType)
        .toggleStatus(id, { status: status })
        .then((res) => {
          setSelected(AppointmentStatusEnum.BOOKED);
          toast.success("Status Changed!");
        });
    } else {
      return AppointmentService.make<AppointmentService>(userType)
        .toggleStatus(id, { status: status })
        .then((res) => {
          setSelected(status);
          console.log(selected);
          toast.success("Status Changed!");
        });
    }
  };
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setSelected(appointment?.status);
  }, [revalidate, appointment?.status, selected]);

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

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={() => {
            if (selected === "cancelled") {
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
                  label={"Cancellation Reason"}
                />
              </Form>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
      {isMutatingCheckout ? (
        "Loading..."
      ) : (appointment?.status === AppointmentStatusEnum.CANCELLED ||
          appointment?.status === AppointmentStatusEnum.CHECKOUT) &&
        appointment?.type == "online" ? (
        <div className={"w-full text-center"}>
          <span
            className={` badge  ${
              appointment?.status === AppointmentStatusEnum.CHECKOUT
                ? "badge-warning"
                : appointment?.status === AppointmentStatusEnum.CANCELLED
                  ? "badge-error"
                  : ""
            }`}
          >
            {selected}
          </span>
        </div>
      ) : (
        <select
          className={`select select-bordered text-sm font-medium w-fit `}
          onChange={(e) =>
            e.target.value === AppointmentStatusEnum.CANCELLED
              ? openModal()
              : handleSelectStatus(e.target.value, appointment?.id ?? 0)
          }
          value={selected}
        >
          {isMutating ? (
            <option>Loading...</option>
          ) : (
            AppointmentStatusesFilter(
              appointment?.type ?? "",
              appointment?.status ?? "",
            ).map((e, index) => (
              <option
                key={index}
                className={`block truncate ${
                  e === AppointmentStatusEnum.CHECKOUT
                    ? "text-neutral"
                    : e === AppointmentStatusEnum.CANCELLED
                      ? "text-warning"
                      : e === AppointmentStatusEnum.PENDING
                        ? "text-primary"
                        : e === AppointmentStatusEnum.CHECKIN
                          ? "text-success"
                          : e === AppointmentStatusEnum.BOOKED
                            ? "text-error"
                            : ""
                }`}
              >
                {e}
              </option>
            ))
          )}
        </select>
      )}
    </>
  );
};

export default AppointmentStatusColumn;
