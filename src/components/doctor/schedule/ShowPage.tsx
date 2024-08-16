import PageCard from "@/components/common/ui/PageCard";
import { Link } from "@/navigation";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import daysArray from "@/enum/days";
import React from "react";
import { useTranslations } from "next-intl";

interface Schedule {
  id: number;
  day_of_week: string;
  start_time: string;
  end_time: string;
  appointment_gap: number;
  clinic_id: number;
}

interface SchedulesDay {
  [key: string]: Schedule[];
}

const ShowSchedulePage = ({
  days,
  gap,
}: {
  days: SchedulesDay;
  gap: number;
}) => {
  const t = useTranslations("doctor.schedules.show");

  return (
    <PageCard>
      <div className="flex justify-between items-center w-full h-24 mb-4">
        <h2 className="text-2xl font-semibold">{t("schedulesDetails")}</h2>
        <Link href={`/doctor/clinic/schedules/edit`}>
          <PrimaryButton type={"button"}>{t("editBtn")}</PrimaryButton>
        </Link>
      </div>
      <div>
        <h1 className={"label text-xl font-semi bold w-fit"}>
          {t("appointmentGap")} :{" "}
          <span className={"mx-2 badge badge-success"}>{gap}</span>
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {daysArray().map((day, index) => (
          <div
            key={index}
            className="bg-white p-4 border border-gray-200 rounded-lg shadow"
          >
            <h3 className="text-lg font-medium mb-2 capitalize">{day}</h3>
            {days[day.toLowerCase()] && days[day.toLowerCase()].length > 0 ? (
              days[day.toLowerCase()].map((schedule) => (
                <div
                  key={schedule.id}
                  className="mb-4 p-2 border border-gray-300 rounded-md"
                >
                  <p className="text-sm">
                    {t("startTime")}: {schedule.start_time}
                  </p>
                  <p className="text-sm">
                    {t("endTime")}: {schedule.end_time}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No schedule</p>
            )}
          </div>
        ))}
      </div>
    </PageCard>
  );
};

export default ShowSchedulePage;
