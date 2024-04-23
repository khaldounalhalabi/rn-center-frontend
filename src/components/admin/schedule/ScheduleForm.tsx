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
import SelectPaginated from "@/components/common/ui/Selects/SelectPaginated";
import { ClinicService } from "@/services/ClinicService";
import {
  Schedule,
  ScheduleResponse,
  SchedulesGroupedByDay,
  StoreScheduleRequest,
} from "@/Models/Schedule";
import TimePicker from "@/components/common/ui/TimePicker";
import Copy from "@/components/icons/Copy";
import {redirect} from "@/i18Router";

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
    // console.log(data)
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
            onSuccess={() => redirect(`/admin/clinics/schedules`)}
          >
            <div className={"w-full md:w-1/2 mb-5"}>
              {method == "store" ? (
                <SelectPaginated
                  name={"clinic_id"}
                  api={async (page, search) =>
                    await ClinicService.make<ClinicService>().indexWithPagination(
                      page,
                      search,
                      undefined,
                      undefined,
                      50,
                    )
                  }
                  label={"name"}
                  value={"id"}
                  inputLabel={"Clinic Name"}
                  selected={[defaultValues?.clinic_id]}
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
              <div className={"border-b"} key={index}>
                <TimeRange
                  day={day}
                  defaultValue={
                    defaultValues?.schedules?.hasOwnProperty(day)
                      ? defaultValues.schedules[day]
                      : undefined
                  }
                />
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
    <div className={"flex items-center justify-between my-2"}>
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
                <TimePicker  name={`schedules[${day}][${index}][start_time]`}
                             defaultValue={
                               defaultValue && defaultValue.length > index
                                   ? defaultValue[index]?.start_time
                                   : undefined
                             }/>
               <TimePicker name={`schedules[${day}][${index}][end_time]`}
                           defaultValue={
                             defaultValue && defaultValue.length > index
                                 ? defaultValue[index]?.end_time
                                 : undefined
                           }/>

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
      <div className={'flex'}>
        <div className={"flex gap-2 p-1 border rounded-md border-pom mr-2"}>
          <button
              type={"button"}
              className={"text-pom"}
              onClick={() => setInputs((prevState) => prevState + 1)}
          >
            <PlusIcon />
          </button>

        </div>
        <div className={"flex gap-2 p-1 border rounded-md border-pom"}>
          <button
              type={"button"}
              className={"text-pom"}

          >
            <Copy className={"h-6 w-6 fill-[#409cff]"}/>
          </button>
        </div>
      </div>
    </div>
  );
};
