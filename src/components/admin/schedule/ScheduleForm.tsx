"use client";
import { Fragment, useState } from "react";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import PageCard from "@/components/common/ui/PageCard";
import Trash from "@/components/icons/Trash";
import PlusIcon from "@/components/icons/PlusIcon";
import Copy from "@/components/icons/Copy";
import { Popover, Transition } from "@headlessui/react";
import dayjs from "dayjs";
import { SchedulesCollection } from "@/Models/Schedule";
import ApiSelect from "@/components/common/ui/selects/ApiSelect";
import { ClinicsService } from "@/services/ClinicsService";
import { Clinic } from "@/Models/Clinic";
import Form from "@/components/common/ui/Form";
import FormInput from "@/components/common/ui/inputs/FormInput";
import { ScheduleService } from "@/services/ScheduleService";
import { Navigate } from "@/actions/navigate";
import { useLocale, useTranslations } from "next-intl";
import Grid from "@/components/common/ui/Grid";
import plugin from "dayjs/plugin/isSameOrBefore";
import { getEnumValues } from "@/Helpers/Enums";
import WeekDayEnum from "@/enum/WeekDayEnum";

dayjs.extend(plugin);
const ClinicScheduleForm = ({
  method,
  defaultValues,
  clinic_id,
}: {
  method: "store" | "update";
  defaultValues?: SchedulesCollection;
  clinic_id?: number;
}) => {
  const locale = useLocale();
  const [schedule, setSchedule] = useState<SchedulesCollection>({
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

  const handleAddTimeRange = (day: WeekDayEnum) => {
    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      [day]: [...prevSchedule[day], { start_time: dayjs(), end_time: dayjs() }],
    }));
  };

  const handleRemoveTimeRange = (day: WeekDayEnum, index: number) => {
    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      [day]: prevSchedule[day].filter((_, i: number) => i !== index),
    }));
  };

  const handleChangeTimeRange = (
    day: WeekDayEnum,
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

  const handleCopySchedule = (fromDay: WeekDayEnum, toDay: WeekDayEnum) => {
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
        onSuccess={() => {
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
                ClinicsService.make<ClinicsService>()
                  .setHeaders({ filtered: true })
                  .indexWithPagination(page, search)
              }
              label={t("clinicName")}
              optionValue={"id"}
              getOptionLabel={(data: Clinic) => data.user?.full_name}
            />
          )}
          {method == "update" && (
            <FormInput
              required={true}
              name={"clinic_id"}
              type={"number"}
              defaultValue={clinic_id ?? ""}
              className={"hidden"}
              hidden={true}
            />
          )}
        </Grid>
        {getEnumValues(WeekDayEnum).map((day) => (
          <div
            key={day}
            className="flex items-center justify-between border-b border-b-gray-400"
          >
            <div className="p-3">
              <h2>{day.toUpperCase()}</h2>
              {schedule[day].map((timeRange, index) => (
                <div key={index} className="my-1 flex items-center gap-1">
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
                    <Trash className="h-6 w-6 text-error" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1">
              <button type="button" onClick={() => handleAddTimeRange(day)}>
                <PlusIcon className="h-6 w-6 rounded-sm border border-pom text-pom" />
              </button>
              <Popover className="relative">
                {() => (
                  <>
                    <Popover.Button
                      className={"focus:border-0 focus:outline-0"}
                      disabled={schedule[day].length == 0}
                    >
                      <Copy className="h-6 w-6 text-pom" />
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
                      <Popover.Panel
                        className={`absolute z-10 max-w-32 transform bg-white ${locale == "en" ? "-translate-x-1/2" : "translate-x-1/2"}`}
                      >
                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                          <div className="flex flex-col">
                            {getEnumValues(WeekDayEnum).map((d, index) => (
                              <div
                                className="flex items-center justify-between p-2"
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
