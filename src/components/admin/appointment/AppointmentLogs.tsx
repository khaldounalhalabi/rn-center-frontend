import React from "react";
import { Appointment } from "@/Models/Appointment";
import { AppointmentLogsService } from "@/services/AppointmentLogsService";
import { useQuery } from "@tanstack/react-query";
import Eye from "@/components/icons/Eye";
import { Link } from "@/navigation";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import { AppointmentLogs as AppointmentLogsModel } from "@/Models/AppointmentLog";
import { useLocale } from "next-intl";

const AppointmentLogs = ({
  appointment,
}: {
  appointment?: Appointment | undefined | null;
}) => {
  const { data } = useQuery({
    queryKey: ["appointment"],
    queryFn: async () => {
      return await AppointmentLogsService.make<AppointmentLogsService>().getAppointmentLogs(
        appointment?.id ?? 0,
      );
    },
  });
  const res: AppointmentLogsModel[] | undefined = data?.data;
  const locale = useLocale();
  return (
    <div className={"card p-5 bg-base-200 my-3 w-full"}>
      <div className="overflow-x-auto bg-white rounded-xl">
        <table className="table">
          <thead>
            <tr>
              <th>id</th>
              <th>status</th>
              <th>Happen In</th>
              <th>Actor</th>
              <th>Event</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {res?.map((e: AppointmentLogsModel, index) => (
              <tr key={index}>
                <th>{e.id}</th>
                <td>{e.status}</td>
                <td>{e.happen_in}</td>
                <td>
                  {locale == "en"
                    ? `${TranslateClient(e.actor?.first_name, true).en}${" "}
                  ${TranslateClient(e.actor?.middle_name, true).en}${" "}
                  ${TranslateClient(e.actor?.last_name, true).en}`
                    : `${TranslateClient(e.actor?.first_name, true).ar}${" "}
                  ${TranslateClient(e.actor?.middle_name, true).ar}${" "}
                  ${TranslateClient(e.actor?.last_name, true).ar}`}
                </td>
                <td>{e.event}</td>
                <td>
                  <Link
                    href={`${appointment?.id}/logs/${e.id}`}
                    className="btn btn-sm btn-square"
                  >
                    <Eye className="w-6 h-6 text-primary" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentLogs;
