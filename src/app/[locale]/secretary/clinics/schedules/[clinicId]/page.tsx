import ScheduleForm from "@/components/admin/schedule/ScheduleForm";
import { RoleEnum } from "@/enums/RoleEnum";
import { ScheduleService } from "@/services/ScheduleService";

const Page = async ({
  params: { clinicId },
}: {
  params: { clinicId: number };
}) => {
  const data = await ScheduleService.make(
    RoleEnum.SECRETARY,
  ).getClinicSchedules(clinicId);

  return (
    <ScheduleForm
      defaultValues={data.data}
      method={"update"}
      clinic_id={clinicId}
    />
  );
};

export default Page;
