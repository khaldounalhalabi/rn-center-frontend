import React from "react";
import { Appointment } from "@/models/Appointment";
import { AppointmentLogsService } from "@/services/AppointmentLogsService";
import { AppointmentLogs as AppointmentLogsModel } from "@/models/AppointmentLog";
import { getTranslations } from "next-intl/server";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/shadcn/table";

const AppointmentLogsTable = async ({
  appointment,
}: {
  appointment?: Appointment | undefined | null;
}) => {
  const data =
    await AppointmentLogsService.make<AppointmentLogsService>().getAppointmentLogs(
      appointment?.id ?? 0,
    );

  const res: AppointmentLogsModel[] | undefined = data?.data;
  const t = await getTranslations("common.appointment.show");

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>id</TableHead>
          <TableHead>{t("status")}</TableHead>
          <TableHead>{t("happenIn")}</TableHead>
          <TableHead>{t("actor")}</TableHead>
          <TableHead>{t("event")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {res?.map((e: AppointmentLogsModel, index) => (
          <TableRow key={index}>
            <TableCell>{e.id}</TableCell>
            <TableCell>{e.status}</TableCell>
            <TableCell>{e.happen_in}</TableCell>
            <TableCell>{e.actor?.full_name}</TableCell>
            <TableCell>{e.event}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AppointmentLogsTable;
