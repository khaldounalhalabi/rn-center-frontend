import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import PrimaryButton from "@/components/common/ui/buttons/PrimaryButton";
import { Link } from "@/navigation";
import { AppointmentService } from "@/services/AppointmentService";
import { Appointment } from "@/models/Appointment";
import { getTranslations } from "next-intl/server";
import Grid from "@/components/common/ui/Grid";
import { LabelValue } from "@/components/common/ui/labels-and-values/LabelValue";
import TranslatableEnum from "@/components/common/ui/labels-and-values/TranslatableEnum";
import Tabs from "@/components/common/ui/Tabs";
import AppointmentLogsTable from "@/components/admin/appointment/AppointmentLogsTable";
import PrescriptionDetails from "@/components/common/prescriptions/PrescriptionDetails";

const page = async ({
  params: { appointmentId },
}: {
  params: { appointmentId: number };
}) => {
  const t = await getTranslations("common.appointment.show");
  const data =
    await AppointmentService.make<AppointmentService>().show(appointmentId);
  const appointment: Appointment = data?.data;
  return (
    <PageCard>
      <div className="flex justify-between items-center w-full h-24">
        <h2 className="card-title">{t("appointmentDetails")}</h2>
        <Link href={`/admin/appointment/${appointment.id}/edit`}>
          <PrimaryButton type={"button"}>{t("editBtn")}</PrimaryButton>
        </Link>
      </div>
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

      <Tabs
        tabs={[
          {
            title: t("prescriptions"),
            render: <PrescriptionDetails prescription={appointment?.prescription} />,
          },
          {
            title: t("logs"),
            render: <AppointmentLogsTable appointment={appointment} />,
          },
        ]}
      />
    </PageCard>
  );
};

export default page;
