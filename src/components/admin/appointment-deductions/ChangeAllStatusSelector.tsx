"use Client";

import SelectFilter from "@/components/common/ui/Selects/SelectFilter";
import AppointmentDeductionsStatusArray from "@/enum/AppointmentDeductionsStatus";

const ChangeAllStatusSelector = ({ status }: { status: number[] }) => {
  return <SelectFilter data={AppointmentDeductionsStatusArray()} />;
};

export default ChangeAllStatusSelector;
