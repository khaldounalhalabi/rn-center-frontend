"use client";
import { Clinic } from "@/Models/Clinic";
import daysArray from "@/enum/days";
import React from "react";

const ClinicSchedules = ({ clinic }: { clinic: Clinic }) => {
  return (
    <div>
      <div>
        <h1 className={"label text-xl font-semi bold w-fit"}>
          {"Appointment Gap"} :
          <span className={"mx-2 badge badge-success"}>
            {/*// @ts-ignore*/}
            {clinic?.schedules?.appointment_gap}
          </span>
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {daysArray().map((day, index) => (
          <div
            key={index}
            className="bg-white p-4 border border-gray-200 rounded-lg shadow"
          >
            <h3 className="text-lg font-medium mb-2 capitalize">{day}</h3>
            {clinic?.schedules?.[day.toLowerCase()] &&
            clinic?.schedules[day.toLowerCase()].length > 0 ? (
              clinic?.schedules[day.toLowerCase()].map((schedule) => (
                <div
                  key={schedule.id}
                  className="mb-4 p-2 border border-gray-300 rounded-md"
                >
                  <p className="text-sm">
                    {"Start Time"}: {schedule.start_time}
                  </p>
                  <p className="text-sm">
                    {"End Time"}: {schedule.end_time}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No schedule</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClinicSchedules;
