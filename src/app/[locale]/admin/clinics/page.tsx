"use client";
import React, { ChangeEvent } from "react";
import DataTable, {
  DataTableData,
} from "@/components/common/Datatable/DataTable";
import { Clinic } from "@/Models/Clinic";
import { ClinicsService } from "@/services/ClinicsService";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import { UserService } from "@/services/UserService";
import { cities } from "@/constants/Cities";
import { useTranslations } from "next-intl";
import ArchiveButton from "@/components/common/ArchiveButton";
import SelectFilter from "@/components/common/ui/Selects/SelectFilter";
import SubscriptionStatuses from "@/enum/SubscriptionStatus";

const Page = () => {
  const t = useTranslations("admin.clinic.table");
  const dataTableData: DataTableData<Clinic> = {
    createUrl: `/admin/clinics/create`,
    schema: [
      {
        name: "id",
        label: `id`,
        sortable: true,
      },
      {
        name: "name",
        sortable: true,
        label: `${t("clinic")}`,
        translatable: true,
      },
      {
        name: "user.first_name",
        sortable: true,
        label: `${t("doctor")}`,
        render: (_first_name, clinic) => {
          return (
            <p>
              {TranslateClient(clinic?.user?.first_name)}{" "}
              {TranslateClient(clinic?.user?.middle_name)}{" "}
              {TranslateClient(clinic?.user?.last_name)}
            </p>
          );
        },
      },
      {
        name: "user.address.city.name",
        sortable: true,
        label: `${t("city")}`,
        translatable: true,
      },
      {
        label: `${t("phone")}`,
        render: (_undefined, clinic) =>
          clinic?.user?.phones ? clinic?.user?.phones[0]?.phone : "",
      },
      {
        label: `${t("subscriptionStatus")}`,
        name: "subscription_status",
        sortable: true,
        render: (data) =>
          data == "active" ? (
            <span className={`badge badge-success`}>{t("active")}</span>
          ) : (
            <span className={`badge badge-error`}>{t("inActive")}</span>
          ),
      },
      {
        label: `${t("archived?")}`,
        name: "user.is_archived",
        sortable: true,
        render: (data) =>
          data ? (
            <span className={`badge badge-error`}>{t("archived")}</span>
          ) : (
            <span className={`badge badge-success`}>{t("notArchived")}</span>
          ),
      },
      {
        name: "approximate_appointment_time",
        label: `${t("approximateAppointmentTime")}`,
        render: (_undefined, clinic, setHidden, revalidate) => {
          return (
            <span className="badge-neutral badge">
              {clinic?.approximate_appointment_time} min
            </span>
          );
        },
        sortable: true,
      },
      {
        name: "total_appointments",
        label: `${t("total-appointments")}`,
        render: (_undefined, clinic) => {
          return (
            <span suppressHydrationWarning>
              {clinic?.total_appointments.toLocaleString()}
            </span>
          );
        },
      },
      {
        label: `${t("actions")}`,
        render: (_undefined, clinic, setHidden, revalidate) => (
          <ActionsButtons
            id={clinic?.id}
            buttons={["edit", "show"]}
            baseUrl={`/admin/clinics`}
          >
            <ArchiveButton
              data={clinic}
              id={clinic?.user_id}
              api={UserService}
              revalidate={revalidate}
              user={"admin"}
            />
          </ActionsButtons>
        ),
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await ClinicsService.make<ClinicsService>("admin").indexWithPagination(
        page,
        search,
        sortCol,
        sortDir,
        perPage,
        params,
      ),
    title: `${t("clinics")} :`,
    filter: (params, setParams) => {
      return (
        <div className={"w-full grid grid-cols-1"}>
          <label className={"label"}>
            {t("archived")} :
            <input
              type="checkbox"
              className={"checkbox"}
              defaultChecked={params.is_archived}
              onChange={(event) => {
                const { checked } = event.target;
                setParams({ ...params, is_archived: checked ? 1 : 0 });
              }}
            />
          </label>
          <label className="label">
            {t("city")} :
            <select
              className="select-bordered select"
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                setParams({ ...params, city_name: e.target.value });

              }}
            >
              {cities.map((city, index) => (
                <option
                  key={index}
                  value={city.name}
                  selected={params.city_name == city.name}
                >
                  {TranslateClient(city.name)}
                </option>
              ))}
            </select>
          </label>
          <label className="label">{t("status")} :</label>
          <SelectFilter
            data={SubscriptionStatuses()}
            selected={params.subscription_status ?? ""}
            onChange={(event: any) => {
              setParams({ ...params, subscription_status: event.target.value });
            }}
          />
        </div>
      );
    },
  };
  return <DataTable {...dataTableData} />;
};

export default Page;