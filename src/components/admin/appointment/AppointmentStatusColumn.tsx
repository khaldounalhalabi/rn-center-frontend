'use client'
import { Appointment } from "@/Models/Appointment";
import { RealTimeEvents } from "@/Models/NotificationPayload";
import NotificationHandler from "@/components/common/NotificationHandler";
import AppointmentStatuses, {
  AppointmentStatusEnum,
} from "@/enum/AppointmentStatus";
import { AppointmentService } from "@/services/AppointmentService";
import { toast } from "react-toastify";
import { swal } from "@/Helpers/UIHelpers";
import React, {Fragment, useEffect, useState, useTransition} from "react";
import {useRouter} from "@/navigation";
import {Dialog, Transition} from "@headlessui/react";
import Form from "@/components/common/ui/Form";
import Textarea from "@/components/common/ui/textArea/Textarea";

const AppointmentStatusColumn = ({
  appointment,
  revalidate,
}: {
  appointment?: Appointment;
  revalidate?: () => void;
}) => {
    const [isPending, setPending] = useState<boolean>(false);
    const [isTransitionStarted, startTransition] = useTransition();
    const isMutating:boolean = isPending || isTransitionStarted;
    let rot = useRouter()

    const handleSelectStatus =  (
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
            return AppointmentService.make<AppointmentService>("admin")
              .toggleStatus(id, {
                status: status,
              })
              .then((res) => {
                toast.success("Status Changed!");
              });
          } else {
            setSelected(appointment?.status);
              setPending(true);
              startTransition(rot.refresh);
              setPending(false);
          }
        });
    } else {
      return  AppointmentService.make<AppointmentService>("admin")
        .toggleStatus(id, {
          status: status,
        })
        .then((res) => {
          toast.success("Status Changed!");
        });
    }
  };
  const [selected,setSelected] = useState(appointment?.status)
    const [isOpen, setIsOpen] = useState(false);

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
            .toggleStatus(appointment?.id ?? 0, sendData)
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
      <NotificationHandler
        handle={(payload) => {
          if (
            payload.getNotificationType() ==
              RealTimeEvents.AppointmentStatusChange &&
            revalidate
          ) {
            revalidate();
          }
        }}
      />
        <select className="select select-info w-fit" onChange={(e)=>e.target.value == AppointmentStatusEnum.CANCELLED ?openModal() : handleSelectStatus(e.target.value,appointment?.id??0,setSelected)}>
            {isMutating?<option>Loading...</option>:AppointmentStatuses().map((e,index)=>(
                <option key={index}  selected={selected == e}>{e}</option>
            ))
            }
        </select>

    </>
  );
};

export default AppointmentStatusColumn;