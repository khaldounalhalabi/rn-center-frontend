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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";

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
  const schedulesT = await getTranslations("admin.schedules.table");
  return (
    <PageCard
      title={t("name")}
      actions={
        <div className={"flex items-center justify-between gap-2"}>
          <Link href={`/admin/clinics/${clinicId}/edit`}>
            <Button>{t("editBtn")}</Button>
          </Link>
          <Link href={`/admin/clinics/schedules/${clinicId}`}>
            <Button variant={"secondary"}>
              {schedulesT("clinicSchedules")}
            </Button>
          </Link>
        </div>
      }
    >
      <Card>
        <CardHeader className={`flex flex-col items-center gap-3 md:flex-row`}>
          <CardTitle className={"flex flex-col"}>
            <h2 className={"text-lg font-bold"}>{clinic?.user?.full_name}</h2>
            <p>{clinic?.user?.phone}</p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={"grid w-full grid-cols-1 gap-3 md:grid-cols-3"}>
            <Card>
              <CardHeader>
                <CardTitle>
                  {clinic?.total_appointments?.toLocaleString()}
                </CardTitle>
                <CardDescription>{t("total-appointments")}</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>
                  {clinic?.today_appointments_count.toLocaleString()}
                </CardTitle>
                <CardDescription>{t("today-appointments")}</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>
                  {clinic?.upcoming_appointments_count.toLocaleString()}
                </CardTitle>
                <CardDescription>{t("upcoming-appointments")}</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </CardContent>
      </Card>
      <div className="w-full px-2 pb-16 pt-10 sm:px-0">
        <ClinicOverview clinic={clinic} />
      </div>
    </PageCard>
  );
};

export default Page;
