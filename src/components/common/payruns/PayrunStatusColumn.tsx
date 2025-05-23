"use client";
import PayrunStatusEnum from "@/enums/PayrunStatusEnum";
import Payrun from "@/models/Payrun";
import TranslatableEnum from "@/components/common/ui/labels-and-values/TranslatableEnum";
import Select from "@/components/common/ui/selects/Select";
import { getEnumValues } from "@/helpers/Enums";
import React, { useState } from "react";
import PayrunService from "@/services/PayrunService";
import { toast } from "sonner";
import LoadingSpin from "@/components/icons/LoadingSpin";

const PayrunStatusColumn = ({
  payrun,
  revalidate,
}: {
  payrun: Payrun | undefined;
  revalidate?: () => void;
}) => {
  const [status, setStatus] = useState(payrun?.status);
  const [isLoading, setLoading] = useState(false);

  const onChange = (value: string) => {
    setStatus(value as PayrunStatusEnum);
    setLoading(true);
    PayrunService.make()
      .toggleStatus(payrun?.id ?? 0, value as PayrunStatusEnum)
      .then((res) => {
        setLoading(false);
        if (revalidate) {
          revalidate();
        }
        toast(res.message as string);
      });
  };

  if (
    payrun?.status == PayrunStatusEnum.DONE ||
    status == PayrunStatusEnum.DONE
  ) {
    return isLoading ? <LoadingSpin /> : <TranslatableEnum value={status} />;
  }

  if (
    payrun?.status == PayrunStatusEnum.PROCESSING ||
    status == PayrunStatusEnum.PROCESSING
  ) {
    return (
      <div className={"flex items-center gap-1"}>
        <TranslatableEnum value={status} />
        <LoadingSpin />
      </div>
    );
  }
  return isLoading ? (
    <LoadingSpin />
  ) : (
    <Select
      data={getEnumValues(PayrunStatusEnum).filter(
        (i) => i != PayrunStatusEnum.PROCESSING,
      )}
      selected={status}
      translated={true}
      onChange={onChange}
    />
  );
};

export default PayrunStatusColumn;
