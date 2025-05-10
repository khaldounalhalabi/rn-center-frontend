import React, { Fragment, useState } from "react";
import { AppointmentLogs } from "@/Models/AppointmentLog";
import LogsIcon from "@/components/icons/Logs";
import { AppointmentLogsService } from "@/services/AppointmentLogsService";
import { Dialog, Transition } from "@headlessui/react";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { TranslateClient } from "@/helpers/TranslationsClient";
import { useTranslations } from "next-intl";

const AppointmentLogModal = ({ appointmentId }: { appointmentId?: number }) => {
  const t = useTranslations("common.appointment.table");

  const [openLogs, setOpenLogs] = useState(false);

  const [logs, setLogs] = useState<AppointmentLogs[]>();
  return (
    <div className="btn btn-sm btn-square">
      <LogsIcon
        className="w-6 h-6 text-warning"
        onClick={async () => {
          setOpenLogs(!openLogs);
          if (appointmentId) {
            return await AppointmentLogsService.make<AppointmentLogsService>()
              .getAppointmentLogs(appointmentId)
              .then((res) => {
                return setLogs(res?.data);
              });
          }
        }}
      />
      <Transition appear show={openLogs} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setOpenLogs(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex justify-center items-center   p-4 min-h-full text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100 "
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="bg-white shadow-xl p-6 rounded-2xl w-full max-w-[50vw] text-left transform transition-all overflow-hidden align-middle">
                  <Dialog.Title
                    as="h3"
                    className="font-medium text-gray-900 text-lg leading-6"
                  >
                    {t("logs")}
                  </Dialog.Title>
                  {logs ? (
                    <div className="overflow-x-auto bg-white rounded-xl mt-4">
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
                          {logs?.map((e: AppointmentLogs, index) => (
                            <tr key={index}>
                              <th>{e.id}</th>
                              <td>{e.status}</td>
                              <td>{e.happen_in}</td>
                              <td>
                                {TranslateClient(e.actor?.first_name)}{" "}
                                {TranslateClient(e.actor?.last_name)}
                              </td>
                              <td>{e?.event}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="my-4 w-full flex justify-center items-center">
                      <LoadingSpin className="h-8 w-8 text-primary" />
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default AppointmentLogModal;
