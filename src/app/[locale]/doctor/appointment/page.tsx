"use client";
import React, { Fragment, useState } from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import ActionsButtons, {
  Buttons,
} from "@/components/common/Datatable/ActionsButtons";
import { Appointment } from "@/Models/Appointment";
import { AppointmentService } from "@/services/AppointmentService";
import SelectFilter from "@/components/common/ui/Selects/SelectFilter";
import DatepickerFilter from "@/components/common/ui/Date/DatePickerFilter";
import AppointmentStatuses from "@/enum/AppointmentStatus";
import AppointmentStatusColumn from "@/components/doctor/appointment/AppointmentStatusColumn";
import { toast } from "react-toastify";
import AppointmentSpeechButton from "@/components/doctor/appointment/AppointmentSpeechButton";
import { getCookieClient } from "@/Actions/clientCookies";
import ExportButton from "@/components/common/Appointment/ExportButton";
import { Link } from "@/navigation";
import CalenderIcon from "@/components/icons/CalenderIcon";
import { Dialog, Transition } from "@headlessui/react";
import AllMonth from "@/enum/Month";
import ExcelIcon from "@/components/icons/ExcelIcon";
import NotificationHandler from "@/components/common/NotificationHandler";
import { RealTimeEvents } from "@/Models/NotificationPayload";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import { useQuery } from "@tanstack/react-query";
import { ServiceService } from "@/services/ServiceService";
import dayjs from "dayjs";

interface filterExportType {
  year: string;
  month: string;
}

const Page = () => {
  const [serviceSelected, setServiceSelected] = useState<string>("all");
  const { data: service } = useQuery({
    queryKey: ["service"],
    queryFn: async () => {
      return await ServiceService.make<ServiceService>("doctor").getAllName();
    },
  });
  const nameServiceArray = service?.data
    ? service?.data?.map((item) => TranslateClient(item.name))
    : [""];

  const handleCopyLink = (id: number | undefined) => {
    navigator.clipboard.writeText(`${window.location.href}/${id}`);
    toast.success("Link Has Been Copied Successfully");
  };
  const locale = getCookieClient("NEXT_LOCALE");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const statusData = AppointmentStatuses();
  const typeData = ["online", "manual", "all"];

  const [filterExport, setFilterExport] = useState<filterExportType>({
    year: dayjs().format("YYYY"),
    month: dayjs().format("MMMM"),
  });
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const tableData: DataTableData<Appointment> = {
    createUrl: `/doctor/appointment/create`,
    title: "Appointment",
    extraButton: (
      <>
        <Link href={`/doctor/appointment/calender`} className={"mx-1"}>
          <button className="btn btn-info btn-sm p-1 btn-square">
            <CalenderIcon className={"w-6 h-6"} />
          </button>
        </Link>
        <button className="btn btn-info btn-sm btn-square" onClick={openModal}>
          <ExcelIcon className={`w-6 h-6 cursor-pointer `} />
        </button>
      </>
    ),
    schema: [
      {
        name: "id",
        sortable: true,
        label: "id",
        render: (_id, appointment) => {
          return (
            <button
              type={"button"}
              className="btn btn-sm"
              onClick={() => handleCopyLink(appointment?.id)}
            >
              {appointment?.id}
            </button>
          );
        },
      },
      {
        name: "customer.first_name",
        label: "Patient",
        render: (_first_name, appointment) => {
          return (
            <div className={`flex flex-col items-start`}>
              <Link
                href={`/doctor/patients/${appointment?.customer_id}`}
                className={`btn`}
              >
                {TranslateClient(appointment?.customer?.user?.first_name)}{" "}
                {TranslateClient(appointment?.customer?.user?.middle_name)}{" "}
                {TranslateClient(appointment?.customer?.user?.last_name)}
              </Link>
            </div>
          );
        },
      },
      {
        name: "service.name",
        label: "Service Name",
        sortable: true,
        translatable: true,
      },
      {
        name: "status",
        label: "Status",
        render: (_status, appointment, setHidden, revalidate) => {
          return (
            <AppointmentStatusColumn
              userType={"doctor"}
              appointment={appointment}
              revalidate={revalidate}
            />
          );
        },
        sortable: true,
      },
      {
        name: "type",
        label: "Type",
        render: (data) =>
          data == "online" ? (
            <span className={`badge badge-success`}>Online</span>
          ) : (
            <span className={`badge badge-neutral`}>Manual</span>
          ),
        sortable: true,
      },
      {
        name: "total_cost",
        label: "Total Cost",
        render: (data) => {
          return <span>{data.toLocaleString()}</span>;
        },
      },
      {
        name: "appointment_sequence",
        label: "Sequence",
      },
      {
        name: "date",
        label: "Date",
        sortable: true,
      },

      {
        label: "Actions",
        render: (_undefined, data, setHidden, revalidate) => {
          const sequence = data?.appointment_sequence?.toString();
          const lang = locale == "en" ? "en-US" : "ar-SA";
          const message =
            locale == "en"
              ? `The   appointment    number ----------------   ${sequence}----------------the   doctor   is   waiting   for   you`
              : ` الموعد رقم${sequence} الطبيبُ في انتظارك`;
          const button: Buttons[] =
            data?.type == "online" && data.status == "checkout"
              ? ["show"]
              : ["edit", "show"];
          return (
            <ActionsButtons
              id={data?.id}
              buttons={button}
              baseUrl={`/doctor/appointment`}
              editUrl={`/doctor/appointment/${data?.id}/edit`}
              showUrl={`/doctor/appointment/${data?.id}`}
              setHidden={setHidden}
            >
              <>
                <NotificationHandler
                  handle={(payload) => {
                    if (
                      payload.getNotificationType() ==
                      RealTimeEvents.AppointmentStatusChange
                    ) {
                      if (revalidate) {
                        revalidate();
                      }
                    }
                  }}
                />
                <AppointmentSpeechButton message={message} language={lang} />
              </>
            </ActionsButtons>
          );
        },
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await AppointmentService.make<AppointmentService>("doctor")
        .setHeaders({ filtered: true })
        .indexWithPagination(page, search, sortCol, sortDir, perPage, {
          date: dayjs().format("YYYY-MM-DD"),
          ...params,
        }),
    filter: (params, setParams) => {
      return (
        <div className={"w-full grid grid-cols-1"}>
          <label className="label">
            Service :
            <SelectFilter
              data={nameServiceArray}
              selected={serviceSelected}
              onChange={(event: any) => {
                service?.data.forEach((e) => {
                  if (event.target.value == TranslateClient(e.name)) {
                    setServiceSelected(event.target.value);
                    setParams({ ...params, service_id: e.id });
                  }
                });
              }}
            />
          </label>
          <label className={"label"}>
            Status :
            <SelectFilter
              data={["all", ...statusData]}
              selected={params.status ?? "all"}
              onChange={(event: any) => {
                setParams({ ...params, status: event.target.value });
              }}
            />
          </label>
          <label className="label">
            Type :
            <SelectFilter
              data={typeData}
              selected={params.type ?? "online"}
              onChange={(event: any) => {
                setParams({ ...params, type: event.target.value });
              }}
            />
          </label>
          <label className="label">Start Date :</label>
          <DatepickerFilter
            onChange={(time: any) => {
              setStartDate(time?.format("YYYY-MM-DD"));
              setParams({
                ...params,
                date: [time?.format("YYYY-MM-DD"), endDate],
              });
            }}
            defaultValue={startDate ?? ""}
          />
          <label className="label">End Date :</label>
          <DatepickerFilter
            onChange={(time: any) => {
              setEndDate(time?.format("YYYY-MM-DD"));
              setParams({
                ...params,
                date: [startDate, time?.format("YYYY-MM-DD")],
              });
            }}
            defaultValue={endDate ?? ""}
          />
        </div>
      );
    },
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className={"w-full my-4 grid grid-cols-1"}>
                    <label className={"label"}>Year :</label>
                    <input
                      className="input input-bordered w-full focus:outline-pom focus:border-pom"
                      type={"number"}
                      min={1900}
                      max={2099}
                      step={1}
                      onChange={(e) =>
                        setFilterExport({
                          ...filterExport,
                          year: e.target.value,
                        })
                      }
                      defaultValue={filterExport.year}
                    />
                    <label className={"label"}>Month :</label>
                    <SelectFilter
                      data={AllMonth()}
                      selected={filterExport.month}
                      onChange={(e: any) => {
                        setFilterExport({
                          ...filterExport,
                          month: e.target.value,
                        });
                      }}
                    />
                  </div>

                  <ExportButton data={filterExport} close={closeModal} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <DataTable {...tableData} />
    </>
  );
};

export default Page;
