"use client";
import React, { useState } from "react";
import { ClinicSubscription } from "@/Models/ClinicSubscription";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { ClinicSubscriptionService } from "@/services/ClinicSubscriptionServise";
import { toast } from "react-toastify";

const CollectSubscriptionButton = ({
  clinicId,
  clinicSubscription,
}: {
  clinicId: number;
  clinicSubscription?: ClinicSubscription;
}) => {
  const [isLoading, setLoading] = useState(false);
  const [isPaid, setPaid] = useState(clinicSubscription?.is_paid ?? true);
  return (
    <div className={"tooltip"} dat-tip={"Collect subscription for this month"}>
      <button
        className={"btn btn-secondary text-black"}
        disabled={(isPaid ?? true) || isLoading}
        onClick={() => {
          if (!clinicSubscription?.is_paid) {
            setLoading(true);
            ClinicSubscriptionService.make<ClinicSubscriptionService>("admin")
              .collectForThisMonth(clinicId)
              .then((res) => {
                setLoading(false);
                if (res.data) {
                  toast.success(res.message as string);
                  setPaid(true);
                } else {
                  toast.error("Failed");
                  setPaid(false);
                }
              });
          }
        }}
      >
        Collect Subscription{" "}
        {isLoading && <LoadingSpin className={"h-6 w-6"} />}
      </button>
    </div>
  );
};

export default CollectSubscriptionButton;
