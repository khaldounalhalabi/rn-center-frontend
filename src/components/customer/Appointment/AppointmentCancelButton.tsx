"use client";
import { Navigate } from "@/Actions/navigate";
import AuthSubmitButton from "@/components/common/Auth/Customer/AuthSubmitButton";
import { AppointmentStatusEnum } from "@/enum/AppointmentStatus";
import { Appointment } from "@/Models/Appointment";
import { AppointmentService } from "@/services/AppointmentService";
import dayjs from "dayjs";

const AppointmentCancelButton = ({
  appointment = undefined,
}: {
  appointment?: Appointment;
}) => {
  return (
    <>
      {(appointment?.status == AppointmentStatusEnum.PENDING ||
        appointment?.status == AppointmentStatusEnum.BOOKED) &&
      (dayjs(appointment?.date).isAfter(dayjs()) ||
        dayjs(appointment?.date).isSame(dayjs())) ? (
        <div className="cursor-pointer flex items-center justify-start my-5 px-3">
          <AuthSubmitButton
            type="button"
            onClick={() => {
              AppointmentService.make<AppointmentService>("customer")
                .customerCancelAppointment(appointment.id)
                .then(() => {
                  Navigate("/customer/appointments");
                });
            }}
            className="px-5 py-1"
          >
            Cancel
          </AuthSubmitButton>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default AppointmentCancelButton;
