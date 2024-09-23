"use client";
import React, { useState } from "react";
import { ClinicSubscription } from "@/Models/ClinicSubscription";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { ClinicSubscriptionService } from "@/services/ClinicSubscriptionService";

const CollectSubscriptionButton = ({
  clinicId,
  clinicSubscription,
}: {
  clinicId: number;
  clinicSubscription?: ClinicSubscription;
}) => {
  const [isPaid, setPaid] = useState(clinicSubscription?.is_paid ?? true);
  const mutation = useMutation({
    mutationFn: (clinicId: number) =>
      ClinicSubscriptionService.make<ClinicSubscriptionService>(
        "admin",
      ).collectForThisMonth(clinicId),
    onSuccess: (data) => {
      toast.success(data.message as string);
      if (data.code == 200) {
        setPaid(true);
      }
    },
    onError: (error) => {
      toast.error("An error occurred " + `(${error.message})`);
      setPaid(false);
    },
  });

  return (
    <div
      className={`tooltip w-full flex items-center ${(isPaid ?? true) || mutation.isPending ? ` cursor-not-allowed` : ""}`}
      data-tip={"Collect subscription for this month"}
    >
      <button
        className={
          "btn btn-active disabled:text-white disabled:cursor-not-allowed text-black w-full flex items-center"
        }
        disabled={
          (isPaid ?? true) ||
          mutation.isPending ||
          clinicSubscription?.subscription?.cost == 0
        }
        onClick={() => {
          if (!clinicSubscription?.is_paid) {
            mutation.mutate(clinicId);
          }
        }}
      >
        {" "}
        Collect Subscription
        {` ${clinicSubscription?.subscription?.cost?.toFixed(2) ?? 0} IQD`}
        {mutation.isPending && <LoadingSpin className={"h-6 w-6"} />}
      </button>
    </div>
  );
};

export default CollectSubscriptionButton;
