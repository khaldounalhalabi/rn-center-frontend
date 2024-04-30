import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import { ClinicHolidayService } from "@/services/ClinicHolidayService";
import { ClinicHoliday } from "@/Models/ClinicHoliday";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import { Link } from "@/navigation";
import { translate } from "@/Helpers/Translations";
import { getTranslations } from "next-intl/server";

const page = async ({
  params: { holidayId },
}: {
  params: { holidayId: number };
}) => {
  const t = await getTranslations("admin.holidays.show");
  const data =
    await ClinicHolidayService.make<ClinicHolidayService>().show(holidayId);
  const res: ClinicHoliday = data?.data;
  return (
    <PageCard>
      <div className="flex justify-between items-center w-full h-24">
        <h2 className="card-title">{t("holidayDetails")}</h2>
        <Link href={`/admin/clinics/holidays/${res.id}/edit`}>
          <PrimaryButton type={"button"}>{t("editBtn")}</PrimaryButton>
        </Link>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between items-center my-2">
          <h2 className="text-xl">
            {t("clinicName")} :{" "}
            <span className="bg-base-200 px-2 rounded-xl text-lg">
              {translate(res?.clinic?.name)}
            </span>
          </h2>
        </div>
        <div className="my-5">
          <div className="flex w-full">
            <h2 className="w-4/12 text-lg md:text-xl">
              {t("startHoliday")} :{" "}
            </h2>
            <div className="flex items-center w-8/12">
              <span className="text-lg badge badge-neutral">
                {res?.start_date}
              </span>
            </div>
          </div>
          <div className="flex w-full">
            <h2 className="my-3 w-4/12 text-lg md:text-xl">
              {t("endHoliday")} :
            </h2>
            <div className="flex items-center w-8/12">
              <span className="text-lg badge badge-neutral">
                {res?.end_date}
              </span>
            </div>
          </div>
        </div>
        <div className="my-5">
          <div className="text-xl">
            {t("reason")} En : <br />
            <textarea
              rows={4}
              dir="ltr"
              value={translate(res?.reason, true).en}
              className="block border-gray-300 bg-white p-2.5 border focus:border-blue-500 rounded-lg w-full text-gray-900 text-lg focus:ring-blue-500"
              readOnly={true}
            />
          </div>
          <div className="mt-3 text-xl">
            {t("reason")} Ar : <br />
            <textarea
              rows={4}
              value={translate(res?.reason, true).ar}
              dir="rtl"
              className="block border-gray-300 bg-white p-2.5 border focus:border-blue-500 rounded-lg w-full text-gray-900 text-lg focus:ring-blue-500"
              readOnly={true}
            />
          </div>
        </div>
      </div>
    </PageCard>
  );
};

export default page;
