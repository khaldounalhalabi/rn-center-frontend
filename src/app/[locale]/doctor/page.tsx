"use client";

import Grid from "@/components/common/ui/Grid";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import { Appointment } from "@/Models/Appointment";
import { Link } from "@/navigation";
import CalenderIcon from "@/components/icons/CalenderIcon";
import ExcelIcon from "@/components/icons/ExcelIcon";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import AppointmentStatusColumn from "@/components/doctor/appointment/AppointmentStatusColumn";
import ActionsButtons, {
  Buttons,
} from "@/components/common/Datatable/ActionsButtons";
import NotificationHandler from "@/components/common/NotificationHandler";
import { RealTimeEvents } from "@/Models/NotificationPayload";
import AppointmentSpeechButton from "@/components/doctor/appointment/AppointmentSpeechButton";
import { AppointmentService } from "@/services/AppointmentService";
import React from "react";
import { toast } from "react-toastify";
import { getCookieClient } from "@/Actions/clientCookies";
import { useQuery } from "@tanstack/react-query";
import { ClinicTransactionService } from "@/services/ClinicTransactionService";
import BalanceIcon from "@/components/icons/BalanceIcon";
import LoadingSpin from "@/components/icons/LoadingSpin";
import PendingAmountIcon from "@/components/icons/PendingAmountIcon";
import Card from "@/components/common/ui/Card";
import { StatisticService } from "@/services/StatisticService";

const handleCopyLink = (id: number | undefined) => {
  navigator.clipboard.writeText(`${window.location.href}/${id}`);
  toast.success("Link Has Been Copied Successfully");
};

const Home = () => {
  const {
    data: balance,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["balance"],
    queryFn: async () => {
      return await ClinicTransactionService.make<ClinicTransactionService>(
        "doctor",
      ).getSummary();
    },
    refetchOnWindowFocus: false,
  });

  const {
    data: statistics,
    isLoading: isLoadingStatistics,
    isFetching: isFetchingStatistics,
    refetch: refetchStatistics,
  } = useQuery({
    queryKey: ["balance"],
    queryFn: async () =>
      await StatisticService.make<StatisticService>(
        "doctor",
      ).doctorIndexPageStatistics(),
    refetchOnWindowFocus: false,
  });

  const locale = getCookieClient("NEXT_LOCALE");
  const tableData: DataTableData<Appointment> = {
    createUrl: `/doctor/appointment/create`,
    title: "Today Appointments",
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
        name: "appointment_sequence",
        label: "Sequence",
      },
      {
        label: "Actions",
        render: (_undefined, data, setHidden, revalidate) => {
          const sequence = data?.appointment_sequence
            ?.toString()
            .split("")
            .join(" ");
          const lang = locale == "en" ? "en-US" : "ar-SA";
          const message =
            locale == "en"
              ? `The appointment number ${sequence} the doctor is waiting for you`
              : ` الموعد رقم ${sequence}  الطبيبُ في انتظارك `;
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
                        refetchStatistics();
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
      await AppointmentService.make<AppointmentService>(
        "doctor",
      ).getClinicTodayAppointments(
        page,
        search,
        sortCol,
        sortDir,
        perPage,
        params,
      ),
  };

  return (
      <div className={`flex md:px-2 justify-center w-full h-screen`}>
      <div className={`flex flex-col`}>
        <Grid sm={1} md={3} className={`items-baseline`}>
          <div className={`flex flex-col gap-1 justify-between`}>
            <NotificationHandler
              handle={(payload) =>
                payload.getNotificationType() == RealTimeEvents.BalanceChange
                  ? refetch()
                  : undefined
              }
            />
            <Card>
              <label className={"card-title"}>Clinic Balance</label>
              <div className={"flex items-center justify-between"}>
                <div className={"p-4 rounded-full bg-green-100"}>
                  <BalanceIcon
                    className={
                      "w-6 h-6 bg-green-100 rounded-full fill-green-600"
                    }
                  />
                </div>
                {isLoading || isFetching ? (
                  <LoadingSpin />
                ) : (
                  <span suppressHydrationWarning className=" mx-4 text-2xl">
                    {Number(
                      balance?.data?.clinic_balance ?? 0,
                    ).toLocaleString()}{" "}
                    IQD
                  </span>
                )}
              </div>
            </Card>
            <Card>
              <label className={"card-title"}>Pending Amount</label>
              <div className={"flex items-center justify-between"}>
                <div className={"p-4 rounded-full bg-indigo-100"}>
                  <PendingAmountIcon className={"w-6 h-6 fill-indigo-600"} />
                </div>
                {isLoading || isFetching ? (
                  <LoadingSpin />
                ) : (
                  <span suppressHydrationWarning className=" mx-4 text-2xl">
                    {Number(
                      balance?.data?.pending_amount ?? 0,
                    ).toLocaleString()}{" "}
                    IQD
                  </span>
                )}
              </div>
            </Card>
          </div>
          <div className={`md:col-start-2 md:col-end-4`}>
            <DataTable {...tableData} />
          </div>
        </Grid>
        <div className={`grid grid-cols-2 gap-1 md:grid-cols-4`}>
          <Card>
            <div className={`flex justify-between text-sm items-center`}>
              <p className={`text-wrap text-start`}>
                Total Appointments This Month
              </p>
              {isLoadingStatistics || isFetchingStatistics ? (
                <LoadingSpin />
              ) : (
                <span className={`badge badge-neutral`}>
                  {statistics?.data?.total_this_month ?? 0}
                </span>
              )}
            </div>
          </Card>
          <Card>
            <div className={`flex justify-between text-sm items-center`}>
              <p className={`text-wrap text-start`}>
                Total Online Appointments This Month
              </p>
              {isLoadingStatistics || isFetchingStatistics ? (
                <LoadingSpin />
              ) : (
                <span className={`badge badge-neutral`}>
                  {statistics?.data?.total_online_this_month ?? 0}
                </span>
              )}
            </div>
          </Card>
          <Card>
            <div className={`flex justify-between text-sm items-center`}>
              <p className={`text-wrap text-start`}>
                Total Appointments Cancelled This Month
              </p>
              {isLoadingStatistics || isFetchingStatistics ? (
                <LoadingSpin />
              ) : (
                <span className={`badge badge-neutral`}>
                  {statistics?.data?.total_cancelled_this_month ?? 0}
                </span>
              )}
            </div>
          </Card>
          <Card>
            <div className={"flex justify-between text-sm items-center"}>
              <p className={`text-wrap text-start`}>
                Upcoming Appointments This Month
              </p>
              {isLoadingStatistics || isFetchingStatistics ? (
                <LoadingSpin />
              ) : (
                <span className={`badge badge-neutral`}>
                  {statistics?.data?.total_upcoming ?? 0}
                </span>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;