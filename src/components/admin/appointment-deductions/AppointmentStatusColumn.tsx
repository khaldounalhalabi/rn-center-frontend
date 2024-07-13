'use client'
import { Appointment } from "@/Models/Appointment";
import {NotificationPayload, RealTimeEvents} from "@/Models/NotificationPayload";
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
import {AppointmentDeductions} from "@/Models/AppointmentDeductions";
import AppointmentDeductionsStatusArray from "@/enum/AppointmentDeductionsStatus";
import {AppointmentDeductionsService} from "@/services/AppointmentDeductionsService";

const AppointmentStatusColumn = ({
                                     transaction,
                                     revalidate,
                                     userType = "admin"
                                 }: {
    transaction?: AppointmentDeductions;
    revalidate?: () => void;
    userType ?:"admin"|"doctor"
}) => {
    const [selected,setSelected] = useState(transaction?.status)
    const [isPending, setPending] = useState<boolean>(false);
    const [isTransitionStarted, startTransition] = useTransition();
    const isMutating:boolean = isPending || isTransitionStarted;
    let rot = useRouter()
    const handleSelectStatus =  (
        status: string,
        id: number) => {
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
                        return AppointmentDeductionsService.make<AppointmentDeductionsService>(userType)
                            .toggleStatus(id)
                            .then((res) => {
                                toast.success("Status Changed!");
                            });
                    } else {
                        setSelected(transaction?.status);
                        setPending(true);
                        startTransition(rot.refresh);
                        setPending(false);
                    }
                });
    };




    return (
        <>
            <select className={`select select-bordered text-sm font-medium w-fit `}
                    onChange={(e)=> handleSelectStatus(e.target.value,transaction?.id??0)}>
                {isMutating?<option>Loading...</option>:AppointmentDeductionsStatusArray().map((e,index)=>(
                    <option key={index}  selected={selected == e}
                            className={`block truncate text-warning`}
                    >{e}</option>

                ))
                }
            </select>

        </>
    );
};

export default AppointmentStatusColumn;