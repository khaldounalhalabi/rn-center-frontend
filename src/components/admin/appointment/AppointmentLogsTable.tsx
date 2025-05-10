import React from "react";
import { Appointment } from "@/models/Appointment";
import { AppointmentLogsService } from "@/services/AppointmentLogsService";
import { AppointmentLogs as AppointmentLogsModel } from "@/models/AppointmentLog";
import { getTranslations } from "next-intl/server";

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
    <div className={"card my-3 w-full bg-base-200 p-5"}>
      <div className="overflow-x-auto rounded-xl bg-white">
        <table className="table">
          <thead>
            <tr>
              <th>id</th>
              <th>{t("status")}</th>
              <th>{t("happenIn")}</th>
              <th>{t("actor")}</th>
              <th>{t("event")}</th>
            </tr>
          </thead>
          <tbody>
            {res?.map((e: AppointmentLogsModel, index) => (
              <tr key={index}>
                <th>{e.id}</th>
                <td>{e.status}</td>
                <td>{e.happen_in}</td>
                <td>{e.actor?.full_name}</td>
                <td>{e.event}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentLogsTable;
