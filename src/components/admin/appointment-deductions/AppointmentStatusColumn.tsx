"use client";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { AppointmentDeductions } from "@/Models/AppointmentDeductions";
import AppointmentDeductionsStatusArray from "@/enum/AppointmentDeductionsStatus";
import { AppointmentDeductionsService } from "@/services/AppointmentDeductionsService";

const AppointmentDeductionStatusColumn = ({
  appointmentDeduction,
}: {
  appointmentDeduction?: AppointmentDeductions;
  revalidate?: () => void;
}) => {
  const [selected, setSelected] = useState(appointmentDeduction?.status);
  const handleSelectStatus = (status: string, id: number) => {
    setSelected(status);
    return AppointmentDeductionsService.make<AppointmentDeductionsService>(
      "admin"
    )
      .toggleStatus(id)
      .then((res) => {
        setSelected(status);
        toast.success("Status Changed!");
      });
  };

  useEffect(() => {
    setSelected(appointmentDeduction?.status);
  }, [appointmentDeduction]);

  return (
    <>
      <select
        className={`select select-bordered text-sm font-medium w-fit `}
        value={selected}
        onChange={(e) =>
          handleSelectStatus(e.target.value, appointmentDeduction?.id ?? 0)
        }
      >
        {AppointmentDeductionsStatusArray().map((e, index) => (
          <option key={index} className={`block truncate text-warning`}>
            {e}
          </option>
        ))}
      </select>
    </>
  );
};

export default AppointmentDeductionStatusColumn;
