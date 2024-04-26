"use client";
import React, { useState } from "react";
import PageCard from "@/components/common/ui/PageCard";
import Input from "@/components/common/ui/Inputs/Input";
import Form from "@/components/common/ui/Form";
import { ScheduleService } from "@/services/ScheduleService";
import { navigate } from "@/Actions/navigate";
import Trash from "@/components/icons/Trash";
import PlusIcon from "@/components/icons/PlusIcon";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import { ClinicService } from "@/services/ClinicService";
import {
  Schedule,
  ScheduleResponse,
  SchedulesGroupedByDay,
  StoreScheduleRequest,
} from "@/Models/Schedule";
import ApiSelect from "@/components/common/ui/Selects/ApiSelect";
import { translate } from "@/Helpers/Translations";
import { Clinic } from "@/Models/Clinic";
import Timepicker from "@/components/common/ui/TimePicker";

const weeKDays: (keyof SchedulesGroupedByDay)[] = [
  "saturday",
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
];

const ScheduleForm = ({
  defaultValues,
  method = "store",
}: {
  defaultValues?: ScheduleResponse;
  method: "store" | "update";
}) => {
  const onSubmit = async (data: StoreScheduleRequest) => {
    let schedules: Schedule[] = [];
    Object.values(data.schedules as SchedulesGroupedByDay).map(
      (v: Schedule[]) => {
        schedules = [...v, ...schedules];
      },
    );
    data.schedules = schedules;
    return await ScheduleService.make<ScheduleService>().store(data);
  };

  return (
    <PageCard>
      <div className={"card"}>
        <div className={"card-body"}>
          <h1 className={"card-title"}>
            {method == "store" ? "Add" : "Update"} Clinic Schedule
          </h1>
          <Form
            handleSubmit={onSubmit}
            onSuccess={() => navigate(`/admin/clinics/schedules`)}
          >
            <div className={"w-full md:w-1/2 mb-5"}>
              {method == "store" ? (
                <ApiSelect
                  name={"clinic_id"}
                  api={(page, search) =>
                    ClinicService.make<ClinicService>().indexWithPagination(
                      page,
                      search,
                    )
                  }
                  label={"Clinic Name"}
                  optionValue={"id"}
                  getOptionLabel={(data: Clinic) => translate(data.name)}
                />
              ) : (
                <Input
                  name={"clinic_id"}
                  type={"number"}
                  defaultValue={defaultValues?.clinic_id}
                  className={"hidden"}
                />
              )}
            </div>
            {weeKDays.map((day: keyof SchedulesGroupedByDay, index) => (
              <div className={"border-b flex items-center"} key={index}>
                <div className="w-full">
                  <TimeRange
                    day={day}
                    defaultValue={
                      defaultValues?.schedules?.hasOwnProperty(day)
                        ? defaultValues.schedules[day]
                        : undefined
                    }
                  />
                </div>
                {/* <Popover className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={"focus:outline-0 focus:border-0"}
                      >
                        <Copy className="w-6 h-6 text-pom" />
                      </Popover.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="z-10 absolute bg-white max-w-32 transform -translate-x-1/2">
                          <div className="shadow-lg rounded-lg overflow-hidden ring-1 ring-black/5">
                            <div className="flex flex-col">
                              {weeKDays.map((day, index) => (
                                <div
                                  className="flex justify-between items-center p-2"
                                  key={index}
                                >
                                  {day}
                                  <input
                                    type="checkbox"
                                    className="checkbox"
                                    onClick={() => {

                                    }}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover> */}
              </div>
            ))}
            <div className={"flex justify-center items-center my-2"}>
              <PrimaryButton type={"submit"}>Submit</PrimaryButton>
            </div>
          </Form>
        </div>
      </div>
    </PageCard>
  );
};

export default ScheduleForm;

const TimeRange = ({
  day,
  defaultValue,
}: {
  day: string;
  defaultValue?: Schedule[];
}) => {
  const [inputs, setInputs] = useState(defaultValue?.length ?? 0);
  const inputArray = [...Array(inputs)];
  return (
    <div className={"flex items-center justify-between my-2 w-full"}>
      <div className={"flex gap-2 items-center"}>
        <div className={" w-[150px]"}>
          <span className={"badge badge-primary text-bold"}>{day}</span>
        </div>
        <div className={"flex flex-col gap-1"}>
          {inputArray.map((_item, index) => {
            return (
              <div
                className={"flex flex-col md:flex-row items-center gap-1"}
                key={index}
              >
                <Timepicker name={`schedules[${day}][${index}][start_time]`} />
                <Timepicker name={`schedules[${day}][${index}][end_time]`} />

                <button
                  type={"button"}
                  className={"text-error"}
                  onClick={() => setInputs((prevState) => prevState - 1)}
                >
                  <Trash className={"h-6 w-6"} />
                </button>

                <Input
                  name={`schedules[${day}][${index}][day_of_week]`}
                  type={"text"}
                  hidden={true}
                  className={"hidden"}
                  value={day}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className={"flex"}>
        <div className={"flex gap-2 p-1 border rounded-md border-pom mr-2"}>
          <button
            type={"button"}
            className={"text-pom"}
            onClick={() => setInputs((prevState) => prevState + 1)}
          >
            <PlusIcon />
          </button>
        </div>
      </div>
    </div>
  );
};
