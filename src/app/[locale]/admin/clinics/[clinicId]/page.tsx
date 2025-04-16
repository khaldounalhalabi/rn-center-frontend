import React from "react";
import PageCard from "@/components/common/ui/PageCard";
import { ClinicsService } from "@/services/ClinicsService";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import { ApiResponse } from "@/Http/Response";
import { Clinic } from "@/Models/Clinic";
import ClinicOverview from "@/components/admin/clinics/ClinicOverview";
import { Link } from "@/navigation";
import { getTranslations } from "next-intl/server";
import Grid from "@/components/common/ui/Grid";
import { RoleEnum } from "@/enum/RoleEnum";

const Page = async ({
  params: { clinicId },
}: {
  params: { clinicId: number };
}) => {
  const data: ApiResponse<Clinic> = await ClinicsService.make<ClinicsService>(
    RoleEnum.ADMIN,
  ).show(clinicId);
  const clinic = data.data;

  const t = await getTranslations("admin.clinic.show");
  return (
    <PageCard>
      <div
        className={
          "flex flex-col md:flex-row justify-between items-center w-full"
        }
      >
        <h1 className={"card-title !text-center md:text-start w-full"}>
          {t("name")}
        </h1>
        <div
          className={
            "flex flex-col md:flex-row gap-1 items-center justify-end w-full"
          }
        >
          <Link href={`${clinicId}/edit`}>
            <PrimaryButton>{t("editBtn")}</PrimaryButton>
          </Link>
        </div>
      </div>
      <div className={"card p-5 bg-base-200 my-3 "}>
        <div className={`flex flex-col md:flex-row items-center gap-3`}>
          <div className={"flex flex-col"}>
            <h2 className={"font-bold text-lg"}>{clinic?.user?.full_name}</h2>
            <p>{clinic?.user?.phone}</p>
          </div>
        </div>
        <div className={"grid grid-cols-1 md:grid-cols-3 gap-3 w-full"}>
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
      <div className="px-2 sm:px-0 pb-16 pt-10 w-full">
        <ClinicOverview clinic={clinic} />
      </div>
    </PageCard>
  );
};

export default Page;
