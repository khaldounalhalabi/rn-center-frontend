import React from "react";
import PageCard from "@/components/common/ui/PageCard";
import { ClinicsService } from "@/services/ClinicsService";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import RoundedImage from "@/components/common/RoundedImage";
import { ApiResponse } from "@/Http/Response";
import { Clinic } from "@/Models/Clinic";
import { getMedia } from "@/Models/Media";
import { Phone } from "@/Models/Phone";
import ClinicOverview from "@/components/admin/clinics/ClinicOverview";
import { Link } from "@/navigation";
import { getTranslations } from "next-intl/server";
import TranslateServer from "@/Helpers/TranslationsServer";
import { AppointmentDeductionsService } from "@/services/AppointmentDeductionsService";
import Grid from "@/components/common/ui/Grid";
import CollectSubscriptionButton from "@/components/admin/clinicSubscription/CollectSubscriptionButton";
import CollectDeductionsButton from "@/components/admin/appointment-deductions/CollectDeductionsButton";

const Page = async ({
  params: { clinicId },
}: {
  params: { clinicId: number };
}) => {
  const data: ApiResponse<Clinic> =
    await ClinicsService.make<ClinicsService>().show(clinicId);
  const clinic = data.data;
  const summary =
    await AppointmentDeductionsService.make<AppointmentDeductionsService>(
      "admin"
    ).getSummaryByClinicId(clinicId);

  const currentMonthTotalDeductions =
    await AppointmentDeductionsService.make<AppointmentDeductionsService>(
      "admin"
    ).getCurrentMonthTotalByClinic(clinicId);

  const t = await getTranslations("admin.clinic.show");
  return (
    <PageCard>
      <div className={"flex flex-col md:flex-row justify-between items-center w-full"}>
        <h1 className={"card-title !text-center md:text-start w-full"}>{t("name")}</h1>
        <div
          className={
            "flex flex-col md:flex-row gap-1 items-center justify-end w-full"
          }
        >
          <Link href={`${clinicId}/edit`}>
            <PrimaryButton>{t("editBtn")}</PrimaryButton>
          </Link>

          <CollectDeductionsButton
            clinic={clinic}
            total={currentMonthTotalDeductions.data}
          />
          <CollectSubscriptionButton
            clinicId={clinicId}
            clinicSubscription={clinic?.active_subscription}
          />
        </div>
      </div>
      <div className={"card p-5 bg-base-200 my-3 "}>
        <div className={`flex items-center gap-3`}>
          <RoundedImage
            src={getMedia(clinic?.user?.image?.[0] ?? undefined)}
            alt={"doctor-profile"}
            className={"w-24 h-24"}
          />
          <div className={"flex flex-col"}>
            <h2 className={"font-bold text-lg"}>
              {await TranslateServer(clinic?.name)}
            </h2>
            <h3>
              {await TranslateServer(clinic?.user?.first_name)}{" "}
              {await TranslateServer(clinic?.user?.middle_name)}{" "}
              {await TranslateServer(clinic?.user?.last_name)}
            </h3>
            <p>{clinic?.user?.email}</p>
            <div className={"flex gap-1"}>
              {clinic?.user?.phones?.slice(0, 2).map((item: Phone, index) => {
                return (
                  <p key={item.id}>
                    {item.phone} {index != 0 && index != 2 ? "/" : ""}
                  </p>
                );
              })}
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
              {clinic?.total_appointments?.toLocaleString()}
            </h1>
            <h2>{t("total-appointments")}</h2>
          </div>
          <div
            className={
              "card card-bordered bg-base-100 w-full p-5 flex flex-col justify-between"
            }
          >
            <h1 suppressHydrationWarning>
              {clinic?.today_appointments_count.toLocaleString()}
            </h1>
            <h2>{t("today-appointments")}</h2>
          </div>
          <div
            className={
              "card card-bordered bg-base-100 w-full p-5 flex flex-col justify-between"
            }
          >
            <h1 suppressHydrationWarning>
              {clinic?.upcoming_appointments_count.toLocaleString()}
            </h1>
            <h2 className={""}>{t("upcoming-appointments")}</h2>
          </div>
        </div>
      </div>
      <div className={"p-6 border-gray-400 border-2 rounded-2xl"}>
        <Grid md={2}>
          <label className="label">
            {t("subscriptionStart")} :
            <span className="bg-base-200 px-2 rounded-xl text-lg">
              {summary?.data?.subscription_start}
            </span>
          </label>
          <label className="label">
            {t("totalCost")} :
            <span className="bg-base-200 px-2 rounded-xl text-lg">
              {Number(summary?.data?.total_cost ?? 0).toLocaleString()}
            </span>
          </label>

          <label className="label">
            {t("subscriptionEnd")} :
            <span className="bg-base-200 px-2 rounded-xl text-lg">
              {summary?.data?.subscription_end}
            </span>
          </label>
          <label className="label">
            {t("subscriptionCost")} :
            <span className="bg-base-200 px-2 rounded-xl text-lg">
              {Number(summary?.data?.subscription_cost ?? 0).toLocaleString()}
            </span>
          </label>
          <label className="label">
            {t("clinicBalance")} :
            <span className="bg-base-200 px-2 rounded-xl text-lg">
              {Number(summary?.data?.clinic_balance ?? 0).toLocaleString()}
            </span>
          </label>

          <label className="label">
            {t("appointmentDeductions")} :
            <span className="bg-base-200 px-2 rounded-xl text-lg">
              {Number(
                summary?.data?.appointments_deductions ?? 0
              ).toLocaleString()}
            </span>
          </label>
        </Grid>
      </div>
      <div className="px-2 sm:px-0 pb-16 pt-10 w-full">
        <ClinicOverview clinic={clinic} />
      </div>
    </PageCard>
  );
};

export default Page;
