"use client";
import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import { Link } from "@/navigation";
import { AppointmentService } from "@/services/AppointmentService";
import { Appointment } from "@/Models/Appointment";
import AppointmentOverview from "@/components/doctor/appointment/AppointmentOverview";
import Grid from "@/components/common/ui/Grid";
import { AppointmentStatusEnum } from "@/enum/AppointmentStatus";
import { useQuery } from "@tanstack/react-query";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import { RealTimeEvents } from "@/Models/NotificationPayload";
import { useTranslations } from "next-intl";
import { NotificationHandler } from "@/components/common/NotificationHandler";
import { LabelValue } from "@/components/common/ui/LabelsValues/LabelValue";

const Show = ({
  params: { appointmentId },
}: {
  params: { appointmentId: number };
}) => {
  const t = useTranslations("common.appointment.show");
  const { data, refetch } = useQuery({
    queryKey: ["AppointmentService"],
    queryFn: async () => {
      return await AppointmentService.make<AppointmentService>("doctor").show(
        appointmentId,
      );
    },
  });

  const res: Appointment | undefined = data?.data;
  return (
    <PageCard>
      <NotificationHandler
        handle={(payload) => {
          if (
            payload.getNotificationType() ==
            RealTimeEvents.AppointmentStatusChange
          ) {
            refetch();
          }
        }}
      />
      <div className="flex justify-between items-center w-full h-24">
        <h2 className="card-title">{t("appointmentDetails")}</h2>
        {res?.type == "online" &&
        res?.status == AppointmentStatusEnum.CHECKOUT ? (
          ""
        ) : (
          <Link href={`/doctor/appointment/${res?.id}/edit`}>
            <PrimaryButton type={"button"}>{t("editBtn")}</PrimaryButton>
          </Link>
        )}
      </div>
      <div className={"card p-5 bg-base-200 my-3"}>
        <Grid md={"2"}>
          <LabelValue
            label={t("clinicName")}
            value={TranslateClient(res?.clinic?.name)}
            color={"success"}
          />

          <LabelValue
            label={t("doctorName")}
            value={TranslateClient(res?.clinic?.user?.full_name)}
            color="info"
          />

          <LabelValue
            label={t("customerName")}
            value={TranslateClient(res?.customer?.user?.full_name)}
            color={"primary"}
          />

          <LabelValue
            label={t("serviceName")}
            value={TranslateClient(res?.service?.name)}
            color={"warning"}
          />
        </Grid>
        <div className="px-2 sm:px-0 py-16 w-full">
          <AppointmentOverview appointment={res} />
        </div>
      </div>
    </PageCard>
  );
};

export default Show;
