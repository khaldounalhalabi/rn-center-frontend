import PageCard from "@/components/common/ui/PageCard";
import HolidayForm from "@/components/admin/holidays/HolidayForm";
import React from "react";
import { ClinicHolidayService } from "@/services/ClinicHolidayService";

const page = async ({
                        params: { holidaysId },
                    }: {
    params: { holidaysId: number };
}) => {
    const holiday = (await ClinicHolidayService.make().show(holidaysId)).data;
    return (
        <div>
            <div className="w-full h-24 flex justify-start items-center">
                <h2 className="ml-5 text-2xl font-medium">Edit Holidays</h2>
            </div>
            <PageCard>
                <HolidayForm type={"update"} defaultValues={holiday} />
            </PageCard>
        </div>
    );
};

export default page;
