import AppointmentForm from "@/components/admin/appointment/AppointmentForm";
import PageCard from "@/components/common/ui/PageCard";
import { RoleEnum } from "@/enums/RoleEnum";
import { AppointmentService } from "@/services/AppointmentService";
import { getTranslations } from "next-intl/server";

const page = async ({
  params: { appointmentId },
}: {
  params: { appointmentId: number };
}) => {
  const t = await getTranslations("common.appointment.create");

  const appointment = (
    await AppointmentService.make(RoleEnum.SECRETARY).show(appointmentId)
  ).data;

  return (
    <PageCard
      title={t("editAppointment")}
      description={`${t("patientName")} : ${appointment?.customer?.user?.full_name}`}
    >
      <AppointmentForm
        type={"update"}
        defaultValues={appointment}
        redirect={"/secretary/appointment"}
      />
    </PageCard>
  );
};

export default page;
