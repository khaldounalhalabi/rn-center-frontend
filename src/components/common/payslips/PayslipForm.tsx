import React from "react";
import Payslip from "@/models/Payslip";
import Grid from "@/components/common/ui/Grid";
import KeyValueMultipleInput from "@/components/common/ui/inputs/KeyValueMultipleInput";
import Form from "@/components/common/ui/Form";
import PayslipService from "@/services/PayslipService";
import AdjustmentMultipleInput from "@/components/common/payslips/AdjustmentMultipleInput";
import { ApiResponse } from "@/http/Response";
import { useTranslations } from "next-intl";
import { RoleEnum } from "@/enums/RoleEnum";

const PayslipForm = ({
  payslip,
  onSuccess,
  role
}: {
  payslip?: Payslip;
  onSuccess?: () => void;
  role:RoleEnum
}) => {
  const t = useTranslations("payslips")
  const onSubmit = async (data: any) => {
    return await PayslipService.make(role).update(payslip?.id, data);
  };

  const handleSuccess = (res: ApiResponse<Payslip>) => {
    if (onSuccess) {
      onSuccess();
    }
  };
  return (
    <Form
      handleSubmit={onSubmit}
      defaultValues={payslip}
      onSuccess={handleSuccess}
    >
      <Grid>
        <div className={"col-span-2"}>
          <KeyValueMultipleInput
            name={"details.earnings"}
            label={t("earnings")}
            keyName={"label"}
            valueName={"value"}
            valueDefaultValue={"0"}
            keyDefaultValue={t("earning")}
            valuePlaceholder={t("value")}
            keyPlaceholder={t("earning")}
          />
        </div>

        <div className={"col-span-2"}>
          <KeyValueMultipleInput
            name={"details.deductions"}
            label={t("deductions")}
            keyName={"label"}
            valueName={"value"}
            valueDefaultValue={"0"}
            keyDefaultValue={t("deduction")}
            valuePlaceholder={t("value")}
            keyPlaceholder={t("deduction")}
          />
        </div>
        <div className={"col-span-2"}>
          <AdjustmentMultipleInput
            name={"payslip_adjustments"}
            label={t("adjustments")}
            defaultValueList={
              payslip?.payslip_adjustments?.map((i) => ({
                reason: i.reason ?? "",
                value: i.amount,
                type: i.type as "benefit" | "deduction",
              })) ?? []
            }
          />
        </div>
      </Grid>
    </Form>
  );
};

export default PayslipForm;
