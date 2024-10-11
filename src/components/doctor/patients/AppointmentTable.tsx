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
import AppointmentStatuses, {
  AppointmentStatusEnum,
} from "@/enum/AppointmentStatus";
import AppointmentStatusColumn from "@/components/doctor/appointment/AppointmentStatusColumn";
import { toast } from "react-toastify";
import AppointmentSpeechButton from "@/components/doctor/appointment/AppointmentSpeechButton";
import { Customer } from "@/Models/Customer";
import { RealTimeEvents } from "@/Models/NotificationPayload";
import {useLocale, useTranslations} from "next-intl";
import { NotificationHandler } from "@/components/common/NotificationHandler";
import PercentBadge from "@/components/icons/PercentBadge";

interface filterExportType {
  year: string;
  month: string;
}

const AppointmentTable = ({ customer }: { customer: Customer }) => {
  const handleCopyLink = (id: number | undefined) => {
    navigator.clipboard.writeText(`${window.location.href}/${id}`);
    toast.success("Link Has Been Copied Successfully");
  };
  const locale = useLocale();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const statusData = AppointmentStatuses();
  const typeData = ["online", "manual", "all"];

  const t = useTranslations("common.appointment.table");

  const tableData: DataTableData<Appointment> = {
    createUrl: `/doctor/patients/${customer.id}/appointment/create`,
    title: `${t("appointment")}`,
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
              <AppointmentStatusColumn
                userType={"doctor"}
                appointment={appointment}
                revalidate={revalidate}
              />
            </div>
          );
        },
        sortable: true,
      },
      {
        name: "type",
        label: `${t("type")}`,
        render: (data) =>
          data == "online" ? (
            <span className={`badge badge-success`}>{t("online")}</span>
          ) : (
            <span className={`badge badge-neutral`}>{t("manual")}</span>
          ),
        sortable: true,
      },

      {
        name: "appointment_sequence",
        label: `${t("sequence")}`,
        render: (data) => (
          <p>
            <span>{data}</span>
          </p>
        ),
      },
      {
        name: "total_cost",
        label: `${t("totalCost")}`,
        render: (data, appointment: Appointment | undefined) => (
          <span className="flex items-center justify-between gap-1">
            {data?.toLocaleString() + " IQD"}{" "}
            {(appointment?.system_offers?.length ?? 0) > 0 && (
              <PercentBadge className="text-[#00a96e] h-6 w-6" />
            )}
          </span>
        ),
      },
      {
        name: "date",
        label: `${t("date")}`,
        sortable: true,
      },

      {
        label: `${t("actions")}`,
        render: (_undefined, data, setHidden, revalidate) => {
          const sequence = data?.appointment_sequence
            ?.toString()
            .split("")
            .join(" ");
          const lang = locale == "en" ? "en-IN" : "ar-IQ";
          const message =
            locale == "en"
              ? `The appointment number ${sequence} the doctor is waiting for you`
              : `الموعد رقم ${sequence}  الطبيبُ في انتظارك`;
          const button: Buttons[] =
            data?.type == "online" && data.status == "checkout"
              ? ["show"]
              : ["edit", "show"];
          return (
            <ActionsButtons
              id={data?.id}
              buttons={button}
              baseUrl={`/doctor/appointment`}
              editUrl={`/doctor/patients/${customer.id}/appointment/${data?.id}/edit`}
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
      await AppointmentService.make<AppointmentService>(
        "doctor"
      ).getCustomerAppointments(
        customer?.id,
        page,
        search,
        sortCol,
        sortDir,
        perPage,
        params
      ),
    filter: (params, setParams) => {
      return (
        <div className={"w-full grid grid-cols-1"}>
          <label className={"label"}>
            {t("status")} :
            <SelectFilter
              data={[...statusData, "all"]}
              selected={params.status ?? AppointmentStatusEnum.PENDING}
              onChange={(event: any) => {
                setParams({ ...params, status: event.target.value });
              }}
            />
          </label>
          <label className="label">
            {t("type")} :
            <SelectFilter
              data={typeData}
              selected={params.type ?? "online"}
              onChange={(event: any) => {
                setParams({ ...params, type: event.target.value });
              }}
            />
          </label>
          <label className="label">{t("startDate")} :</label>
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
          <label className="label">{t("endDate")} :</label>
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
      <DataTable {...tableData} />
    </>
  );
};

export default AppointmentTable;