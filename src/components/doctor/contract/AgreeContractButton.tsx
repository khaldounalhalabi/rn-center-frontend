"use client";
import { Navigate } from "@/Actions/navigate";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { AuthService } from "@/services/AuthService";
import { useMutation } from "@tanstack/react-query";

const AgreeContractButton = () => {
  const { isPending, mutate, isSuccess } = useMutation({
    mutationFn: async () =>
      await AuthService.make<AuthService>().agreeOnContract(),
    onSuccess: () => {
      Navigate("/doctor");
    },
  });

  return (
    <button
      className="btn bg-pom"
      disabled={isPending}
      onClick={() => {
        mutate();
      }}
    >
      Agree {isPending && <LoadingSpin />}
    </button>
  );
};

export default AgreeContractButton;
