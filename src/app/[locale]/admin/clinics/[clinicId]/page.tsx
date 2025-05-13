import React from "react";
import PageCard from "@/components/common/ui/PageCard";
import { ClinicsService } from "@/services/ClinicsService";
import { ApiResponse } from "@/http/Response";
import { Clinic } from "@/models/Clinic";
import ClinicOverview from "@/components/admin/clinics/ClinicOverview";
import { Link } from "@/navigation";
import { getTranslations } from "next-intl/server";
import { RoleEnum } from "@/enums/RoleEnum";
import { Button } from "@/components/ui/shadcn/button";

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
          "flex w-full flex-col items-center justify-between md:flex-row"
        }
      >
        <h1 className={"card-title w-full !text-center md:text-start"}>
          {t("name")}
        </h1>
        <div
          className={
            "flex w-full flex-col items-center justify-end gap-1 md:flex-row"
          }
        >
          <Link href={`${clinicId}/edit`}>
            <Button>{t("editBtn")}</Button>
          </Link>
        </div>
      </div>
      <div className={"card my-3 bg-base-200 p-5"}>
        <div className={`flex flex-col items-center gap-3 md:flex-row`}>
          <div className={"flex flex-col"}>
            <h2 className={"text-lg font-bold"}>{clinic?.user?.full_name}</h2>
            <p>{clinic?.user?.phone}</p>
          </div>
        </div>
        <div className={"grid w-full grid-cols-1 gap-3 md:grid-cols-3"}>
          <div
            className={
              "card card-bordered flex w-full flex-col justify-between bg-base-100 p-5"
            }
          >
            <h1 suppressHydrationWarning>
              {clinic?.total_appointments?.toLocaleString()}
            </h1>
            <h2>{t("total-appointments")}</h2>
          </div>
          <div
            className={
              "card card-bordered flex w-full flex-col justify-between bg-base-100 p-5"
            }
          >
            <h1 suppressHydrationWarning>
              {clinic?.today_appointments_count.toLocaleString()}
            </h1>
            <h2>{t("today-appointments")}</h2>
          </div>
          <div
            className={
              "card card-bordered flex w-full flex-col justify-between bg-base-100 p-5"
            }
          >
            <h1 suppressHydrationWarning>
              {clinic?.upcoming_appointments_count.toLocaleString()}
            </h1>
            <h2 className={""}>{t("upcoming-appointments")}</h2>
          </div>
        </div>
      </div>
      <div className="w-full px-2 pb-16 pt-10 sm:px-0">
        <ClinicOverview clinic={clinic} />
      </div>
    </PageCard>
  );
};

export default Page;
