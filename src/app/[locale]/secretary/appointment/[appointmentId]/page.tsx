import { getUser } from "@/actions/HelperActions";
import AppointmentLogsTable from "@/components/admin/appointment/AppointmentLogsTable";
import PrescriptionDetails from "@/components/common/prescriptions/PrescriptionDetails";
import Grid from "@/components/common/ui/Grid";
import PageCard from "@/components/common/ui/PageCard";
import Tabs from "@/components/common/ui/Tabs";
import { LabelValue } from "@/components/common/ui/labels-and-values/LabelValue";
import TranslatableEnum from "@/components/common/ui/labels-and-values/TranslatableEnum";
import { Button } from "@/components/ui/shadcn/button";
import PermissionEnum from "@/enums/PermissionEnum";
import { RoleEnum } from "@/enums/RoleEnum";
import { Appointment } from "@/models/Appointment";
import { Link } from "@/navigation";
import { AppointmentService } from "@/services/AppointmentService";
import { getTranslations } from "next-intl/server";

const page = async ({
  params: { appointmentId },
}: {
  params: { appointmentId: number };
}) => {
  const t = await getTranslations("common.appointment.show");
  const user = await getUser();
  const data = await AppointmentService.make(RoleEnum.SECRETARY).show(
    appointmentId,
  );
  const appointment: Appointment = data?.data;
  const tabs = [
    {
      title: t("logs"),
      render: <AppointmentLogsTable appointment={appointment} />,
    },
  ];

  if (user?.permissions?.includes(PermissionEnum.MEDICINE_MANAGEMENT)) {
    tabs.push({
      title: t("prescriptions"),
      render: <PrescriptionDetails prescription={appointment?.prescription} />,
    });
  }

  return (
    <PageCard
      title={t("appointmentDetails")}
      actions={
        <Link href={`/secretary/appointment/${appointment.id}/edit`}>
          <Button type={"button"}>{t("editBtn")}</Button>
        </Link>
      }
    >
      <Grid>
        <LabelValue
          label={t("doctorName")}
          value={appointment.clinic?.user?.full_name}
        />

        <LabelValue
          label={t("customerName")}
          value={appointment.customer?.user?.full_name}
          color={"success"}
        />

        <LabelValue
          label={t("serviceName")}
          value={appointment?.service?.name}
          color={"accent"}
        />

        <LabelValue
          label={t("date")}
          value={appointment?.date_time}
          color={"error"}
        />
        <LabelValue
          label={t("status")}
          value={<TranslatableEnum value={appointment?.status} />}
          color={"info"}
        />
        <LabelValue
          label={t("totalCost")}
          value={appointment?.total_cost}
          color={"warning"}
        />
        <LabelValue
          label={t("service_cost")}
          value={appointment?.service?.price}
          color={"brand-primary"}
        />
        <LabelValue
          label={t("extraFees")}
          value={appointment?.extra_fees}
          color={"title"}
        />
        <LabelValue label={t("discount")} value={appointment?.discount} />
        <LabelValue
          label={t("type")}
          value={<TranslatableEnum value={appointment?.type} />}
          color={"secondary"}
        />

        <LabelValue
          label={t("appointmentSequence")}
          value={appointment?.appointment_sequence}
        />

        <LabelValue
          label={t("remaining_time")}
          value={appointment?.remaining_time}
          color={"title"}
        />
      </Grid>
      <LabelValue label={t("note")} value={appointment?.note} col />

      <Tabs tabs={tabs} />
    </PageCard>
  );
};

export default page;
