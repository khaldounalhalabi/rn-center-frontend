"use client";
import PageCard from "@/components/common/ui/PageCard";
import FormHolidays from "@/components/admin/holidays/formHolidays";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { ClinicHolidayService } from "@/services/ClinicHolidayService";
import TextArea from "@/components/common/ui/TextArea";
import LanguageIcon from "@/components/icons/LanguageIcon";
import LoadingSpin from "@/components/icons/LoadingSpin";

type resType = {
  end_date: string;
  start_date: string;
  clinic_id: string;
  reason: any;
  clinic: any;
};

const page = ({ params: { id } }: { params: { id: number } }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      return await ClinicHolidayService.make().show(id ? id : 1);
    },
  });
  const res: resType = data?.data;
  return (
    <div>
      <div className="w-full h-24 flex justify-start items-center">
        <h2 className="ml-5 text-2xl font-medium">Show Holidays</h2>
      </div>
      <PageCard>
        {isPending?<div className='flex justify-center'> <LoadingSpin className="w-8 h-8 animate-spin stroke-blue-500"/></div>:
            <div className="flex flex-col">
              <div className="my-5">
                <h2 className="text-xl">
                  Clinic Name : <span className="text-lg bg-base-200 rounded-xl px-2">{res?.clinic.name}</span>
                </h2>
              </div>
              <div className="my-5">
                <h2 className="text-xl">
                  Start Holiday in :{" "}
                  <span className="text-lg badge badge-neutral">{res?.start_date}</span>
                </h2>
                <h2 className="text-xl my-3">
                  End Holiday in :
                  <span className="text-lg badge badge-neutral">{res?.end_date}</span>
                </h2>
              </div>
              <div className="my-5">
                <div className="text-xl">
                  Reason En : <br />
                  <textarea rows={4}
                            dir='ltr'
                            value={res?.reason}
                            className="block p-2.5 w-full text-lg text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 ">

              </textarea>
                </div>
                <div className="text-xl mt-3">
                  Reason AR : <br />
                  <textarea rows={4}
                            value={res?.reason}
                            dir='rtl'
                            className="block p-2.5 w-full text-lg text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 ">

              </textarea>
                </div>
              </div>
            </div>
        }

      </PageCard>
    </div>
  );
};

export default page;
