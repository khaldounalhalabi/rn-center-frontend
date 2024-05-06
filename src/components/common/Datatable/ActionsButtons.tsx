import { Link } from "@/navigation";
import Eye from "@/components/icons/Eye";
import Pencil from "@/components/icons/Pencil";
import ArchiveIcon from "@/components/icons/ArchiveIcon";
import React, {Fragment, useState} from "react";
import { swal } from "@/Helpers/UIHelpers";
import { BaseService } from "@/services/BaseService";
import Trash from "@/components/icons/Trash";
import {Dialog, Popover, PopoverButton, PopoverPanel, Transition} from '@headlessui/react'
import LogsIcon from "@/components/icons/Logs";
import {AppointmentService} from "@/services/AppointmentService";
import {AppointmentLogsService} from "@/services/AppointmentLogsService";
import {AppointmentLogs} from "@/Models/Appointment";
import LoadingSpin from "@/components/icons/LoadingSpin";

type Buttons = "delete" | "edit" | "archive" | "show"| "logs";

export interface ActionsButtonsProps<T> {
  data?: T;
  id?: number | string;
  buttons: Buttons[];
  children?: React.JSX.Element | undefined;
  baseUrl: string;
  deleteUrl?: string;
  editUrl?: string;
  archiveUrl?: string;
  showUrl?: string;
  setHidden?: (value: ((prevState: number[]) => number[]) | number[]) => void;
}

const ActionsButtons: React.FC<ActionsButtonsProps<any>> = ({
  data,
  id,
  buttons,
  baseUrl,
  deleteUrl,
  showUrl,
  editUrl,
  archiveUrl,
  setHidden,
  children,
}) => {
  const dataId = id ?? data?.id ?? undefined;
  const dUrl = deleteUrl ?? `${baseUrl}/${dataId ?? ""}`; // delete url
  const sUrl = showUrl ?? `${baseUrl}/${dataId ?? ""}`; // show url
  const eUrl = editUrl ?? `${baseUrl}/${dataId ?? ""}/edit` + ""; // edit url
  const aUrl = archiveUrl ?? `${baseUrl}/${dataId ?? ""}`; // archive url
  const [openLogs, setOpenLogs] = useState(false);

  const [logs,setLogs] = useState<AppointmentLogs[]>()
  return (
    <div className={`flex justify-between items-center gap-2`}>
      {buttons.includes("show") ? (
        <Link href={sUrl} className="btn btn-sm btn-square">
          <Eye className="w-6 h-6 text-primary" />
        </Link>
      ) : (
        ""
      )}
      {buttons.includes("edit") ? (
        <Link href={eUrl} className="btn btn-sm btn-square">
          <Pencil className="w-6 h-6 text-success" />
        </Link>
      ) : (
        ""
      )}
      {buttons.includes("logs") ? (
          <div  className="btn btn-sm btn-square">
                <LogsIcon className="w-6 h-6 text-warning" onClick={async ()=>{
                  setOpenLogs(!openLogs)
                  return await AppointmentLogsService.make<AppointmentLogsService>().getAppointmentLogs(dataId).then((res)=>{
                    return setLogs(res?.data)
                  })
                }}/>
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
                  <div className="flex justify-center items-center  p-4 min-h-full text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100 "
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel className="bg-white shadow-xl p-6 rounded-2xl w-full max-w-md text-left transform transition-all overflow-hidden align-middle">
                        <Dialog.Title
                            as="h3"
                            className="font-medium text-gray-900 text-lg leading-6"
                        >
                          Logs
                        </Dialog.Title>
                        {logs?
                            <div className="overflow-x-auto bg-white rounded-xl mt-4">
                              <table className="table">
                                <thead>
                                <tr>
                                  <th>id</th>
                                  <th>status</th>
                                  <th>Happen In</th>
                                </tr>
                                </thead>
                                <tbody>
                                {logs?.map((e: AppointmentLogs, index) => (
                                    <tr key={index}>
                                      <th>{e.id}</th>
                                      <td>{e.status}</td>
                                      <td>{e.happen_in}</td>
                                    </tr>
                                ))}
                                </tbody>
                              </table>
                            </div>
                        :
                        <div className='my-4 w-full flex justify-center items-center'><LoadingSpin className='h-8 w-8 text-primary'/></div>}
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </div>
      ) : (
          ""
      )}
      {buttons.includes("archive") ? (
        <button className="btn btn-sm btn-square">
          <ArchiveIcon
            className="w-6 h-6 text-warning"
            onClick={() => {
              swal
                .fire({
                  title: "Do you want to archive this item ?",
                  showDenyButton: true,
                  showCancelButton: true,
                  confirmButtonText: "Yes",
                  denyButtonText: `No`,
                  confirmButtonColor: "#007BFF",
                })
                .then((result) => {
                  if (result.isConfirmed) {
                    if (dataId) {
                      BaseService.make()
                        .setBaseUrl(aUrl)
                        .delete()
                        .then(() => {
                          swal.fire({
                            title: "Archived!",
                            confirmButtonColor: "#007BFF",
                            icon: "success",
                          });
                          if (setHidden) {
                            setHidden((prevState) => [dataId, ...prevState]);
                          }
                        })
                        .catch(() =>
                          swal.fire("There Is Been An Error", "", "error"),
                        );
                    }
                  } else if (result.isDenied) {
                    swal.fire("Didn't Archive", "", "info");
                  }
                });
            }}
          />
        </button>
      ) : (
        ""
      )}
      {buttons.includes("delete") ? (
        <button className="btn btn-sm btn-square">
          <Trash
            className="w-6 h-6 text-error"
            onClick={() => {
              swal
                .fire({
                  title: "Do you want to Delete this item ?",
                  showDenyButton: true,
                  showCancelButton: true,
                  confirmButtonText: "Yes",
                  denyButtonText: `No`,
                  confirmButtonColor: "#007BFF",
                })
                .then((result) => {
                  if (result.isConfirmed) {
                    if (dataId) {
                      BaseService.make()
                        .setBaseUrl(dUrl)
                        .delete()
                        .then(() => {
                          swal.fire({
                            title: "Deleted!",
                            confirmButtonColor: "#007BFF",
                            icon: "success",
                          });
                          if (setHidden) {
                            setHidden((prevState) => [dataId, ...prevState]);
                          }
                        })
                        .catch(() =>
                          swal.fire("There Is Been An Error", "", "error"),
                        );
                    }
                  } else if (result.isDenied) {
                    swal.fire("Didn't Delete", "", "info");
                  }
                });
            }}
          />
        </button>
      ) : (
        ""
      )}
      {children}
    </div>
  );
};

export default ActionsButtons;
