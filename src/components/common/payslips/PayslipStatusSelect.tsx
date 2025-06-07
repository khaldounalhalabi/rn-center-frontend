import Select from "@/components/common/ui/selects/Select";
import LoadingSpin from "@/components/icons/LoadingSpin";
import PayslipStatusEnum from "@/enums/PayslipStatusEnum";
import { RoleEnum } from "@/enums/RoleEnum";
import Payslip from "@/models/Payslip";
import PayslipService from "@/services/PayslipService";
import React, { useState } from "react";
import { toast } from "sonner";

const PayslipStatusSelect = ({
  payslip,
  role,
  revalidate,
}: {
  payslip?: Payslip;
  role: RoleEnum;
  revalidate?: () => void;
}) => {
  const [isLoading, setLoading] = useState(false);
  const [status, setStatus] = React.useState<PayslipStatusEnum>(
    payslip?.status ?? PayslipStatusEnum.DRAFT,
  );

  const onChange = (value: string | PayslipStatusEnum) => {
    setLoading(true);
    PayslipService.make(role)
      .toggleStatus(payslip?.id ?? 0, value as PayslipStatusEnum)
      .then((res) => {
        setLoading(false);
        if (res.ok()) {
          setStatus(res?.data);
          if (revalidate) {
            revalidate();
          }
          toast(res.message as string);
        } else {
          setStatus(payslip?.status ?? PayslipStatusEnum.DRAFT);
          toast(res.message as string);
        }
      });
  };
  return isLoading ? (
    <LoadingSpin />
  ) : (
    <Select
      data={[
        PayslipStatusEnum.ACCEPTED,
        PayslipStatusEnum.REJECTED,
        PayslipStatusEnum.DRAFT,
      ]}
      translated
      onChange={onChange}
      selected={status}
    />
  );
};

export default PayslipStatusSelect;
