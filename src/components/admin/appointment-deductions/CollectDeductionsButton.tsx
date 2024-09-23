"use client";
import React, { useState } from "react";
import { AppointmentDeductionsService } from "@/services/AppointmentDeductionsService";
import { toast } from "react-toastify";
import { Clinic } from "@/Models/Clinic";
import { useMutation } from "@tanstack/react-query";
import LoadingSpin from "@/components/icons/LoadingSpin";

const CollectDeductionsButton = ({
  clinic,
  total: totalDeductions,
}: {
  clinic: Clinic;
  total: number;
}) => {
  const [total, setTotal] = useState(totalDeductions);
  const mutation = useMutation({
    mutationFn: (clinicId: number) =>
      AppointmentDeductionsService.make<AppointmentDeductionsService>(
        "admin",
      ).collectDeductionsForThisMonth(clinicId),
    onSuccess: (data) => {
      if (data.code == 200) {
        toast.success("Collected Successfully");
        setTotal(0);
      } else {
        toast.error("An error occurred operation failed");
      }
    },
    onError: () => {
      toast.error("An error occurred operation failed");
    },
  });

  return (
    <div
      className={`tooltip w-full flex items-center ${mutation.isPending || total == 0 ? "cursor-not-allowed" : ""}`}
      data-tip="Collect current month deductions for this clinic"
    >
      <button
        className={`btn w-full disabled:text-white btn-active text-black`}
        onClick={() => {
          if (clinic?.id) {
            mutation.mutate(clinic.id);
          }
        }}
        disabled={mutation.isPending || total == 0}
      >
        {`Collect Deductions ${total?.toFixed(2)} IQD  `}{" "}
        {mutation.isPending ? <LoadingSpin className={"h-6 w-6"} /> : ""}
      </button>
    </div>
  );
};

export default CollectDeductionsButton;
