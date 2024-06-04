"use client";
import { Fragment, useState } from "react";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import PageCard from "@/components/common/ui/PageCard";
import Trash from "@/components/icons/Trash";
import PlusIcon from "@/components/icons/PlusIcon";
import Copy from "@/components/icons/Copy";
import { Popover, Transition } from "@headlessui/react";
import dayjs from "dayjs";
import { SchedulesCollection, WeekDay } from "@/Models/Schedule";
import ApiSelect from "@/components/common/ui/Selects/ApiSelect";
import { ClinicService } from "@/services/ClinicService";
import { Clinic } from "@/Models/Clinic";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import Form from "@/components/common/ui/Form";
import Input from "@/components/common/ui/Inputs/Input";
import { ScheduleService } from "@/services/ScheduleService";
import { Navigate } from "@/Actions/navigate";
import { useTranslations } from "next-intl";
import Grid from "@/components/common/ui/Grid";
import plugin from "dayjs/plugin/isSameOrBefore";

dayjs.extend(plugin);

const weeKDays: WeekDay[] = [
  "saturday",
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
];

interface SchedulesTimes extends Omit<SchedulesCollection, "appointment_gap"> {}

const ClinicScheduleForm = ({
  method,
  defaultValues,
  clinic_id,
  appointment_gap,
}: {
  method: "store" | "update";
  defaultValues?: SchedulesTimes;
  clinic_id?: number;
  appointment_gap?: number;
}) => {
  const [schedule, setSchedule] = useState<SchedulesTimes>({
    saturday:
      defaultValues?.saturday || method == "update"
        ? defaultValues?.saturday ?? []
        : [
            {
              start_time: dayjs("09:00", "HH:mm").format("HH:mm"),
              end_time: dayjs("21:00", "HH:mm").format("HH:mm"),
              id: 0,
              day_of_week: "0",
            },
          ],
    sunday:
      defaultValues?.sunday || method == "update"
        ? defaultValues?.sunday ?? []
        : [
            {
              start_time: dayjs("09:00", "HH:mm").format("HH:mm"),
              end_time: dayjs("21:00", "HH:mm").format("HH:mm"),
              id: 0,
              day_of_week: "0",
            },
          ],
    monday:
      defaultValues?.monday || method == "update"
        ? defaultValues?.monday ?? []
        : [
            {
              start_time: dayjs("09:00", "HH:mm").format("HH:mm"),
              end_time: dayjs("21:00", "HH:mm").format("HH:mm"),
              id: 0,
              day_of_week: "0",
            },
          ],
    tuesday:
      defaultValues?.tuesday || method == "update"
        ? defaultValues?.tuesday ?? []
        : [
            {
              start_time: dayjs("09:00", "HH:mm").format("HH:mm"),
              end_time: dayjs("21:00", "HH:mm").format("HH:mm"),
              id: 0,
              day_of_week: "0",
            },
          ],
    wednesday:
      defaultValues?.wednesday || method == "update"
        ? defaultValues?.wednesday ?? []
        : [
            {
              start_time: dayjs("09:00", "HH:mm").format("HH:mm"),
              end_time: dayjs("21:00", "HH:mm").format("HH:mm"),
              id: 0,
              day_of_week: "0",
            },
          ],
    thursday:
      defaultValues?.thursday || method == "update"
        ? defaultValues?.thursday ?? []
        : [
            {
              start_time: dayjs("09:00", "HH:mm").format("HH:mm"),
              end_time: dayjs("21:00", "HH:mm").format("HH:mm"),
              id: 0,
              day_of_week: "0",
            },
          ],
    friday:
      defaultValues?.friday || method == "update"
        ? defaultValues?.friday ?? []
        : [
            {
              start_time: dayjs("09:00", "HH:mm").format("HH:mm"),
              end_time: dayjs("21:00", "HH:mm").format("HH:mm"),
              id: 0,
              day_of_week: "0",
            },
          ],
  });

  const handleAddTimeRange = (day: WeekDay) => {
    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      [day]: [...prevSchedule[day], { start_time: dayjs(), end_time: dayjs() }],
    }));
  };

  const handleRemoveTimeRange = (day: WeekDay, index: number) => {
    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      [day]: prevSchedule[day].filter((_, i: number) => i !== index),
    }));
  };

  const handleChangeTimeRange = (
    day: WeekDay,
    index: number,
    time: string,
    timeType: "start_time" | "end_time",
  ) => {
    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      [day]: prevSchedule[day].map((timeRange, i) =>
        i === index ? { ...timeRange, [timeType]: time } : timeRange,
      ),
    }));
  };

  const handleCopySchedule = (fromDay: WeekDay, toDay: WeekDay) => {
    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      [toDay]: prevSchedule[fromDay],
    }));
  };
  const onSubmit = async (data: {
    clinic_id: number;
    schedules?: { start_time: string; end_time: string; day_of_week: string }[];
  }) => {
    data.schedules = [];
    Object.entries(schedule).map((value) => {
      // @ts-ignore
      value[1].map(
        (item: {
          start_time: string;
          end_time: string;
          day_of_week: string;
        }) => {
          data.schedules?.push({
            start_time: dayjs(item.start_time, "HH:mm").format("HH:mm"),
            end_time: dayjs(item.end_time, "HH:mm").format("HH:mm"),
            day_of_week: value[0] as string,
          });
        },
      );
    });

    return await ScheduleService.make<ScheduleService>().store(data);
  };
  const t = useTranslations("admin.schedules.create");
  return (
    <PageCard>
      <Form
        handleSubmit={onSubmit}
        onSuccess={(res) => {
          Navigate(`/admin/clinics/schedules`);
        }}
      >
        <Grid md={2}>
          {method == "store" && (
            <ApiSelect
              placeHolder={"Select Clinic Name ..."}
              required={true}
              name={"clinic_id"}
              api={(page, search) =>
                ClinicService.make<ClinicService>().indexWithPagination(
                  page,
                  search,
                )
              }
              label={t("clinicName")}
              optionValue={"id"}
              getOptionLabel={(data: Clinic) => TranslateClient(data.name)}
            />
          )}

          <Input
            required={true}
            name={"appointment_gap"}
            type={"number"}
            unit={"min"}
            label={"Appointment Gap"}
            placeholder={"appointment gap ..."}
            defaultValue={appointment_gap ?? undefined}
          />

          {method == "update" && (
            <Input
              required={true}
              name={"clinic_id"}
              type={"number"}
              defaultValue={clinic_id ?? ""}
              className={"hidden"}
              hidden={true}
            />
          )}
        </Grid>
        {weeKDays.map((day) => (
          <div
            key={day}
            className="flex justify-between items-center border-b border-b-gray-400"
          >
            <div className="p-3">
              <h2>{day.toUpperCase()}</h2>
              {schedule[day].map((timeRange, index) => (
                <div key={index} className="flex items-center gap-1 my-1">
                  <TimePicker
                    label=""
                    value={dayjs(timeRange.start_time, "HH:mm")}
                    onChange={(newValue) =>
                      handleChangeTimeRange(
                        day,
                        index,
                        newValue?.format("HH:mm") ?? "",
                        "start_time",
                      )
                    }
                  />
                  <TimePicker
                    label=""
                    value={dayjs(timeRange.end_time, "HH:mm")}
                    onChange={(newValue) =>
                      handleChangeTimeRange(
                        day,
                        index,
                        newValue?.format("HH:mm") ?? "",
                        "end_time",
                      )
                    }
                    shouldDisableTime={(time) => {
                      return time.isSameOrBefore(
                        dayjs(schedule?.[day]?.[index]?.start_time, "HH:mm"),
                        "minutes",
                      );
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveTimeRange(day, index)}
                  >
                    <Trash className="w-6 h-6 text-error" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1">
              <button type="button" onClick={() => handleAddTimeRange(day)}>
                <PlusIcon className="border-pom border rounded-sm w-6 h-6 text-pom" />
              </button>
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={"focus:outline-0 focus:border-0"}
                      disabled={schedule[day].length == 0}
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
                            {weeKDays.map((d, index) => (
                              <div
                                className="flex justify-between items-center p-2"
                                key={index}
                              >
                                {d}
                                <input
                                  type="checkbox"
                                  className="checkbox"
                                  onChange={() => {
                                    handleCopySchedule(day, d);
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
              </Popover>
            </div>
          </div>
        ))}
      </Form>
    </PageCard>
  );
};

export default ClinicScheduleForm;