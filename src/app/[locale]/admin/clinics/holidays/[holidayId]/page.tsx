import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import { ClinicHolidayService } from "@/services/ClinicHolidayService";
import { ClinicHoliday } from "@/Models/ClinicHoliday";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import Link from "next/link";
import { getCookieServer } from "@/Actions/serverCookies";
import { translate } from "@/Helpers/Translations";

const page = async ({
  params: { holidayId },
}: {
  params: { holidayId: number };
}) => {
  const data =
    await ClinicHolidayService.make<ClinicHolidayService>().show(holidayId);
  const res: ClinicHoliday = data?.data;
  const locale = await getCookieServer("NEXT_LOCALE");
  return (
    <PageCard>
      <div className="w-full h-24 flex justify-between items-center">
        <h2 className="card-title">Holiday Details</h2>
        <Link href={`/${locale}/admin/clinics/holidays/${res.id}/edit`}>
          <PrimaryButton type={"button"}>Edit</PrimaryButton>
        </Link>
      </div>
      <div className="flex flex-col">
        <div className="my-2 flex justify-between items-center">
          <h2 className="text-xl">
            Clinic Name :{" "}
            <span className="text-lg bg-base-200 rounded-xl px-2">
              {translate(res?.clinic?.name)}
            </span>
          </h2>
        </div>
        <div className="my-5">
          <div className="flex w-full">
            <h2 className="text-lg md:text-xl w-4/12">Start Holiday in : </h2>
            <div className="w-8/12 flex items-center">
              <span className="text-lg badge badge-neutral">
                {res?.start_date}
              </span>
            </div>
          </div>
          <div className="flex w-full">
            <h2 className="text-lg md:text-xl my-3 w-4/12">End Holiday in :</h2>
            <div className="w-8/12 flex items-center">
              <span className="text-lg badge badge-neutral">
                {res?.end_date}
              </span>
            </div>
          </div>
        </div>
        <div className="my-5">
          <div className="text-xl">
            Reason En : <br />
            <textarea
              rows={4}
              dir="ltr"
              value={translate(res?.reason, true).en}
              className="block p-2.5 w-full text-lg text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
              readOnly={true}
            />
          </div>
          <div className="text-xl mt-3">
            Reason Ar : <br />
            <textarea
              rows={4}
              value={translate(res?.reason, true).ar}
              dir="rtl"
              className="block p-2.5 w-full text-lg text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
              readOnly={true}
            />
          </div>
        </div>
      </div>
    </PageCard>
  );
};

export default page;
