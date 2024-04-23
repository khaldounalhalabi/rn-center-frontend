import React from "react";
import PageCard from "@/components/common/ui/PageCard";
import { ClinicService } from "@/services/ClinicService";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import RoundedImage from "@/components/common/RoundedImage";
import { ApiResponse } from "@/Http/Response";
import { Clinic } from "@/Models/Clinic";
import { getMedia } from "@/Models/Media";
import { Phone } from "@/Models/Phone";
import ClinicOverview from "@/components/admin/clinics/ClinicOverview";
import { Link } from "@/i18Router";
import { translate } from "@/Helpers/Translations";
import { getTranslations } from "next-intl/server";

const Page = async ({
  params: { clinicId },
}: {
  params: { clinicId: number };
}) => {
  const data: ApiResponse<Clinic> =
    await ClinicService.make<ClinicService>().show(clinicId);
  const clinic = data.data;
  const t = await getTranslations("clinic.show");
  return (
    <PageCard>
      <div className={"flex justify-between items-center"}>
        <h1 className={"card-title "}>{t("name")}</h1>
        <div className={"flex"}>
          <Link href={`${clinicId}/edit`}>
            <PrimaryButton>{t("editBtn")}</PrimaryButton>
          </Link>
        </div>
      </div>
      <div className={"card p-5 bg-base-200 my-3"}>
        <div className={`flex items-center gap-3`}>
          <RoundedImage
            src={getMedia(clinic?.user?.image?.[0] ?? undefined)}
            alt={"doctor-profile"}
            className={"w-24 h-24"}
          />
          <div className={"flex flex-col"}>
            <h2 className={"font-bold text-lg"}>{translate(clinic?.name)}</h2>
            <h3>
              {translate(clinic?.user?.first_name)}{" "}
              {translate(clinic?.user?.middle_name)}{" "}
              {translate(clinic?.user?.last_name)}
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
            {/*TODO::configure it when appointments is done Appointments*/}
            <h1>5</h1>
            <h2>{t("total-appointments")}</h2>
          </div>
          <div
            className={
              "card card-bordered bg-base-100 w-full p-5 flex flex-col justify-between"
            }
          >
            <h1>5</h1>
            <h2>{t("today-appointments")}</h2>
          </div>
          <div
            className={
              "card card-bordered bg-base-100 w-full p-5 flex flex-col justify-between"
            }
          >
            <h1>5</h1>
            <h2 className={""}>{t("upcoming-appointments")}</h2>
          </div>
        </div>
      </div>

      <div className="w-full px-2 py-16 sm:px-0">
        <ClinicOverview clinic={clinic} />
      </div>
    </PageCard>
  );
};

export default Page;
