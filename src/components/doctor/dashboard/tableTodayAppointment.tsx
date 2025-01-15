"use client";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import React from "react";
import { Appointment } from "@/Models/Appointment";
import { Link } from "@/navigation";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import AppointmentStatusColumn from "@/components/doctor/appointment/AppointmentStatusColumn";
import ActionsButtons, {
  Buttons,
} from "@/components/common/Datatable/ActionsButtons";
import AppointmentSpeechButton from "@/components/doctor/appointment/AppointmentSpeechButton";
import { AppointmentService } from "@/services/AppointmentService";
import { toast } from "react-toastify";
import { getCookieClient } from "@/Actions/clientCookies";
import { useLocale, useTranslations } from "next-intl";
import { Role } from "@/enum/Role";
import { PermissionsDoctor } from "@/enum/Permissions";
import TranslatableEnum from "@/components/common/ui/TranslatableEnum";

const handleCopyLink = (id: number | undefined) => {
  navigator.clipboard.writeText(`${window.location.href}/${id}`);
  toast.success("Link Has Been Copied Successfully");
};

const TableTodayAppointment = () => {
  const locale = useLocale();
  const t = useTranslations("common.dashboard");
  const permissions: string | undefined = getCookieClient("permissions");
  const permissionsArray: string[] = permissions?.split(",") ?? [""];
  const role = getCookieClient("role");
  const tableData: DataTableData<Appointment> = {
    createUrl: `${role === Role.CLINIC_EMPLOYEE && permissionsArray.includes(PermissionsDoctor.MANAGE_APPOINTMENTS) ? "/doctor/appointment/create" : role === Role.CLINIC_EMPLOYEE && !permissionsArray.includes(PermissionsDoctor.MANAGE_APPOINTMENTS) ? "" : "/doctor/appointment/create"}`,
    title: `${t("todayAppointments")}`,
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
        label: `${t("patientName")}`,
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
        label: `${t("serviceName")}`,
        sortable: true,
        translatable: true,
      },
      {
        name: "status",
        label: `${t("status")}`,
        render: (_status, appointment, setHidden, revalidate) => {
          return (
            <div className={"flex items-center justify-center"}>
              {role === Role.CLINIC_EMPLOYEE &&
              permissionsArray.includes(
                PermissionsDoctor.MANAGE_APPOINTMENTS,
              ) ? (
                <AppointmentStatusColumn
                  userType={"doctor"}
                  appointment={appointment}
                  revalidate={revalidate}
                />
              ) : role === Role.CLINIC_EMPLOYEE &&
                !permissionsArray.includes(
                  PermissionsDoctor.MANAGE_APPOINTMENTS,
                ) ? (
                <span>{appointment?.status}</span>
              ) : (
                <AppointmentStatusColumn
                  userType={"doctor"}
                  appointment={appointment}
                  revalidate={revalidate}
                />
              )}
            </div>
          );
        },
        sortable: true,
      },
      {
        name: "type",
        label: `${t("type")}`,
        render: (data) => (
          <span
            className={`badge ${data == "online" ? "badge-success" : "badge-neutral"}`}
          >
            <TranslatableEnum value={data} />
          </span>
        ),
        sortable: true,
      },
      {
        name: "appointment_sequence",
        label: `${t("sequence")}`,
      },
      {
        label: `${t("actions")}`,
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
              : role === Role.CLINIC_EMPLOYEE &&
                  permissionsArray.includes(
                    PermissionsDoctor.MANAGE_APPOINTMENTS,
                  )
                ? ["edit", "show"]
                : role === Role.CLINIC_EMPLOYEE &&
                    !permissionsArray.includes(
                      PermissionsDoctor.MANAGE_APPOINTMENTS,
                    )
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
                {/*<AppointmentSpeechButton message={message} language={lang} />*/}
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
  return <DataTable {...tableData} />;
};

export default TableTodayAppointment;
