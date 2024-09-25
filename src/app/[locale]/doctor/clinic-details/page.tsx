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
import Grid from "@/components/common/ui/Grid";
import { LabelValue } from "@/components/common/ui/LabelsValues/LabelValue";
import { Label } from "@/components/common/ui/LabelsValues/Label";
import { Value } from "@/components/common/ui/LabelsValues/Value";

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
        <div className={"flex justify-between items-center"}>
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
          </div>
          <Link
            href={`/doctor/clinic-details/edit`}
            className={
              role == Role.CLINIC_EMPLOYEE &&
              !permissionsArray.includes(PermissionsDoctor.EDIT_CLINIC_PROFILE)
                ? "hidden"
                : ""
            }
          >
            <PrimaryButton type={"button"}>{t("editBtn")}</PrimaryButton>
          </Link>
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
        <Grid gap={8}>
          <Label label={t("specializations")} col>
            <div className="flex items-center justify-between flex-wrap">
              {res?.specialities?.map((spec) => {
                return (
                  <div key={spec.id} className={"badge badge-info mx-1"}>
                    {TranslateServer(spec.name)}
                  </div>
                );
              })}
            </div>
          </Label>

          <LabelValue
            label={t("approximateAppointmentTime")}
            value={`${res?.approximate_appointment_time} min`}
            color={"primary"}
          />

          <LabelValue
            label={t("status")}
            value={res?.status}
            color={"success"}
          />

          <LabelValue
            label={t("experienceYear")}
            value={`${res?.experience_years} Years`}
            color={"accent"}
          />

          <Label label={t("address")} col>
            <Value>
              <div className={"flex flex-col"}>
                <span className="text-start">
                  {await TranslateServer(res?.user?.address?.name)}
                </span>
                <span className="text-start">
                  {await TranslateServer(res?.user?.address?.city?.name)}
                </span>
                <span className="text-start">
                  {res?.user?.address?.country}
                </span>
              </div>
            </Value>
          </Label>

          <LabelValue
            label={t("cost")}
            value={`${res?.appointment_cost.toLocaleString()} IQD`}
            color={"info"}
          />

          <LabelValue
            label={t("maxAppointmentsPerDay")}
            value={`${res?.max_appointments.toLocaleString()} Appointments`}
            color={"error"}
          />

          <LabelValue
            label={t("appointmentDayRange")}
            value={`${res?.appointment_day_range} Days`}
            color={"primary"}
          />

          <LabelValue
            label={t("hospital")}
            value={await TranslateServer(res?.hospital?.name)}
            color={"secondary"}
          />

          <LabelValue
            label={t("registeredAt")}
            value={res?.created_at}
            color={"accent"}
          />

          <LabelValue
            label={t("lastUpdatedAt")}
            value={res?.updated_at}
            color={"success"}
          />

          <LabelValue
            label={t("subscription")}
            value={res?.active_subscription?.subscription?.name}
            color={"warning"}
          />

          <LabelValue
            label={t("subscriptionType")}
            value={res?.active_subscription?.type}
            color={"primary"}
          />

          <LabelValue
            label={t("subscriptionCost")}
            value={res?.active_subscription?.subscription?.cost ?? 0}
            color={"primary"}
          />

          <LabelValue
            label={t("deductionCost")}
            value={res?.active_subscription?.deduction_cost ?? 0}
            color={"success"}
          />

          <LabelValue
            label={t("subscriptionStartTime")}
            value={res?.active_subscription?.start_time}
            color={"neutral"}
          />

          <LabelValue
            label={t("endTime")}
            value={res?.active_subscription?.end_time}
            color={"error"}
          />
        </Grid>

        <Label label={t("subscriptionDescription")} col>
          <textarea
            className="textarea textarea-bordered h-24 w-full"
            disabled={true}
            defaultValue={res?.active_subscription?.subscription?.description}
          ></textarea>
        </Label>

        <Label label={t("experienceY")} col>
          <textarea
            className="textarea textarea-bordered h-24 w-full"
            disabled={true}
            defaultValue={res?.experience}
          ></textarea>
        </Label>

        <Label label={t("about")} col>
          <textarea
            className="textarea textarea-bordered h-24 w-full"
            disabled={true}
            defaultValue={res?.about_us}
          />
        </Label>

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
