"use client";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { AppointmentDeductions } from "@/Models/AppointmentDeductions";
import AppointmentDeductionsStatusArray from "@/enum/AppointmentDeductionsStatus";
import { AppointmentDeductionsService } from "@/services/AppointmentDeductionsService";
import { useQueryClient } from "@tanstack/react-query";

const AppointmentDeductionStatusColumn = ({
  transaction,
  revalidate,
  userType = "admin",
}: {
  transaction?: AppointmentDeductions;
  revalidate?: () => void;
  userType?: "admin" | "doctor";
}) => {
  const queryClient = useQueryClient();
  const revalidatee = () => {
    return queryClient.invalidateQueries({
      queryKey: ["tableData_undefined_Appointment Deductions"],
    });
  };
  const [selected, setSelected] = useState(transaction?.status);
  const handleSelectStatus = (status: string, id: number) => {
    return AppointmentDeductionsService.make<AppointmentDeductionsService>(
      userType,
    )
      .toggleStatus(id)
      .then((res) => {
        setSelected(status);
        toast.success("Status Changed!");
        return revalidate;
      });
  };

  useEffect(() => {
    setSelected(transaction?.status);
  }, [revalidate, revalidatee]);

  return (
    <>
      <select
        className={`select select-bordered text-sm font-medium w-fit `}
        value={selected}
        onChange={(e) =>
          handleSelectStatus(e.target.value, transaction?.id ?? 0)
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
