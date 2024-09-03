"use client";
import React from "react";
import { Clinic } from "@/Models/Clinic";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import MapIFrame from "@/components/common/ui/MapIFrame";
import { useTranslations } from "next-intl";

const Overview = ({ clinic }: { clinic?: Clinic | undefined | null }) => {
  const t = useTranslations("admin.clinic.show");
  return (
    <div className={"card p-5 bg-base-200 my-3 w-full"}>
      <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
        <div className={"w-full"}>
          <label className={"label"}>{t("specializations")} :</label>
          <div className={"flex flex-wrap w-full gap-3"}>
            {clinic?.specialities?.map((spec) => {
              return (
                <div key={spec.id} className={"badge badge-info"}>
                  {TranslateClient(spec.name)}
                </div>
              );
            })}
          </div>
        </div>
        <div className={"w-full"}>
          <label className={"label"}>
            {t("approximateAppointmentTime")} :{" "}
          </label>
          <div className={"badge badge-neutral"}>
            {clinic?.approximate_appointment_time} min
          </div>
        </div>
        <div className={"w-full"}>
          <label className={"label"}>{t("blood")} : </label>
          <div className={"badge badge-error"}>{clinic?.user?.blood_group}</div>
        </div>
        <div className={"w-full"}>
          <label className={"label"}>{t("gender")} : </label>
          <p className={"badge badge-success"}>{clinic?.user?.gender}</p>
        </div>
        <div className={"w-full"}>
          <label className={"label"}>{t("status")} : </label>
          <p className={"badge badge-warning"}>{clinic?.status}</p>
        </div>
        <div className={"w-full"}>
          <label className={"label"}>{t("birth")} : </label>
          <div className={"badge badge-neutral"}>
            {clinic?.user?.birth_date}
          </div>
          <label className={"label"}>{t("age")} : </label>
          <div className={"badge badge-neutral"}>{clinic?.user?.age}</div>
        </div>
        <div className={"w-full"}>
          <label className={"label"}>{t("experienceY")} : </label>
          <p className={"badge badge-accent"}>{clinic?.experience_years}</p>
        </div>
        <div className={"w-full"}>
          <label className={"label"}>{t("address")} :</label>
          <div className={"flex flex-col"}>
            <p>{TranslateClient(clinic?.user?.address?.name)}</p>
            <p>{TranslateClient(clinic?.user?.address?.city?.name)}</p>
            <p>{clinic?.user?.address?.country}</p>
          </div>
        </div>

        <div className={"w-full"}>
          <label className={"label"}>{t("cost")} :</label>
          <p className={"badge badge-primary"} suppressHydrationWarning>
            {clinic?.appointment_cost.toLocaleString()} IQD
          </p>
        </div>
        <div className={"w-full"}>
          <label className={"label"}>{t("maxAppointmentsPerDay")} :</label>
          <p className={"badge badge-warning"} suppressHydrationWarning>
            {clinic?.max_appointments.toLocaleString()}
          </p>
        </div>
        <div className={"w-full"}>
          <label className={"label"}>
            {t("maximumDaysToScheduleAnAppointment")} :
          </label>
          <p className={"badge badge-neutral"}>
            {clinic?.appointment_day_range}
          </p>
        </div>
        <div className={"w-full"}>
          <label className={"label"}>{t("hospital")} :</label>
          <p className={"badge badge-error"}>
            {TranslateClient(clinic?.hospital?.name) ?? "No Hospital"}
          </p>
        </div>

        <div className={"w-full"}>
          <label className={"label"}>{t("registeredOn")} :</label>
          <p className={"badge badge-secondary"}>{clinic?.created_at}</p>
        </div>
        <div className={"w-full"}>
          <label className={"label"}>{t("lastUpdatedAt")} :</label>
          <p className={"badge badge-accent"}>{clinic?.updated_at}</p>
        </div>

        <div className={"w-full"}>
          <label className={"label"}>{t("subscription")} :</label>
          <p className={"badge badge-warning"}>
            {clinic?.active_subscription?.subscription?.name}
          </p>
        </div>
        <div className={"w-full"}>
          <label className={"label"}>{t("subscriptionType")} :</label>
          <p className={"badge badge-primary"}>
            {clinic?.active_subscription?.type}
          </p>
        </div>
        <div className={"w-full"}>
          <label className={"label"}>{t("subscriptionCost")} :</label>
          <p className={"badge badge-success"}>
            {clinic?.active_subscription?.subscription?.cost ?? 0}
          </p>
        </div>
        <div className={"w-full"}>
          <label className={"label"}>{t("deductionCost")} :</label>
          <p className={"badge badge-success"}>
            {clinic?.active_subscription?.deduction_cost ?? 0}
          </p>
        </div>
        <div className={"w-full"}>
          <label className={"label"}>{t("subscriptionStart")} :</label>
          <p className={"badge badge-neutral"}>
            {clinic?.active_subscription?.start_time}
          </p>
        </div>
        {(clinic?.active_subscription?.subscription?.period ?? 0) >= 0 && (
          <div className={"w-full"}>
            <label className={"label"}>{t("subscriptionEnd")} :</label>
            <p className={"badge badge-accent"}>
              {clinic?.active_subscription?.end_time}
            </p>
          </div>
        )}
      </div>
      <div className={"w-full"}>
        <label className={"label"}>{t("subscriptionDescription")} :</label>
        <textarea
          className="textarea textarea-bordered h-24 w-full"
          disabled={true}
          defaultValue={clinic?.active_subscription?.subscription?.description}
        ></textarea>
      </div>
      <div className={"w-full"}>
        <label className={"label"}>{t("experience")} :</label>
        <textarea
          className="textarea textarea-bordered h-24 w-full"
          disabled={true}
          defaultValue={clinic?.experience}
        ></textarea>
      </div>
      <div className={"w-full"}>
        <label className={"label"}>{t("about")} :</label>
        <textarea
          className="textarea textarea-bordered h-24 w-full"
          disabled={true}
          defaultValue={clinic?.about_us}
        />
      </div>
      <MapIFrame iframe={clinic?.user?.address?.map_iframe} />
    </div>
  );
};

export default Overview;