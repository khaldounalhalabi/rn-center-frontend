"use Client";
import AppointmentDeductionsStatusArray, {
  AppointmentDeductionsStatus,
} from "@/enum/AppointmentDeductionsStatus";
import SelectPopOverFrom from "@/components/common/ui/Selects/SelectPopOverForm";
import Form from "@/components/common/ui/Form";
import { AppointmentDeductionsService } from "@/services/AppointmentDeductionsService";
import { useEffect, useState } from "react";

const ChangeAllStatusSelector = ({
  items,
  closeModalStatus,
}: {
  items: { id?: number; status?: string; amount?: number }[];
  closeModalStatus: any;
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(
    undefined
  );
  const [total, setTotal] = useState(0);
  const handleSelect = async (data: any) => {
    const dataSend = {
      status: data.status,
      ids: items.map((item) => item.id).filter((item) => item != undefined),
    };

    return await AppointmentDeductionsService.make<AppointmentDeductionsService>(
      "admin"
    )
      .bulkToggleStatus(dataSend)
      .then((res) => {
        closeModalStatus();
        return res;
      });
  };

  const getTotal = () => {
    let total = 0;

    items.forEach((item) => {
      if (
        item.status == AppointmentDeductionsStatus.PENDING &&
        selectedStatus == AppointmentDeductionsStatus.DONE
      ) {
        total += item.amount ?? 0;
      } else if (
        item.status == AppointmentDeductionsStatus.PENDING &&
        selectedStatus == AppointmentDeductionsStatus.PENDING
      ) {
        total = total;
      } else if (
        item.status == AppointmentDeductionsStatus.DONE &&
        selectedStatus == AppointmentDeductionsStatus.PENDING
      ) {
        total -= item.amount ?? 0;
      } else if (
        item.status == AppointmentDeductionsStatus.DONE &&
        selectedStatus == AppointmentDeductionsStatus.DONE
      ) {
        total = total;
      }
    });
    return total;
  };

  useEffect(() => {
    setTotal(getTotal());
  });

  return (
    <Form handleSubmit={handleSelect}>
      <SelectPopOverFrom
        status={""}
        ArraySelect={AppointmentDeductionsStatusArray()}
        name={"status"}
        handleSelect={(status: string) => {
          setSelectedStatus(status);
        }}
      />

      <p>Total is : {total.toFixed(2)}</p>
    </Form>
  );
};

export default ChangeAllStatusSelector;
