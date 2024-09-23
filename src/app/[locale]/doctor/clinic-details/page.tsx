import PageCard from "@/components/common/ui/PageCard";
import { Link } from "@/navigation";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import React from "react";
import TranslateServer from "@/Helpers/TranslationsServer";
import MapIFrame from "@/components/common/ui/MapIFrame";
import { Clinic } from "@/Models/Clinic";
import { AuthService } from "@/services/AuthService";
import RoundedImage from "@/components/common/RoundedImage";
import { getMedia } from "@/Models/Media";
import { Phone } from "@/Models/Phone";
import Gallery from "@/components/common/ui/Gallery";
import { getTranslations } from "next-intl/server";
import { getCookieServer } from "@/Actions/serverCookies";
import { Role } from "@/enum/Role";
import { PermissionsDoctor } from "@/enum/Permissions";

const page = async () => {
  const role = await getCookieServer("role");
  const permissions: string | undefined = await getCookieServer("permissions");
  const permissionsArray: string[] = permissions?.split(",") ?? [""];
  const data = await AuthService.make<AuthService>("doctor").GetClinicDetails();
  const res: Clinic = data.data;
  const t = await getTranslations("doctor.clinic-details.show");
  console.log(res);
  return (
    <PageCard>
      <div className={"card p-5 bg-base-200 my-3 "}>
        <div className={"flex justify-between"}>
          <div className={`flex md:flex-row flex-col items-center gap-3`}>
            <RoundedImage
              src={getMedia(res?.user?.image?.[0] ?? undefined)}
              alt={"doctor-profile"}
              className={"w-24 h-24"}
            />

            <div className={"flex flex-col"}>
              <h2 className={"font-bold text-lg"}>
                {await TranslateServer(res?.name)}
              </h2>
              <h3>
                {await TranslateServer(res?.user?.first_name)}{" "}
                {await TranslateServer(res?.user?.middle_name)}{" "}
                {await TranslateServer(res?.user?.last_name)}
              </h3>
              <p>{res?.user?.email}</p>
              <div className={"flex gap-1  my-2"}>
                {res?.user?.phones?.slice(0, 2).map((item: Phone, index) => {
                  return (
                    <p key={item.id} className={"badge badge-outline"}>
                      {item.phone}
                    </p>
                  );
                })}
              </div>
            </div>
            <div className={"mb-4"}>
              <Link
                href={`/doctor/clinic-details/edit`}
                className={
                  role == Role.CLINIC_EMPLOYEE &&
                  !permissionsArray.includes(
                    PermissionsDoctor.EDIT_CLINIC_PROFILE,
                  )
                    ? "hidden"
                    : ""
                }
              >
                <PrimaryButton type={"button"}>{t("editBtn")}</PrimaryButton>
              </Link>
            </div>
          </div>
        </div>
        <div className={"grid grid-cols-1 md:grid-cols-3 gap-3"}>
          <div
            className={
              "card card-bordered bg-base-100 w-full p-5 flex flex-col justify-between"
            }
          >
            <h1 suppressHydrationWarning>
              {res?.total_appointments?.toLocaleString()}
            </h1>
            <h2>{t("totalAppointments")}</h2>
          </div>
          <div
            className={
              "card card-bordered bg-base-100 w-full p-5 flex flex-col justify-between"
            }
          >
            <h1 suppressHydrationWarning>
              {res?.today_appointments_count.toLocaleString()}
            </h1>
            <h2>{t("todayAppointments")}</h2>
          </div>
          <div
            className={
              "card card-bordered bg-base-100 w-full p-5 flex flex-col justify-between"
            }
          >
            <h1 suppressHydrationWarning>
              {res?.upcoming_appointments_count.toLocaleString()}
            </h1>
            <h2 className={""}>{t("upcomingAppointments")}</h2>
          </div>
        </div>
      </div>
      <div className={"card p-5 bg-base-200 my-3 w-full"}>
        <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
          <div className={"w-full"}>
            <label className={"label"}>{t("specializations")} :</label>
            <div className={"flex flex-wrap w-full gap-3"}>
              {res?.specialities?.map((spec) => {
                return (
                  <div key={spec.id} className={"badge badge-info"}>
                    {TranslateServer(spec.name)}
                  </div>
                );
              })}
            </div>
          </div>
          <div className={"w-full"}>
            <label className={"label md:block flex flex-col items-start gap-1"}>
              {t("approximateAppointmentTime")} :{" "}
              <span className={"badge badge-neutral"}>
                {res?.approximate_appointment_time} min
              </span>
            </label>
          </div>
          <div className={"w-full"}>
            <label className={"label md:block flex flex-col items-start gap-1"}>
              {t("status")} :{" "}
              <span className={"badge badge-warning"}>{res?.status}</span>
            </label>
          </div>
          <div className={"w-full"}>
            <label className={"label md:block flex flex-col items-start gap-1"}>
              {t("experienceYear")} :{" "}
              <span className={"badge badge-accent"}>
                {res?.experience_years}
              </span>
            </label>
          </div>
          <div className={"w-full"}>
            <label className={"label md:block flex flex-col items-start gap-1"}>
              {t("address")} :
            </label>
            <div className={"flex flex-col"}>
              <span>{await TranslateServer(res?.user?.address?.name)}</span>
              <span>
                {await TranslateServer(res?.user?.address?.city?.name)}
              </span>
              <span>{res?.user?.address?.country}</span>
            </div>
          </div>

          <div className={"w-full"}>
            <label className={"label md:block flex flex-col items-start gap-1"}>
              {t("cost")} :
              <span className={"badge badge-primary"} suppressHydrationWarning>
                {res?.appointment_cost.toLocaleString()} IQD
              </span>
            </label>
          </div>
          <div className={"w-full"}>
            <label className={"label md:block flex flex-col items-start gap-1"}>
              {t("maxAppointmentsPerDay")} :
              <span className={"badge badge-warning"} suppressHydrationWarning>
                {res?.max_appointments.toLocaleString()}
              </span>
            </label>
          </div>
          <div className={"w-full"}>
            <label className={"label md:block flex flex-col items-start gap-1"}>
              {t("appointmentDayRange")} :{" "}
              <span className={"badge badge-neutral"}>
                {res?.appointment_day_range}
              </span>
            </label>
          </div>
          <div className={"w-full"}>
            <label className={"label md:block flex flex-col items-start gap-1"}>
              {t("hospital")} :{" "}
              <span className={"badge badge-error"}>
                {(await TranslateServer(res?.hospital?.name)) ?? "No Hospital"}
              </span>
            </label>
          </div>

          <div className={"w-full"}>
            <label className={"label md:block flex flex-col items-start gap-1"}>
              {t("registeredAt")} :{" "}
              <span className={"badge badge-secondary"}>{res?.created_at}</span>
            </label>
          </div>
          <div className={"w-full"}>
            <label className={"label md:block flex flex-col items-start gap-1"}>
              {t("lastUpdatedAt")} :
              <span className={"badge badge-accent"}>{res?.updated_at}</span>
            </label>
          </div>

          <div className={"w-full"}>
            <label className={"label md:block flex flex-col items-start gap-1"}>
              {t("subscription")} :{" "}
              <span className={"badge badge-warning"}>
                {res?.active_subscription?.subscription?.name}
              </span>
            </label>
          </div>
          <div className={"w-full"}>
            <label className={"label md:block flex flex-col items-start gap-1"}>
              {t("subscriptionType")} :
              <span className={"badge badge-primary"}>
                {res?.active_subscription?.type}
              </span>
            </label>
          </div>
          <div className={"w-full"}>
            <label className={"label md:block flex flex-col items-start gap-1"}>
              {t("subscriptionCost")} :{" "}
              <span className={"badge badge-success"}>
                {res?.active_subscription?.subscription?.cost ?? 0}
              </span>
            </label>
          </div>
          <div className={"w-full"}>
            <label className={"label md:block flex flex-col items-start gap-1"}>
              {t("deductionCost")} :{" "}
              <span className={"badge badge-success"}>
                {res?.active_subscription?.deduction_cost ?? 0}
              </span>
            </label>
          </div>
          <div className={"w-full"}>
            <label className={"label md:block flex flex-col items-start gap-1"}>
              {t("subscriptionStartTime")} :{" "}
              <span className={"badge badge-neutral"}>
                {res?.active_subscription?.start_time}
              </span>
            </label>
          </div>
          {(res?.active_subscription?.subscription?.period ?? 0) >= 0 && (
            <div className={"w-full"}>
              <label
                className={"label md:block flex flex-col items-start gap-1"}
              >
                {t("endTime")} :
                <span className={"badge badge-accent"}>
                  {res?.active_subscription?.end_time}
                </span>
              </label>
            </div>
          )}
        </div>
        <div className={"w-full"}>
          <label className={"label md:block flex flex-col items-start gap-1"}>
            {t("subscriptionDescription")} :
          </label>
          <textarea
            className="textarea textarea-bordered h-24 w-full"
            disabled={true}
            defaultValue={res?.active_subscription?.subscription?.description}
          ></textarea>
        </div>
        <div className={"w-full"}>
          <label className={"label md:block flex flex-col items-start gap-1"}>
            {t("experienceY")} :
          </label>
          <textarea
            className="textarea textarea-bordered h-24 w-full"
            disabled={true}
            defaultValue={res?.experience}
          ></textarea>
        </div>
        <div className={"w-full"}>
          <label className={"label md:block flex flex-col items-start gap-1"}>
            {t("about")} :
          </label>
          <textarea
            className="textarea textarea-bordered h-24 w-full"
            disabled={true}
            defaultValue={res?.about_us}
          />
        </div>
        <div className={"w-full"}>
          {res?.work_gallery?.length != 0 ? (
            <Gallery media={res?.work_gallery ? res?.work_gallery : [""]} />
          ) : (
            <div className="flex justify-between items-center">
              <label className="label"> {t("image")} : </label>
              <span className="text-lg badge badge-neutral">{"No Data"}</span>
            </div>
          )}
        </div>
        <MapIFrame iframe={res?.user?.address?.map_iframe} />
      </div>
    </PageCard>
  );
};

export default page;
