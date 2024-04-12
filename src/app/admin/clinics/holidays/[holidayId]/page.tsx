import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import { ClinicHolidayService } from "@/services/ClinicHolidayService";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { ClinicHoliday } from "@/Models/ClinicHoliday";

const page = async ({
  params: { holidayId },
}: {
  params: { holidayId: number };
}) => {
  const data = await ClinicHolidayService.make().show(holidayId);
  const res: ClinicHoliday = data?.data;
  
  return (
    <div>
      <div className="w-full h-24 flex justify-start items-center">
        <h2 className="ml-5 text-2xl font-medium">Show Holidays</h2>
      </div>
      <PageCard>
        <div className="flex justify-center">
          <LoadingSpin className="w-8 h-8 animate-spin stroke-blue-500" />
        </div>

        <div className="flex flex-col">
          <div className="my-5">
            <h2 className="text-xl">
              Clinic Name :{" "}
              <span className="text-lg bg-base-200 rounded-xl px-2">
                {res?.clinic?.name}
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
              <h2 className="text-lg md:text-xl my-3 w-4/12">
                End Holiday in :
              </h2>
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
                value={res?.reason}
                className="block p-2.5 w-full text-lg text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
              ></textarea>
            </div>
            <div className="text-xl mt-3">
              Reason AR : <br />
              <textarea
                rows={4}
                value={res?.reason}
                dir="rtl"
                className="block p-2.5 w-full text-lg text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
              ></textarea>
            </div>
          </div>
        </div>
      </PageCard>
    </div>
  );
};

export default page;
