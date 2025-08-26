import TranslatableEnum from "@/components/common/ui/labels-and-values/TranslatableEnum";
import ShadcnDialog from "@/components/common/ui/ShadcnDialog";
import LoadingSpin from "@/components/icons/LoadingSpin";
import LogsIcon from "@/components/icons/Logs";
import { Button } from "@/components/ui/shadcn/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/shadcn/table";
import { RoleEnum } from "@/enums/RoleEnum";
import { AppointmentLogs } from "@/models/AppointmentLog";
import { AppointmentLogsService } from "@/services/AppointmentLogsService";
import { useTranslations } from "next-intl";
import { useState } from "react";

const AppointmentLogModal = ({
  appointmentId,
  role,
}: {
  appointmentId?: number;
  role: RoleEnum;
}) => {
  const t = useTranslations("common.appointment.table");
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<AppointmentLogs[]>([]);
  return (
    <ShadcnDialog
      trigger={
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={async () => {
            if (appointmentId) {
              setLoading(true);
              const response =
                await AppointmentLogsService.make(role).getAppointmentLogs(
                  appointmentId,
                );

              console.log(response);

              setLogs(response?.data);
              setLoading(false);
            }
          }}
        >
          <LogsIcon />
        </Button>
      }
      title={t("logs")}
      sm={false}
    >
      {!loading && logs.length <= 0 && (
        <div className="my-4 flex w-full items-center justify-center">
          <TranslatableEnum value="no_data" />
        </div>
      )}
      {!loading ? (
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
            {logs?.map((e: AppointmentLogs, index) => (
              <TableRow key={index}>
                <TableCell>{e.id}</TableCell>
                <TableCell>{e.status}</TableCell>
                <TableCell>{e.happen_in}</TableCell>
                <TableCell>{e.actor?.full_name}</TableCell>
                <TableCell>{e?.event}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="my-4 flex w-full items-center justify-center">
          <LoadingSpin className="h-8 w-8 text-primary" />
        </div>
      )}
    </ShadcnDialog>
  );
};

export default AppointmentLogModal;
