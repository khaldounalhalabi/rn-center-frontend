import BankNote from "@/components/icons/BankNote";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { ClinicSubscription } from "@/Models/ClinicSubscription";
import { ClinicSubscriptionService } from "@/services/ClinicSubscriptionService";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

const CollectSpecificSubscriptionButton = ({
  clinicSubscription,
  refetch,
}: {
  clinicSubscription?: ClinicSubscription;
  refetch: (() => void) | undefined;
}) => {
  const [subscription, setSubscription] = useState<
    undefined | ClinicSubscription
  >(clinicSubscription);
  const mutation = useMutation({
    mutationFn: (clinicSubscriptionId: number) =>
      ClinicSubscriptionService.make<ClinicSubscriptionService>(
        "admin",
      ).collect(clinicSubscriptionId),
    onSuccess: (data) => {
      if (data.data === true) {
        toast.success("Collected successfully");
        setSubscription((prev) =>
          prev ? { ...prev, is_paid: true } : undefined,
        );

        if (refetch) {
          refetch();
        }
      } else {
        toast.error("There is been an error");
      }
    },
  });
  return (
    <div
      className="tooltip"
      data-tip={"Collect subscription cost for this subscription"}
    >
      <button
        className="btn btn-sm btn-square disabled:cursor-not-allowed"
        disabled={
          subscription?.is_paid ||
          mutation.isPending ||
          subscription?.subscription?.cost == 0
        }
        onClick={() => {
          if (subscription) {
            mutation.mutate(subscription?.id);
          }
        }}
      >
        {mutation.isPending ? <LoadingSpin /> : <BankNote />}
      </button>
    </div>
  );
};

export default CollectSpecificSubscriptionButton;
