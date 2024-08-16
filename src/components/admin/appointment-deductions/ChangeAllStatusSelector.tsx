"use Client";
import AppointmentDeductionsStatusArray from "@/enum/AppointmentDeductionsStatus";
import SelectPopOverFrom from "@/components/common/ui/Selects/SelectPopOverForm";
import Form from "@/components/common/ui/Form";
import { AppointmentDeductionsService } from "@/services/AppointmentDeductionsService";
import { useQueryClient } from "@tanstack/react-query";

const ChangeAllStatusSelector = ({
  ids,
  closeModalStatus,
}: {
  ids: number[];
  closeModalStatus: any;
}) => {
  const queryClient = useQueryClient();
  const revalidate = () => {
    return queryClient.invalidateQueries({
      queryKey: ["tableData_undefined_Appointment Deductions"],
    });
  };
  const handleSelect = async (data: any) => {
    const dataSend = {
      status: data.status,
      ids: ids,
    };
    return await AppointmentDeductionsService.make<AppointmentDeductionsService>(
      "admin",
    )
      .bulkToggleStatus(dataSend)
      .then((res) => {
        revalidate();
        closeModalStatus();
        return res;
      });
  };

  return (
    <Form handleSubmit={handleSelect}>
      <SelectPopOverFrom
        status={""}
        ArraySelect={AppointmentDeductionsStatusArray()}
        name={"status"}
        handleSelect={() => undefined}
      />
    </Form>
  );
};

export default ChangeAllStatusSelector;
