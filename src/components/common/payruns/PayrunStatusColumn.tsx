"use client";
import TranslatableEnum from "@/components/common/ui/labels-and-values/TranslatableEnum";
import Select from "@/components/common/ui/selects/Select";
import LoadingSpin from "@/components/icons/LoadingSpin";
import PayrunStatusEnum from "@/enums/PayrunStatusEnum";
import { getEnumValues } from "@/helpers/Enums";
import Payrun from "@/models/Payrun";
import PayrunService from "@/services/PayrunService";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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
        if (res.ok()) {
          if (revalidate) {
            revalidate();
          }
          toast.success(res.message as string);
        } else {
          toast.error(res.message as string);
          setStatus(payrun?.status);
        }
      });
  };

  useEffect(() => {
    setStatus(payrun?.status);
  }, [payrun]);

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
