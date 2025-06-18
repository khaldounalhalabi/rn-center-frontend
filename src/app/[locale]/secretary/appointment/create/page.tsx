import AppointmentForm from "@/components/admin/appointment/AppointmentForm";
import PageCard from "@/components/common/ui/PageCard";
import { getTranslations } from "next-intl/server";

const page = async () => {
  const t = await getTranslations("common.appointment.create");
  return (
    <PageCard title={t("createAppointment")}>
      <AppointmentForm type="store" redirect={"/secretary/appointment"} />
    </PageCard>
  );
};

export default page;
