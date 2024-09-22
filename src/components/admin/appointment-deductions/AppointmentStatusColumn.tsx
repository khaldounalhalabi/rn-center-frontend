"use client";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { AppointmentDeductions } from "@/Models/AppointmentDeductions";
import AppointmentDeductionsStatusArray from "@/enum/AppointmentDeductionsStatus";
import { AppointmentDeductionsService } from "@/services/AppointmentDeductionsService";
import LoadingSpin from "@/components/icons/LoadingSpin";

const AppointmentDeductionStatusColumn = ({
  appointmentDeduction,
}: {
  appointmentDeduction?: AppointmentDeductions;
  revalidate?: () => void;
}) => {
  const [selected, setSelected] = useState(appointmentDeduction?.status);
    const [loading,setLoading] = useState(false)
    const handleSelectStatus = (status: string, id: number) => {
        setLoading(true)
        setSelected(status);
    return AppointmentDeductionsService.make<AppointmentDeductionsService>(
      "admin"
    )
      .toggleStatus(id)
      .then((res) => {
        setSelected(status);
          setLoading(false)
          toast.success("Status Changed!");
      });
  };

  useEffect(() => {
    setSelected(appointmentDeduction?.status);
  }, [appointmentDeduction]);

  return (
    <>
        {loading?<div className={'flex justify-center items-center'}><LoadingSpin className={'w-6 h-6'}/></div>:<select
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
      </select>}
    </>
  );
};

export default AppointmentDeductionStatusColumn;