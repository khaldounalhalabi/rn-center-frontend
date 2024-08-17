import React, { HTMLProps } from "react";
import { AppointmentStatusEnum } from "@/enum/AppointmentStatus";

interface AppointmentStatusValueProps extends HTMLProps<HTMLSpanElement> {
  status: string;
}

const AppointmentStatusValue: React.FC<AppointmentStatusValueProps> = ({
  status,
  className,
  ...props
}) => {
  let color = `text-warning`;
  if (status == AppointmentStatusEnum.PENDING) {
    color = "text-warning";
  } else if (status == AppointmentStatusEnum.BOOKED) {
    color = "text-[#013567]";
  } else if (status == AppointmentStatusEnum.CHECKIN) {
    color = "text-success";
  } else if (status == AppointmentStatusEnum.CHECKOUT) {
    color = "text-text-gray-400";
  } else if (status == AppointmentStatusEnum.CANCELLED) {
    color = "text-error";
  }
  return (
    <span className={`${className} ${color}`} {...props}>
      {status}
    </span>
  );
};

export default AppointmentStatusValue;
