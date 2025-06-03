"use server";
import { Revalidate } from "@/actions/Revalidate";
import PrescriptionDetails from "@/components/common/prescriptions/PrescriptionDetails";
import Grid from "@/components/common/ui/Grid";
import PageCard from "@/components/common/ui/PageCard";
import Tabs from "@/components/common/ui/Tabs";
import { Label } from "@/components/common/ui/labels-and-values/Label";
import { LabelValue } from "@/components/common/ui/labels-and-values/LabelValue";
import TranslatableEnum from "@/components/common/ui/labels-and-values/TranslatableEnum";
import UpdateAppointmentSheet from "@/components/doctor/appointments/UpdateAppointmentSheet";
import ShowServiceSheet from "@/components/doctor/services/ShowServiceSheet";
import { RoleEnum } from "@/enums/RoleEnum";
import { Appointment } from "@/models/Appointment";
import { AppointmentService } from "@/services/AppointmentService";
import { getTranslations } from "next-intl/server";

const page = async ({
  params: { appointmentId },
}: {
  params: { appointmentId: number };
}) => {
  const t = await getTranslations("common.appointment.show");
  const data = await AppointmentService.make(RoleEnum.DOCTOR).show(
    appointmentId,
  );
  const appointment: Appointment = data?.data;

  return (
    <PageCard
      title={t("appointmentDetails")}
      actions={
        <UpdateAppointmentSheet
          appointment={appointment}
          revalidatePage={Revalidate}
          buttonText={t("editBtn")}
        />
      }
    >
      <Grid>
        <LabelValue
          label={t("customerName")}
          value={appointment.customer?.user?.full_name}
          color={"success"}
        />

        <Label label={t("serviceName")}>
          {appointment?.service ? (
            <ShowServiceSheet
              service={appointment?.service}
              buttonText={appointment?.service?.name}
            />
          ) : (
            <TranslatableEnum value={"no_data"} />
          )}
        </Label>

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

      <div className={"my-5"}>
        <Tabs
          tabs={[
            {
              title: t("prescriptions"),
              render: (
                <PrescriptionDetails
                  prescription={appointment?.prescription}
                  appointment={appointment}
                />
              ),
            },
          ]}
        />
      </div>
    </PageCard>
  );
};

export default page;
