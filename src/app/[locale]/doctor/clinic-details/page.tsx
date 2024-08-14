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
import { TranslateClient } from "@/Helpers/TranslationsClient";
import Gallery from "@/components/common/ui/Gallery";
import {getTranslations} from "next-intl/server";
import {getCookieServer} from "@/Actions/serverCookies";
import {Role} from "@/enum/Role";
import {PermissionsDoctor} from "@/enum/Permissions";

const page = async () => {
  const role = await getCookieServer("role");
  const permissions: string | undefined = await getCookieServer("permissions");
  const permissionsArray: string[] = permissions?.split(",") ?? [""];
  const data = await AuthService.make<AuthService>("doctor").GetClinicDetails();
  const res: Clinic = data.data;
  const t = await getTranslations("doctor.clinic-details.show")
  console.log(res);
  return (
    <PageCard>
      <div className={"card p-5 bg-base-200 my-3 "}>
        <div className={"flex justify-between"}>
          <div className={`flex items-center gap-3`}>
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
                      <p key={item.id} className={'badge badge-outline'}>
                        {item.phone}
                      </p>

                  );
                })}
              </div>
            </div>
          </div>
          <div>
            <Link href={`/doctor/clinic-details/edit`}  className={
              role == Role.CLINIC_EMPLOYEE &&
              !permissionsArray.includes(PermissionsDoctor.EDIT_CLINIC_PROFILE)
                  ? "hidden"
                  : ""
            }>
              <PrimaryButton type={"button"}>{t("editBtn")}</PrimaryButton>
            </Link>
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
              {res?.approximate_appointment_time} min
            </div>
          </div>
          <div className={"w-full"}>
            <label className={"label"}>{t("status")} : </label>
            <p className={"badge badge-warning"}>{res?.status}</p>
          </div>
          <div className={"w-full"}>
            <label className={"label"}>{t("experienceYear")} : </label>
            <p className={"badge badge-accent"}>{res?.experience_years}</p>
          </div>
          <div className={"w-full"}>
            <label className={"label"}>{t("address")} :</label>
            <div className={"flex flex-col"}>
              <p>{TranslateClient(res?.user?.address?.name)}</p>
              <p>{TranslateClient(res?.user?.address?.city?.name)}</p>
              <p>{res?.user?.address?.country}</p>
            </div>
          </div>

          <div className={"w-full"}>
            <label className={"label"}>{t("cost")} :</label>
            <p className={"badge badge-primary"} suppressHydrationWarning>
              {res?.appointment_cost.toLocaleString()} IQD
            </p>
          </div>
          <div className={"w-full"}>
            <label className={"label"}>{t("maxAppointmentsPerDay")} :</label>
            <p className={"badge badge-warning"} suppressHydrationWarning>
              {res?.max_appointments.toLocaleString()}
            </p>
          </div>
          <div className={"w-full"}>
            <label className={"label"}>{t("appointmentDayRange")} :</label>
            <p className={"badge badge-neutral"}>
              {res?.appointment_day_range}
            </p>
          </div>
          <div className={"w-full"}>
            <label className={"label"}>{t("hospital")} :</label>
            <p className={"badge badge-error"}>
              {TranslateClient(res?.hospital?.name) ?? "No Hospital"}
            </p>
          </div>

          <div className={"w-full"}>
            <label className={"label"}>{t("registeredAt")} :</label>
            <p className={"badge badge-secondary"}>{res?.created_at}</p>
          </div>
          <div className={"w-full"}>
            <label className={"label"}>{t("lastUpdatedAt")} :</label>
            <p className={"badge badge-accent"}>{res?.updated_at}</p>
          </div>

          <div className={"w-full"}>
            <label className={"label"}>{t("subscription")} :</label>
            <p className={"badge badge-warning"}>
              {res?.active_subscription?.subscription?.name}
            </p>
          </div>
          <div className={"w-full"}>
            <label className={"label"}>{t("subscriptionType")} :</label>
            <p className={"badge badge-primary"}>
              {res?.active_subscription?.type}
            </p>
          </div>
          <div className={"w-full"}>
            <label className={"label"}>{t("subscriptionCost")} :</label>
            <p className={"badge badge-success"}>
              {res?.active_subscription?.subscription?.cost ?? 0}
            </p>
          </div>
          <div className={"w-full"}>
            <label className={"label"}>{t("deductionCost")} :</label>
            <p className={"badge badge-success"}>
              {res?.active_subscription?.deduction_cost ?? 0}
            </p>
          </div>
          <div className={"w-full"}>
            <label className={"label"}>{t("subscriptionStartTime")} :</label>
            <p className={"badge badge-neutral"}>
              {res?.active_subscription?.start_time}
            </p>
          </div>
          {(res?.active_subscription?.subscription?.period ?? 0) >= 0 && (
            <div className={"w-full"}>
              <label className={"label"}>{t("endTime")} :</label>
              <p className={"badge badge-accent"}>
                {res?.active_subscription?.end_time}
              </p>
            </div>
          )}
        </div>
        <div className={"w-full"}>
          <label className={"label"}>{t("subscriptionDescription")} :</label>
          <textarea
            className="textarea textarea-bordered h-24 w-full"
            disabled={true}
            defaultValue={res?.active_subscription?.subscription?.description}
          ></textarea>
        </div>
        <div className={"w-full"}>
          <label className={"label"}>{t("experienceY")} :</label>
          <textarea
            className="textarea textarea-bordered h-24 w-full"
            disabled={true}
            defaultValue={res?.experience}
          ></textarea>
        </div>
        <div className={"w-full"}>
          <label className={"label"}>{t("about")} :</label>
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

export default page